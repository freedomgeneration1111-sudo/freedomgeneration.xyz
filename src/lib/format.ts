import type { Locale } from "@/content/i18n";

// Locked figures render with Western digits and comma grouping in both locales,
// matching the bilingual copy in the memory file (e.g. "3,383,520 روپے").
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatPKR(n: number, locale: Locale): string {
  return locale === "ur" ? `${formatNumber(n)} روپے` : `Rs ${formatNumber(n)}`;
}

const urMonths = [
  "جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون",
  "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر",
];
const enMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!m) return String(y);
  if (!d) return locale === "ur" ? `${urMonths[m - 1]} ${y}` : `${enMonths[m - 1]} ${y}`;
  return locale === "ur" ? `${d} ${urMonths[m - 1]} ${y}` : `${d} ${enMonths[m - 1]} ${y}`;
}
