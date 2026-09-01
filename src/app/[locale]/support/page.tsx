import type { Metadata } from "next";
import Link from "next/link";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { support } from "@/content/support";
import { pageMetadata } from "@/lib/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "support",
    title: support.title[locale],
    description:
      locale === "ur"
        ? "فریڈم جنریشن کی مدد کے طریقے — دعا، جریدہ آگے بڑھانا، رضاکارانہ مہارت، سامان، کارپوریٹ سی ایس آر اور مالی تعاون۔"
        : "Ways to help Freedom Generation — prayer, sharing the Journal, volunteering skills, equipment, corporate CSR, and financial support.",
  });
}

// Low-emphasis by design (memory file §38). The footer donate link points here.
export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <div className="mx-auto max-w-2xl px-5 md:px-0">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {support.title[locale]}
      </h1>
      <p className="mt-5 leading-relaxed">{support.intro[locale]}</p>

      <div className="mt-10 space-y-10">
        {support.ways.map((way) => (
          <section key={way.key} id={way.key}>
            <h2 className="font-serif text-xl font-semibold">{way.heading[locale]}</h2>
            <p className="mt-2 leading-relaxed">{way.body[locale]}</p>
            {way.key === "share" && (
              <p className="mt-2">
                <Link
                  href={`/${locale}/journal/`}
                  className="font-sans text-sm text-green underline hover:text-green-light"
                >
                  {ui.actions.readJournal[locale]}
                </Link>
              </p>
            )}
            {way.key === "equipment" && (
              <p className="mt-2">
                <Link
                  href={`/${locale}/projects/complete-school-building/`}
                  className="font-sans text-sm text-green underline hover:text-green-light"
                >
                  {ui.actions.viewProject[locale]}
                </Link>
              </p>
            )}
            {way.key === "financial" && (
              <p className="mt-2 font-sans text-sm">
                <Link
                  href={`/${locale}/transparency/`}
                  className="text-green underline hover:text-green-light"
                >
                  {ui.nav.transparency[locale]}
                </Link>
                {" · "}
                <a href={`mailto:${site.email}`} className="text-green underline hover:text-green-light">
                  {site.email}
                </a>
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
