import type { Metadata } from "next";
import Link from "next/link";
import { ui, locales, type Locale } from "@/content/i18n";
import {
  projects,
  project,
  budgetCategories,
  buildingBudgetTotals,
} from "@/content/projects";
import { journal } from "@/content/journal";
import { pageMetadata } from "@/lib/meta";
import { formatPKR, formatNumber } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { Photo } from "@/components/Photo";
import { Progress } from "@/components/Progress";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const p = project(slug);
  return pageMetadata({
    locale,
    path: `projects/${slug}`,
    title: p.title[locale],
    description: p.summary[locale],
    ogImageId: p.coverId,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const p = project(slug);
  const categories = Object.keys(budgetCategories) as (keyof typeof budgetCategories)[];
  const t = buildingBudgetTotals;
  const updates = p.updates
    .map((s) => journal.find((e) => e.slug === s))
    .filter((e) => e !== undefined);

  return (
    <article>
      <Photo id={p.coverId} locale={locale} priority showCaption={false} />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="mt-10 font-sans text-sm text-ink/70">
          {ui.labels.status[p.status][locale]}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight md:text-4xl">
          {p.title[locale]}
        </h1>

        <div className="mt-8 max-w-xl">
          <Progress percent={p.percentComplete} locale={locale} />
        </div>
        <dl className="mt-6 grid gap-x-10 gap-y-3 font-sans text-[0.95rem] sm:grid-cols-2">
          <div>
            <dt className="text-ink/60">{ui.labels.goal[locale]}</dt>
            <dd className="mt-0.5 font-medium">{formatPKR(p.goalAmount, locale)}</dd>
          </div>
          <div>
            <dt className="text-ink/60">{ui.labels.funded[locale]}</dt>
            <dd className="mt-0.5">{formatPKR(p.amountFunded, locale)}</dd>
          </div>
        </dl>

        <div
          className="prose-fg mt-10"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body[locale]) }}
        />

        {/* Budget — every number verbatim from memory file §47 */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold">
            {locale === "ur" ? "تفصیلی بجٹ — فیصل آباد 2026" : "Line-item budget — Faisalabad 2026"}
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse font-sans text-[0.92rem]">
              <thead>
                <tr className="border-b-2 border-green">
                  <th className="py-2 pe-4 text-start font-medium">
                    {locale === "ur" ? "چیز" : "Item"}
                  </th>
                  <th className="py-2 pe-4 text-start font-medium">
                    {locale === "ur" ? "تعداد" : "Qty"}
                  </th>
                  <th className="py-2 text-end font-medium">
                    {locale === "ur" ? "کل (روپے)" : "Total (PKR)"}
                  </th>
                </tr>
              </thead>
              {categories.map((cat) => {
                const rows = p.budgetItems.filter((item) => item.category === cat);
                if (rows.length === 0) return null;
                return (
                  <tbody key={cat}>
                    <tr>
                      <th
                        colSpan={3}
                        scope="rowgroup"
                        className="border-b border-stone bg-clay/50 px-2 py-2 text-start font-medium"
                      >
                        {cat}. {budgetCategories[cat][locale]}
                      </th>
                    </tr>
                    {rows.map((item) => (
                      <tr key={item.code} className="border-b border-stone/60 align-top">
                        <td className="py-2 pe-4">
                          {item.label[locale]}
                          {item.note && (
                            <span className="block text-[0.82rem] text-ink/60">
                              {item.note[locale]}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-2 pe-4 text-ink/70">{item.qty}</td>
                        <td className="whitespace-nowrap py-2 text-end tabular-nums" dir="ltr">
                          {formatNumber(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                );
              })}
              <tbody className="font-medium">
                <tr className="border-b border-stone/60">
                  <td className="py-2 pe-4" colSpan={2}>
                    {locale === "ur" ? "ذیلی میزان — سولر کے بغیر" : "Subtotal without solar"}
                  </td>
                  <td className="whitespace-nowrap py-2 text-end tabular-nums" dir="ltr">
                    {formatNumber(t.subtotalWithoutSolar)}
                  </td>
                </tr>
                <tr className="border-b border-stone/60">
                  <td className="py-2 pe-4" colSpan={2}>
                    {locale === "ur"
                      ? "ذیلی میزان — 5 کلوواٹ سولر کے ساتھ"
                      : "Subtotal with 5kW solar"}
                  </td>
                  <td className="whitespace-nowrap py-2 text-end tabular-nums" dir="ltr">
                    {formatNumber(t.subtotalWith5kwSolar)}
                  </td>
                </tr>
                <tr className="border-b border-stone/60">
                  <td className="py-2 pe-4" colSpan={2}>
                    {locale === "ur"
                      ? "کل — سولر کے بغیر (12% کنٹیجنسی سمیت)"
                      : "Total without solar (incl. 12% contingency)"}
                  </td>
                  <td className="whitespace-nowrap py-2 text-end tabular-nums" dir="ltr">
                    {formatNumber(t.totalWithoutSolar)}
                  </td>
                </tr>
                <tr className="border-b-2 border-green text-green">
                  <td className="py-2 pe-4" colSpan={2}>
                    {locale === "ur"
                      ? "کل ہدف — 5 کلوواٹ سولر کے ساتھ (12% کنٹیجنسی سمیت)"
                      : "Goal — with 5kW solar (incl. 12% contingency)"}
                  </td>
                  <td className="whitespace-nowrap py-2 text-end tabular-nums" dir="ltr">
                    {formatNumber(t.totalWith5kwSolar)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Progress photos */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {p.galleryIds.map((id) => (
            <Photo key={id} id={id} locale={locale} />
          ))}
        </div>

        {/* Updates — linked journal entries */}
        {updates.length > 0 && (
          <section className="mt-12 border-t border-stone pt-8">
            <h2 className="font-serif text-xl font-semibold">
              {locale === "ur" ? "تازہ کاریاں" : "Updates"}
            </h2>
            <ul className="mt-4 space-y-2">
              {updates.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/${locale}/journal/${entry.slug}/`}
                    className="text-green underline hover:text-green-light"
                  >
                    {entry.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
