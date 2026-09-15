import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import { locales, dirFor, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.name[locale],
      template: `%s — ${site.name[locale]}`,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/brand/fg-favicon.svg", type: "image/svg+xml" },
        { url: "/brand/fg-favicon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      ],
    },
  };
}

// JSON-LD School schema — the critical facts, machine-readable.
function schoolJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    logo: `${site.url}/brand/fg-app-icon-1024.png`,
    name: site.name[locale],
    legalName: site.legalName,
    url: `${site.url}/${locale}/`,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.founder },
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Daak Khana Khas Chak 007 JB Punjawar Kohala",
      addressLocality: "Faisalabad",
      addressRegion: "Punjab",
      postalCode: "38000",
      addressCountry: "PK",
    },
    numberOfStudents: { "@type": "QuantitativeValue", minValue: 120 },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${newsreader.variable} ${plexSans.variable} ${nastaliq.variable}`}
    >
      <body className="bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd(locale)) }}
        />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
