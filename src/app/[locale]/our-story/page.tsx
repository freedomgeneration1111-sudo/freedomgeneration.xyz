import type { Metadata } from "next";
import { type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { story } from "@/content/story";
import { pageMetadata } from "@/lib/meta";
import { renderMarkdown } from "@/lib/markdown";
import { Photo } from "@/components/Photo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "our-story",
    title: story.title[locale],
    description:
      locale === "ur"
        ? "فریڈم جنریشن سکول کی کہانی — 2020 کا آغاز، آج چھ کلاس رومز اور ایک ہال، اور ہمارا نام «فریڈم جنریشن» کیوں ہے۔"
        : "The story of Freedom Generation School — the conviction, the 2020 beginning, six classrooms and a hall today, and why the school is called Freedom Generation.",
    ogImageId: "COMMUNITY-01",
  });
}

export default async function OurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <div>
      <Photo id="COMMUNITY-01" locale={locale} priority showCaption={false} />
      <div className="mx-auto max-w-2xl px-5 md:px-0">
        <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
          {story.title[locale]}
        </h1>

        {story.sections.map((section, i) => (
          <section key={section.key} className="mt-12">
            <h2 className="font-serif text-2xl font-semibold">{section.heading[locale]}</h2>
            <div
              className="prose-fg mt-4"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(section.body[locale]) }}
            />
            {section.key === "beginning" && (
              <Photo id="ORIGIN-01" locale={locale} className="mt-8" />
            )}
            {i === 1 && (
              <ol className="mt-10 border-s-2 border-green ps-6">
                {story.timeline.map((step) => (
                  <li key={step.year} className="relative pb-6 last:pb-0">
                    <span className="font-sans text-sm font-medium text-green">{step.year}</span>
                    <p className="mt-1 leading-relaxed">{step.text[locale]}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        <blockquote className="mt-14 bg-clay p-6 font-serif italic leading-relaxed">
          <p>“{story.quote.text[locale]}”</p>
          <footer className="mt-3 font-sans text-sm not-italic text-ink/70">
            — {story.quote.reference[locale]}
          </footer>
        </blockquote>

        <section className="mt-12 border-t border-stone pt-8">
          <p className="font-sans text-sm leading-relaxed text-ink/80">
            {site.governance[locale]}
          </p>
        </section>
      </div>
    </div>
  );
}
