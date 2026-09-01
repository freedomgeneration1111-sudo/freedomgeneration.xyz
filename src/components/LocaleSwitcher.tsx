"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/i18n";

// EN | اردو — preserves the current path (memory file §36).
export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}/`;
  const rest = pathname.replace(/^\/(en|ur)/, "");
  const item = (locale: Locale, label: string) => {
    const active = locale === current;
    return (
      <Link
        href={`/${locale}${rest || "/"}`}
        lang={locale}
        dir={locale === "ur" ? "rtl" : "ltr"}
        aria-current={active ? "true" : undefined}
        className={
          active
            ? "font-medium underline underline-offset-4"
            : "opacity-75 no-underline hover:underline hover:opacity-100"
        }
      >
        {label}
      </Link>
    );
  };
  return (
    <span className="inline-flex items-center gap-2 font-sans text-sm">
      {item("en", "EN")}
      <span aria-hidden="true" className="opacity-40">
        |
      </span>
      {item("ur", "اردو")}
    </span>
  );
}
