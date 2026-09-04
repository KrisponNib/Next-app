import { getStudentByToken } from "@/lib/cloud/supabaseRest";

function decodeDataUrl(dataUrl: string): { bytes: Uint8Array; contentType: string } | null {
  const match = /^data:([^;,]+)?(;base64)?,([\s\S]*)$/.exec(dataUrl);
  if (!match) return null;
  const contentType = match[1] || "application/octet-stream";
  try {
    if (match[2]) {
      const buffer = Buffer.from(match[3], "base64");
      return { bytes: new Uint8Array(buffer), contentType };
    }
    const buffer = Buffer.from(decodeURIComponent(match[3]), "utf8");
    return { bytes: new Uint8Array(buffer), contentType };
  } catch {
    return null;
  }
}

function safeFilename(name: string) {
  return name.replace(/[\r\n"\\/]/g, "_").slice(0, 180) || "attachment";
}

export async function GET(
  _: Request,
  { params }: { params: { token: string; assignmentId: string } },
) {
  const student = await getStudentByToken(params.token);
  if (!student) return new Response("Not found", { status: 404 });

  const assignment = student.assignments?.find((item) => item.id === params.assignmentId);
  const attachment = assignment?.attachment;
  if (!attachment?.dataUrl) return new Response("Not found", { status: 404 });

  const decoded = decodeDataUrl(attachment.dataUrl);
  if (!decoded) return new Response("Invalid attachment", { status: 422 });

  const contentType = attachment.type || decoded.contentType;
  const disposition = contentType === "application/pdf" || contentType.startsWith("image/") ? "inline" : "attachment";
  const filename = safeFilename(attachment.name);

  const body = decoded.bytes.buffer.slice(decoded.bytes.byteOffset, decoded.bytes.byteOffset + decoded.bytes.byteLength) as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${disposition}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
