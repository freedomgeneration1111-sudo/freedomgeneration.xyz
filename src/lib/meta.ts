import type { Metadata } from "next";
import { site } from "@/content/site";
import { media } from "@/content/media/registry";
import type { Locale } from "@/content/i18n";

/** Canonical URL for a locale + path ("" for the locale home). Trailing slash matches static export. */
export function urlFor(locale: Locale, path = ""): string {
  const suffix = path ? `${path}/` : "";
  return `${site.url}/${locale}/${suffix}`;
}

export function pageMetadata(opts: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  ogImageId?: string;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
  };
}): Metadata {
  const { locale, path = "", title, description, ogImageId = "HERO-01", article } = opts;
  const og = media(ogImageId);
  const openGraph: Metadata["openGraph"] = article
    ? {
        type: "article",
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: [article.author],
        title,
        description,
        url: urlFor(locale, path),
        siteName: site.name[locale],
        locale: locale === "ur" ? "ur_PK" : "en_US",
        images: [{ url: `${site.url}${og.file}`, alt: og.alt[locale] }],
      }
    : {
        type: "website",
        title,
        description,
        url: urlFor(locale, path),
        siteName: site.name[locale],
        locale: locale === "ur" ? "ur_PK" : "en_US",
        images: [{ url: `${site.url}${og.file}`, alt: og.alt[locale] }],
      };
  return {
    title,
    description,
    alternates: {
      canonical: urlFor(locale, path),
      languages: {
        en: urlFor("en", path),
        ur: urlFor("ur", path),
        "x-default": urlFor("en", path),
      },
    },
    openGraph,
  };
}
