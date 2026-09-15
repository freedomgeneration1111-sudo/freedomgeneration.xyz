import type { Metadata } from "next";
import Link from "next/link";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import {
  operatingBudget,
  operatingLines,
  combinedPicture,
  transparencyCopy,
} from "@/content/transparency";
import { pageMetadata } from "@/lib/meta";
import { formatNumber, formatPKR } from "@/lib/format";
import { Photo } from "@/components/Photo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "transparency",
    title: ui.nav.transparency[locale],
    description:
      locale === "ur"
        ? "حقیقی اعداد، درست زمرے — آپریٹنگ بجٹ 290,667 روپے ماہانہ، 3,488,000 روپے سالانہ، فی طالب علم 29,067 روپے سالانہ۔"
        : "Real numbers in precise categories — operating budget Rs 290,667/month, Rs 3,488,000/year, Rs 29,067 per student per year.",
    ogImageId: "TRANSPARENCY-01",
  });
}

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const b = operatingBudget;
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {ui.nav.transparency[locale]}
      </h1>

      <p className="mt-5 leading-relaxed">{transparencyCopy.philosophy[locale]}</p>
      <p className="mt-4 leading-relaxed">{transparencyCopy.designatedFunds[locale]}</p>

      {/* Legal + governance */}
      <section className="mt-10 border-t border-plum pt-6 font-sans text-[0.95rem]">
        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-ink/60">{locale === "ur" ? "قانونی نام" : "Legal name"}</dt>
            <dd className="mt-0.5">{site.legalName}</dd>
          </div>
          <div>
            <dt className="text-ink/60">{locale === "ur" ? "رجسٹریشن" : "Registration"}</dt>
            <dd className="mt-0.5">{ui.footer.registration[locale]}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-ink/60">{locale === "ur" ? "نظم و نسق" : "Governance"}</dt>
            <dd className="mt-0.5">{site.governance[locale]}</dd>
          </div>
        </dl>
      </section>

      {/* Operating budget — verbatim §50/§51, 52-week year */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          {locale === "ur" ? "آپریٹنگ بجٹ 2026" : "Operating budget 2026"}
        </h2>
        <p className="mt-3 font-sans text-sm text-ink/70">{transparencyCopy.weekNote[locale]}</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse font-sans text-[0.92rem]">
            <thead>
              <tr className="border-b-2 border-plum">
                <th className="py-2 pe-4 text-start font-medium">
                  {locale === "ur" ? "زمرہ" : "Category"}
                </th>
                <th className="py-2 pe-4 text-end font-medium">
                  {locale === "ur" ? "ماہانہ اوسط (روپے)" : "Monthly avg (PKR)"}
                </th>
                <th className="py-2 pe-4 text-end font-medium">
                  {locale === "ur" ? "سالانہ (روپے)" : "Annual (PKR)"}
                </th>
                <th className="py-2 text-start font-medium">
                  {locale === "ur" ? "شفافیت کا زمرہ" : "Transparency category"}
                </th>
              </tr>
            </thead>
            <tbody>
              {operatingLines.map((line) => (
                <tr key={line.key} className="border-b border-stone/60 align-top">
                  <td className="py-2.5 pe-4">
                    {line.label[locale]}
                    {line.note && (
                      <span className="block text-[0.82rem] text-ink/60">{line.note[locale]}</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pe-4 text-end tabular-nums" dir="ltr">
                    {formatNumber(b.monthly[line.key])}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pe-4 text-end tabular-nums" dir="ltr">
                    {formatNumber(b.annual[line.key])}
                  </td>
                  <td className="py-2.5 text-ink/70">{line.transparencyCategory[locale]}</td>
                </tr>
              ))}
              <tr className="border-b-2 border-green font-medium text-green">
                <td className="py-2.5 pe-4">
                  {locale === "ur" ? "کل آپریٹنگ" : "Total operating"}
                </td>
                <td className="whitespace-nowrap py-2.5 pe-4 text-end tabular-nums" dir="ltr">
                  {formatNumber(b.monthly.total)}
                </td>
                <td className="whitespace-nowrap py-2.5 pe-4 text-end tabular-nums" dir="ltr">
                  {formatNumber(b.annual.total)}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-sans text-sm text-ink/70">
          {locale === "ur"
            ? `سادہ 4 ہفتہ حساب: ${formatNumber(b.monthly.totalSimple)} روپے ماہانہ / ${formatNumber(b.annual.totalSimple)} روپے سالانہ (48 ہفتے)۔`
            : `Simple 4-week figures: Rs ${formatNumber(b.monthly.totalSimple)}/month, Rs ${formatNumber(b.annual.totalSimple)}/year (48-week).`}
        </p>
      </section>

      {/* Per-student cost */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          {locale === "ur" ? "فی طالب علم لاگت" : "Per-student cost"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {locale === "ur"
            ? `120 طلباء کی بنیاد پر (اندراج ${site.enrollmentUr} ہے): فی طالب علم سالانہ ${formatNumber(b.perStudentAnnual)} روپے (${b.perStudentAnnualUsd})، یعنی ماہانہ ${formatNumber(b.perStudentMonthly)} روپے۔`
            : `On a baseline of 120 students (enrollment is ${site.enrollment}): Rs ${formatNumber(b.perStudentAnnual)} per student per year (${b.perStudentAnnualUsd}), or Rs ${formatNumber(b.perStudentMonthly)} per month.`}
        </p>
      </section>

      {/* Combined picture — §52 */}
      <section className="mt-12 bg-clay p-6">
        <h2 className="font-serif text-xl font-semibold">
          {locale === "ur" ? "مجموعی مالی تصویر" : "The combined picture"}
        </h2>
        <dl className="mt-4 space-y-2 font-sans text-[0.95rem]">
          <div className="flex flex-wrap justify-between gap-2">
            <dt>
              {locale === "ur"
                ? "عمارت کی تکمیل (5 کلوواٹ سولر سمیت) — یک وقتی"
                : "Building completion (with 5kW solar) — one-time"}
            </dt>
            <dd className="tabular-nums" dir="ltr">
              {formatPKR(combinedPicture.buildingCompletionWithSolar, locale)}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt>{locale === "ur" ? "سالانہ آپریٹنگ (52 ہفتے)" : "Annual operating (52-week)"}</dt>
            <dd className="tabular-nums" dir="ltr">
              {formatPKR(combinedPicture.annualOperating, locale)}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-stone pt-2 font-medium">
            <dt>
              {locale === "ur" ? "پہلے سال کی مجموعی ضرورت" : "Combined year-one need"}{" "}
              ({combinedPicture.combinedYearOneUsd})
            </dt>
            <dd className="tabular-nums" dir="ltr">
              {formatPKR(combinedPicture.combinedYearOne, locale)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 font-sans text-sm">
          <Link
            href={`/${locale}/projects/complete-school-building/`}
            className="text-green underline hover:text-green-light"
          >
            {locale === "ur" ? "عمارت کی تکمیل کا منصوبہ دیکھیں" : "See the building completion project"}
          </Link>
        </p>
      </section>

      <Photo id="TRANSPARENCY-01" locale={locale} className="mt-12" />
    </div>
  );
}
