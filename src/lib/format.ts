export function formatPrice(n: number): string {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
}

export function formatDuration(min: number): string {
  const hours = Math.floor(min / 60);
  const rest = min % 60;
  if (hours === 0) return `${rest}분`;
  if (rest === 0) return `${hours}시간`;
  return `${hours}시간 ${rest}분`;
}

export function formatContact(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return raw;
}
