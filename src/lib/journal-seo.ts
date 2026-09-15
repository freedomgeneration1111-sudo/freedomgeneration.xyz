import type {Locale} from "@/content/i18n";
import {media} from "@/content/media/registry";
import {site} from "@/content/site";
import type {JournalEntry} from "@/integrations/sanity/journal";
import {urlFor} from "./meta";

export function journalArticleJsonLd(entry: JournalEntry, locale: Locale) {
  const pageUrl = urlFor(locale, `journal/${entry.slug}`);
  const authorType = entry.author.includes("Council") ? "Organization" : "Person";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title[locale],
    description: entry.excerpt[locale],
    datePublished: entry.date,
    dateModified: entry.updatedAt ?? entry.date,
    inLanguage: locale === "ur" ? "ur-PK" : "en",
    mainEntityOfPage: {"@type": "WebPage", "@id": pageUrl},
    author: {"@type": authorType, name: entry.author},
    publisher: {
      "@type": "School",
      name: site.name[locale],
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/fg-app-icon-1024.png`,
      },
    },
    ...(entry.coverId
      ? {image: `${site.url}${media(entry.coverId).file}`}
      : {}),
  };
}
