import type { Metadata } from "next";
import { ui, type Locale } from "@/content/i18n";
import { journal } from "@/content/journal";
import { pageMetadata } from "@/lib/meta";
import { JournalPreview } from "@/components/JournalPreview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "journal",
    title: ui.nav.journal[locale],
    description:
      locale === "ur"
        ? "سکول جریدہ — فریڈم جنریشن کی روزمرہ زندگی، کہانیوں، تقریبات اور منصوبوں کا زندہ ریکارڈ۔"
        : "The School Journal — the living record of daily life, stories, events, and project progress at Freedom Generation.",
    ogImageId: "JOURNAL-COVER-01",
  });
}

export default async function JournalIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {ui.labels.journalSectionTitle[locale]}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed">
        {locale === "ur"
          ? "یہ جریدہ ہمارا مستند ریکارڈ ہے — جو کچھ سکول میں ہوتا ہے وہ پہلے یہاں شائع ہوتا ہے، پھر آگے بڑھایا جاتا ہے۔"
          : "This journal is our canonical record — what happens at the school is published here first, then shared outward."}
      </p>
      <div className="mt-10 grid gap-12 border-t border-stone pt-10 md:grid-cols-3 md:gap-8">
        {entries.map((entry) => (
          <JournalPreview key={entry.slug} entry={entry} locale={locale} />
        ))}
      </div>
    </div>
  );
}
