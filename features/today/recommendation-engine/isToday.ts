export function isToday(dateIso: string): boolean {
  return new Date(dateIso).toDateString() === new Date().toDateString();
}
