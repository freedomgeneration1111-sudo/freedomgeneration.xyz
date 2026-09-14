import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ui, locales, type Locale } from "@/content/i18n";
import { getJournalEntry, getPublishedJournalSlugs } from "@/integrations/sanity/journal";
import { pageMetadata } from "@/lib/meta";
import { journalArticleJsonLd } from "@/lib/journal-seo";
import { formatDate } from "@/lib/format";
import { JournalBody } from "@/components/JournalBody";
import { Photo } from "@/components/Photo";

export async function generateStaticParams() {
  const slugs = await getPublishedJournalSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

async function entryFor(slug: string) {
  const entry = await getJournalEntry(slug);
  if (!entry) notFound();
  return entry;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const entry = await entryFor(slug);
  return pageMetadata({
    locale,
    path: `journal/${slug}`,
    title: entry.title[locale],
    description: entry.excerpt[locale],
    ogImageId: entry.coverId,
    article: {
      publishedTime: entry.date,
      modifiedTime: entry.updatedAt,
      author: entry.author,
    },
  });
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const entry = await entryFor(slug);
  const jsonLd = journalArticleJsonLd(entry, locale);
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")}}
      />
      {entry.coverId && (
        <Photo id={entry.coverId} locale={locale} priority showCaption={false} />
      )}
      <div className="mx-auto max-w-2xl px-5 md:px-0">
        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 font-sans text-sm text-ink/70">
          <span>{ui.labels.category[entry.category][locale]}</span>
          <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-4xl">
          {entry.title[locale]}
        </h1>
        <p className="mt-3 font-sans text-sm text-ink/70">
          {ui.labels.by[locale]} {entry.author}
        </p>
        <div className="prose-fg mt-8">
          <JournalBody body={entry.body[locale]} />
        </div>
        {entry.galleryIds.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {entry.galleryIds.map((id) => (
              <Photo key={id} id={id} locale={locale} />
            ))}
          </div>
        )}
        <p className="mt-12 border-t border-stone pt-6">
          <Link
            href={`/${locale}/journal/`}
            className="font-sans text-sm text-green underline hover:text-green-light"
          >
            {ui.labels.journalSectionTitle[locale]}
          </Link>
        </p>
      </div>
    </article>
  );
}
