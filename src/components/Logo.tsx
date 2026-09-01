import Link from "next/link";
import type { Locale } from "@/content/i18n";
import { site } from "@/content/site";

// Word logo, three lines, per memory file §35. No emblem, no icon.
// tone="green" for light backgrounds, tone="paper" for the green footer.
export function Logo({
  locale,
  tone = "green",
  linked = true,
}: {
  locale: Locale;
  tone?: "green" | "paper";
  linked?: boolean;
}) {
  const color = tone === "green" ? "text-green" : "text-paper";
  const lockup = (
    <span className={`block ${color}`} translate="no">
      <span className="block font-serif text-[1.05rem] leading-tight font-bold tracking-[-0.01em]">
        FREEDOM GENERATION
      </span>
      <span className="block font-sans text-[0.62rem] font-normal tracking-[0.42em] uppercase opacity-90">
        School
      </span>
      <span className="block font-serif text-[0.8rem] italic leading-snug opacity-90">
        “teach your children well”
      </span>
    </span>
  );
  if (!linked) return lockup;
  return (
    <Link
      href={`/${locale}/`}
      className="inline-block no-underline"
      aria-label={site.name[locale]}
    >
      {lockup}
    </Link>
  );
}
