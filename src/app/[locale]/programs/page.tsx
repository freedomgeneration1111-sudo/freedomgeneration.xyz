import type { Metadata } from "next";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { schoolFacts } from "@/content/schoolFacts";
import {
  academicYear,
  dailySchedule,
  eventTypeLabels,
  programsCopy,
} from "@/content/programs";
import { pageMetadata } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { Photo } from "@/components/Photo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "programs",
    title: ui.nav.programs[locale],
    description:
      locale === "ur"
        ? "پلے گروپ سے دسویں جماعت تک — تعلیمی سیشن 2026–2027، روزانہ کا شیڈول، اور سرکاری و سکول کی تقریبات کا مشترکہ کیلنڈر۔"
        : "Play Group through Grade 10 — the 2026–2027 session, the daily schedule, and the hybrid calendar of government dates and Freedom Generation functions.",
    ogImageId: "PROGRAMS-01",
  });
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const events = [...academicYear.events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {ui.nav.programs[locale]}
      </h1>
      <p className="mt-5 max-w-2xl leading-relaxed">{programsCopy.intro[locale]}</p>

      {/* Grades and curriculum — real HTML facts */}
      <section className="mt-10 border-t border-stone pt-6">
        <dl className="grid gap-x-10 gap-y-4 font-sans text-[0.95rem] sm:grid-cols-2">
          <div>
            <dt className="text-ink/60">{locale === "ur" ? "جماعتیں" : "Grades"}</dt>
            <dd className="mt-0.5">{site.grades[locale]}</dd>
          </div>
          <div>
            <dt className="text-ink/60">{locale === "ur" ? "طلباء" : "Enrollment"}</dt>
            <dd className="mt-0.5">
              {locale === "ur" ? `${site.enrollmentUr} طلباء` : `${site.enrollment} students`}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-ink/60">{locale === "ur" ? "نصاب" : "Curriculum"}</dt>
            <dd className="mt-0.5">{schoolFacts.curriculum[locale]}</dd>
          </div>
        </dl>
      </section>

      {/* Daily schedule */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          {locale === "ur" ? "روزانہ کا شیڈول" : "The school day"}
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[24rem] border-collapse font-sans text-[0.95rem]">
            <tbody>
              {dailySchedule.map((row) => (
                <tr key={row.time} className="border-b border-stone/70">
                  <td className="w-32 py-2 pe-4 text-ink/70" dir="ltr">
                    {row.time}
                  </td>
                  <td className="py-2">{row.activity[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hybrid calendar 2026–2027 */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          {locale === "ur" ? "تعلیمی کیلنڈر 2026–2027" : "Academic calendar 2026–2027"}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed">{programsCopy.calendarNote[locale]}</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse font-sans text-[0.92rem]">
            <thead>
              <tr className="border-b-2 border-green text-start">
                <th className="py-2 pe-4 text-start font-medium">
                  {locale === "ur" ? "تاریخ" : "Date"}
                </th>
                <th className="py-2 pe-4 text-start font-medium">
                  {locale === "ur" ? "موقع" : "Event"}
                </th>
                <th className="py-2 pe-4 text-start font-medium">
                  {locale === "ur" ? "قسم" : "Type"}
                </th>
                <th className="py-2 text-start font-medium">
                  {locale === "ur" ? "تفصیل" : "Description"}
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={`${event.date}-${event.title.en}`} className="border-b border-stone/70 align-top">
                  <td className="whitespace-nowrap py-2.5 pe-4 text-ink/80">
                    {formatDate(event.date, locale)}
                    {event.endDate ? ` – ${formatDate(event.endDate, locale)}` : ""}
                  </td>
                  <td className="py-2.5 pe-4 font-medium">{event.title[locale]}</td>
                  <td className="whitespace-nowrap py-2.5 pe-4 text-ink/70">
                    {eventTypeLabels[event.type][locale]}
                  </td>
                  <td className="py-2.5 text-ink/80">{event.description[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-sans text-sm text-ink/70">{programsCopy.participation[locale]}</p>
      </section>

      {/* Vocational vision as developing */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">
          {locale === "ur" ? "عملی ہنر — ترقی پذیر وژن" : "Practical skills — a developing vision"}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed">
          {schoolFacts.vocationalVision.intro[locale]}
        </p>
        <ul className="mt-4 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-1 font-sans text-sm text-ink/80">
          {schoolFacts.vocationalVision.areas.map((area) => (
            <li key={area.en}>{area[locale]}</li>
          ))}
        </ul>
      </section>

      <Photo id="PROGRAMS-02" locale={locale} className="mt-12" />
    </div>
  );
}
