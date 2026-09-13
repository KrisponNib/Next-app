// crypto.randomUUID() is only exposed in secure contexts (https, or http://localhost).
// Visiting the app over plain http on a LAN IP (e.g. testing on a phone) leaves it
// undefined, so fall back to a manual UUID v4 in that case.
export function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
