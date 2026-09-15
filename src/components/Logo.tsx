import Link from "next/link";
import type { Locale } from "@/content/i18n";

// Approved horizontal production lockup. The artwork stays LTR in both locales.
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
        src="/brand/fg-logo-header.webp"
        alt="Freedom Generation School System"
        width={2172}
        height={724}
        className="block h-auto w-[11rem] max-w-full md:w-[12rem] lg:w-[13.5rem]"
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
