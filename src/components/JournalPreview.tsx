import Link from "next/link";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/i18n";
import type { JournalEntry } from "@/content/journal";
import { formatDate } from "@/lib/format";
import { Photo } from "./Photo";

// A journal entry in a list: cover, archival meta line, serif title, excerpt.
// No card chrome — hairline rules and whitespace do the separation.
export function JournalPreview({ entry, locale }: { entry: JournalEntry; locale: Locale }) {
  return (
    <article>
      <Link href={`/${locale}/journal/${entry.slug}/`} className="group block no-underline">
        <Photo id={entry.coverId} locale={locale} showCaption={false} />
        <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-stone pt-2 font-sans text-sm text-ink/70">
          <span>{ui.labels.category[entry.category][locale]}</span>
          <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink group-hover:text-green">
          {entry.title[locale]}
        </h3>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/80">
          {entry.excerpt[locale]}
        </p>
      </Link>
    </article>
  );
}
