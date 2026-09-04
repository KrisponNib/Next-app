import { Buffer } from "node:buffer";
import { getStudentByToken } from "@/lib/cloud/supabaseRest";

function safeFilename(name: string) {
  return name.replace(/[\r\n"]/g, "_");
}

function decodeDataUrl(dataUrl: string): { body: ArrayBuffer; contentType: string } | null {
  if (!dataUrl.startsWith("data:")) return null;
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return null;

  const header = dataUrl.slice(5, comma);
  const payload = dataUrl.slice(comma + 1);
  const parts = header.split(";");
  const contentType = parts[0] || "application/octet-stream";
  const isBase64 = parts.includes("base64");

  try {
    const buffer = isBase64
      ? Buffer.from(payload, "base64")
      : Buffer.from(decodeURIComponent(payload), "utf8");
    const body = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
    return { body, contentType };
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { token: string; assignmentId: string } }
) {
  const student = await getStudentByToken(params.token);
  if (!student) return new Response("Not found", { status: 404 });

  const assignment = student.assignments.find((item) => item.id === params.assignmentId);
  const attachment = assignment?.attachment;
  if (!attachment) return new Response("Not found", { status: 404 });

  const decoded = decodeDataUrl(attachment.dataUrl);
  if (!decoded) return new Response("Invalid attachment", { status: 422 });

  const contentType = attachment.type || decoded.contentType || "application/octet-stream";
  const filename = safeFilename(attachment.name || "attachment");
  const inline = contentType === "application/pdf" || contentType.startsWith("image/");

  return new Response(decoded.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
