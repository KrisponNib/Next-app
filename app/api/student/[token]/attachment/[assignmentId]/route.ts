import { getStudentByToken } from "@/lib/cloud/supabaseRest";

function decodeDataUrl(dataUrl: string): { body: ArrayBuffer; detectedType: string } | null {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex < 0 || !dataUrl.startsWith("data:")) return null;

  const meta = dataUrl.slice(5, commaIndex);
  const payload = dataUrl.slice(commaIndex + 1);
  const parts = meta.split(";");
  const detectedType = parts[0] || "application/octet-stream";
  const isBase64 = parts.includes("base64");

  try {
    const buffer = isBase64
      ? Buffer.from(payload, "base64")
      : Buffer.from(decodeURIComponent(payload), "utf8");

    const body = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;

    return { body, detectedType };
  } catch {
    return null;
  }
}

function mimeFromFilename(name: string): string | null {
  const lower = name.toLowerCase();

  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";

  return null;
}

function isViewable(contentType: string) {
  return contentType === "application/pdf" || contentType.startsWith("image/");
}

export async function GET(
  _request: Request,
  { params }: { params: { token: string; assignmentId: string } }
) {
  const student = await getStudentByToken(params.token);

  if (!student) {
    return new Response("Not found", { status: 404 });
  }

  const assignment = student.assignments?.find(
    (item) => item.id === params.assignmentId
  );

  const attachment = assignment?.attachment;

  if (!attachment?.dataUrl) {
    return new Response("Not found", { status: 404 });
  }

  const decoded = decodeDataUrl(attachment.dataUrl);

  if (!decoded) {
    return new Response("Invalid attachment", { status: 422 });
  }

  // Prefer the filename extension for PDFs/images because some mobile uploads
  // arrive with application/octet-stream or another generic MIME type.
  const contentType =
    mimeFromFilename(attachment.name || "") ||
    attachment.type ||
    decoded.detectedType ||
    "application/octet-stream";

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  };

  // PDFs and images should open in the browser instead of downloading.
  if (isViewable(contentType)) {
    headers["Content-Disposition"] = "inline";
  } else {
    headers["Content-Disposition"] = "attachment";
  }

  return new Response(decoded.body, { headers });
}
