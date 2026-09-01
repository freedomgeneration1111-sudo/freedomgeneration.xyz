import Link from "next/link";
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
  const items = navOrder.map(([slug, label]) => ({
    href: `/${locale}/${slug}/`,
    label: label[locale],
  }));
  return (
    <header className="relative border-b border-stone bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Logo locale={locale} />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-5 lg:gap-x-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-[0.85rem] text-green no-underline hover:text-green-light hover:underline"
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
