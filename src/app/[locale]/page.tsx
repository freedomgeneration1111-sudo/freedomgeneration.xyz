import type { Metadata } from "next";
import Link from "next/link";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { schoolFacts } from "@/content/schoolFacts";
import { projects } from "@/content/projects";
import { getJournalEntries } from "@/integrations/sanity/journal";
import { pageMetadata } from "@/lib/meta";
import { formatPKR } from "@/lib/format";
import { Photo } from "@/components/Photo";
import { Progress } from "@/components/Progress";
import { JournalPreview } from "@/components/JournalPreview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    title: site.name[locale],
    description:
      locale === "ur"
        ? "فیصل آباد میں ایک حقیقی مسیحی خیراتی سکول — پلے گروپ سے دسویں جماعت تک، 120 سے زیادہ طلباء۔ حقیقی تصاویر، زندہ سکول جریدہ، اور شفاف منصوبے۔"
        : "A real Christian charity school in Faisalabad — Play Group to Grade 10, more than 120 students. Real photography, a living School Journal, and transparent projects.",
  });
}

// Container helpers: photos run edge-to-edge on mobile, text keeps an editorial measure.
const wide = "mx-auto max-w-5xl px-5 md:px-8";
const bleed = "-mx-5 md:mx-0";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const latest = (await getJournalEntries()).slice(0, 3);
  const building = projects[0];

  return (
    <div className="pb-4">
      {/* 2 — Hero, full-bleed, kicker only */}
      <section className="relative">
        <Photo
          id="HERO-01"
          locale={locale}
          priority
          showCaption={false}
          imgClassName="aspect-[4/5] object-cover sm:aspect-[16/9]"
        />
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent px-5 pb-4 pt-12 font-sans text-sm text-paper md:px-8">
          {ui.labels.kicker[locale]}
        </p>
      </section>

      {/* 3 — Statement */}
      <section className={`${wide} mt-16 md:mt-24`}>
        <p className="mx-auto max-w-2xl text-center font-serif text-xl leading-relaxed md:text-2xl">
          {home.statement[locale]}
        </p>
      </section>

      {/* 4 — Origin */}
      <section className={`${wide} mt-20 grid gap-8 md:mt-28 md:grid-cols-2 md:items-center md:gap-12`}>
        <div>
          <h2 className="font-serif text-2xl font-semibold">{home.origin.heading[locale]}</h2>
          <p className="mt-4 leading-relaxed">{home.origin.body[locale]}</p>
        </div>
        <Photo id="ORIGIN-01" locale={locale} className={bleed} />
      </section>

      {/* 5 — School life today */}
      <section className={`${wide} mt-20 md:mt-28`}>
        <h2 className="font-serif text-2xl font-semibold">{home.lifeToday.heading[locale]}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed">{home.lifeToday.body[locale]}</p>
        <div className={`mt-8 grid gap-4 sm:grid-cols-3 ${bleed}`}>
          <Photo id="TODAY-01" locale={locale} showCaption={false} />
          <Photo id="TODAY-02" locale={locale} showCaption={false} />
          <Photo id="TODAY-03" locale={locale} showCaption={false} />
        </div>
      </section>

      {/* 6 — Learning & faith */}
      <section className={`${wide} mt-20 grid gap-8 md:mt-28 md:grid-cols-2 md:gap-12`}>
        <div className="flex flex-col gap-4">
          <Photo id="LEARNING-01" locale={locale} className={bleed} />
          <Photo id="FAITH-01" locale={locale} className={`${bleed} hidden md:block`} />
        </div>
        <div className="md:pt-6">
          <h2 className="font-serif text-2xl font-semibold">{home.learningFaith.heading[locale]}</h2>
          <p className="mt-4 leading-relaxed">{home.learningFaith.body[locale]}</p>
        </div>
      </section>

      {/* 7 — Challenge, candid, no pity marketing */}
      <section className="mt-20 md:mt-28">
        <Photo id="CHALLENGE-01" locale={locale} showCaption={false} />
        <div className={`${wide} mt-8`}>
          <h2 className="font-serif text-2xl font-semibold">{home.challenge.heading[locale]}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">{home.challenge.body[locale]}</p>
        </div>
      </section>

      {/* 8 — Vocational vision */}
      <section className={`${wide} mt-20 grid gap-8 md:mt-28 md:grid-cols-2 md:items-center md:gap-12`}>
        <Photo id="VOCATIONAL-01" locale={locale} className={bleed} />
        <div>
          <h2 className="font-serif text-2xl font-semibold">{home.vocational.heading[locale]}</h2>
          <p className="mt-4 leading-relaxed">{home.vocational.body[locale]}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 font-sans text-sm text-ink/80">
            {schoolFacts.vocationalVision.areas.map((a) => (
              <li key={a.en}>{a[locale]}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — Journal preview */}
      <section className={`${wide} mt-24 md:mt-32`}>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-stone pt-6">
          <h2 className="font-serif text-2xl font-semibold">
            {ui.labels.journalSectionTitle[locale]}
          </h2>
          <Link
            href={`/${locale}/journal/`}
            className="font-sans text-sm text-green underline hover:text-green-light"
          >
            {ui.actions.readJournal[locale]}
          </Link>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {latest.map((entry) => (
            <JournalPreview key={entry.slug} entry={entry} locale={locale} />
          ))}
        </div>
      </section>

      {/* 10 — Current project preview */}
      <section className={`${wide} mt-24 md:mt-32`}>
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <Photo id="PROJECT-01" locale={locale} className={bleed} />
          <div>
            <p className="font-sans text-sm text-ink/70">{ui.labels.currentProject[locale]}</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold">
              {home.projectPreview.heading[locale]}
            </h2>
            <p className="mt-3 leading-relaxed">{home.projectPreview.body[locale]}</p>
            <div className="mt-6">
              <Progress percent={building.percentComplete} locale={locale} />
            </div>
            <p className="mt-3 font-sans text-sm text-ink/80">
              {ui.labels.goal[locale]}: {formatPKR(building.goalAmount, locale)}
            </p>
            <p className="mt-4">
              <Link
                href={`/${locale}/projects/${building.slug}/`}
                className="font-sans text-sm text-green underline hover:text-green-light"
              >
                {ui.actions.viewProject[locale]}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 11 — Teaching teaser */}
      <section className={`${wide} mt-24 grid gap-8 md:mt-32 md:grid-cols-2 md:items-center md:gap-12`}>
        <div className="md:order-2">
          <Photo id="TEACHING-01" locale={locale} className={bleed} />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold">{home.teachingTeaser.heading[locale]}</h2>
          <p className="mt-4 leading-relaxed">{home.teachingTeaser.body[locale]}</p>
          <p className="mt-4">
            <Link
              href={`/${locale}/teaching/`}
              className="font-sans text-sm text-green underline hover:text-green-light"
            >
              {ui.nav.teaching[locale]}
            </Link>
          </p>
        </div>
      </section>

      {/* 12 — Programs teaser */}
      <section className={`${wide} mt-24 grid gap-8 md:mt-32 md:grid-cols-2 md:items-center md:gap-12`}>
        <Photo id="PROGRAMS-01" locale={locale} className={bleed} />
        <div>
          <h2 className="font-serif text-2xl font-semibold">{home.programsTeaser.heading[locale]}</h2>
          <p className="mt-4 leading-relaxed">{home.programsTeaser.body[locale]}</p>
          <p className="mt-4">
            <Link
              href={`/${locale}/programs/`}
              className="font-sans text-sm text-green underline hover:text-green-light"
            >
              {ui.nav.programs[locale]}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
