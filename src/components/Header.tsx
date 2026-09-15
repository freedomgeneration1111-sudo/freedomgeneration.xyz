"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/i18n";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

const navOrder = [
  ["our-story", ui.nav.ourStory],
  ["teaching", ui.nav.teaching],
  ["programs", ui.nav.programs],
  ["journal", ui.nav.journal],
  ["projects", ui.nav.projects],
  ["transparency", ui.nav.transparency],
  ["contact", ui.nav.contact],
] as const;

// Minimal header: logo, nav, locale switch. No donate link here (footer only).
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const items = navOrder.map(([slug, label]) => {
    const href = `/${locale}/${slug}/`;
    return {
      href,
      label: label[locale],
      active: pathname === href || pathname === href.slice(0, -1) || pathname.startsWith(href),
    };
  });
  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-8 lg:gap-6">
        <Logo locale={locale} />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-5 lg:gap-x-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`font-sans text-[0.85rem] text-green decoration-ochre decoration-2 underline-offset-8 hover:underline focus-visible:underline active:underline ${
                    item.active ? "underline" : "no-underline"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 text-green">
          <LocaleSwitcher current={locale} />
          <MobileNav
            items={items}
            openLabel={ui.actions.openMenu[locale]}
            closeLabel={ui.actions.closeMenu[locale]}
          />
        </div>
      </div>
    </header>
  );
}
