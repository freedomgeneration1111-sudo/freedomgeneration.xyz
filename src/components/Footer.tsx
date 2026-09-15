import Link from "next/link";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/i18n";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Photo } from "./Photo";

// Footer per memory file §37 beat 13: the full contact/trust block, and the only
// donate link on the entire site.
export function Footer({ locale }: { locale: Locale }) {
  const l = (slug: string) => `/${locale}/${slug}/`;
  return (
    <footer className="mt-20">
      <Photo
        id="FOOTER-TRUST"
        locale={locale}
        priority={false}
        showCaption={false}
        className="media-frame mb-6 md:mb-10"
      />
      <div className="footer-links bg-green-light text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
          <div>
            <Logo locale={locale} tone="paper" linked={false} />
            <p className="mt-4 font-sans text-sm leading-relaxed opacity-90">
              {site.legalName} — {ui.footer.registration[locale]}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed opacity-90">
              {ui.footer.staffNote[locale]}
            </p>
            <img
              src="/brand/fg-badge.svg"
              alt="Freedom Generation School System badge"
              className="mt-6 size-24 rounded-full bg-paper md:size-28"
            />
          </div>
          <address className="not-italic font-sans text-sm leading-relaxed">
            <p>{site.address}</p>
            <p className="mt-3">
              <a href={`tel:${site.phone.replace(/[\s-]/g, "")}`} className="no-underline hover:text-ochre hover:underline">
                {site.phone}
              </a>
              {" · "}
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="underline hover:text-ochre"
                rel="noopener"
              >
                {ui.footer.whatsapp[locale]}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${site.email}`} className="underline hover:text-ochre">
                {site.email}
              </a>
            </p>
          </address>
          <div className="font-sans text-sm">
            <ul className="space-y-1.5">
              <li>
                <Link href={l("transparency")} className="underline hover:text-ochre">
                  {ui.nav.transparency[locale]}
                </Link>
              </li>
              <li>
                <Link href={l("journal")} className="underline hover:text-ochre">
                  {ui.nav.journal[locale]}
                </Link>
              </li>
              <li>
                <Link href={l("support")} className="underline hover:text-ochre">
                  {ui.nav.support[locale]}
                </Link>
              </li>
              <li>
                <Link href={`${l("support")}#financial`} className="underline hover:text-ochre">
                  {ui.footer.donate[locale]}
                </Link>
              </li>
            </ul>
            <p className="mt-4 max-w-[36ch] opacity-80">{ui.footer.donateNote[locale]}</p>
            <div className="mt-6">
              <LocaleSwitcher current={locale} />
            </div>
          </div>
        </div>
        <div className="border-t border-paper/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 font-sans text-xs opacity-80 md:px-8">
            <span>© {ui.footer.copyright[locale]}</span>
            <span aria-hidden="true" className="inline-block h-2 w-8 bg-paper/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
