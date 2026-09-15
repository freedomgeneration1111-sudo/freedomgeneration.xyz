import Link from "next/link";
import type { Locale } from "@/content/i18n";

// Approved compact horizontal lockup. The artwork stays LTR in both locales.
export function Logo({
  locale,
  tone = "green",
  linked = true,
}: {
  locale: Locale;
  tone?: "green" | "paper";
  linked?: boolean;
}) {
  const frame = tone === "paper" ? "bg-paper px-2 py-1" : "";
  const lockup = (
    <span className={`block w-fit max-w-full ${frame}`} dir="ltr" translate="no">
      <img
        src="/brand/fg-logo-header-compact.svg"
        alt="Freedom Generation School System"
        className="block h-auto w-[clamp(10rem,56vw,13.75rem)] max-w-full md:w-[13.75rem] lg:w-[17.5rem]"
      />
    </span>
  );
  if (!linked) return lockup;
  return (
    <Link
      href={`/${locale}/`}
      className="block min-w-0 no-underline"
      dir="ltr"
    >
      {lockup}
    </Link>
  );
}
