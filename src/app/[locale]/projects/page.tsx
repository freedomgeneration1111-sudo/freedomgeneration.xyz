import type { Metadata } from "next";
import Link from "next/link";
import { ui, type Locale } from "@/content/i18n";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/meta";
import { formatPKR } from "@/lib/format";
import { Photo } from "@/components/Photo";
import { Progress } from "@/components/Progress";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "projects",
    title: ui.nav.projects[locale],
    description:
      locale === "ur"
        ? "مخصوص، محدود اور قابلِ تصدیق منصوبے — کیا درکار ہے، کیا فنڈ ہوا، کیا مکمل ہوا۔"
        : "Specific, bounded, verifiable projects — what is needed, what was funded, what was completed.",
    ogImageId: "PROJECT-01",
  });
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {ui.nav.projects[locale]}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed">
        {locale === "ur"
          ? "ہم عمومی عطیات کی بجائے مخصوص ضروریات کو ترجیح دیتے ہیں۔ ہر منصوبے کا ہدف، بجٹ اور پیش رفت عوامی ہے۔"
          : "We prefer specific needs over generic giving. Every project's goal, budget, and progress are public."}
      </p>
      <div className="mt-10 space-y-12 border-t border-sage pt-10">
        {projects.map((project) => (
          <article key={project.slug} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <Photo id={project.coverId} locale={locale} showCaption={false} />
            <div>
              <p className="font-sans text-sm text-sage">
                {ui.labels.status[project.status][locale]}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold leading-snug">
                <Link
                  href={`/${locale}/projects/${project.slug}/`}
                  className="no-underline hover:text-green"
                >
                  {project.title[locale]}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed">{project.summary[locale]}</p>
              <div className="mt-5">
                <Progress percent={project.percentComplete} locale={locale} />
              </div>
              <p className="mt-3 font-sans text-sm text-ink/80">
                {ui.labels.goal[locale]}: {formatPKR(project.goalAmount, locale)}
              </p>
              <p className="mt-4">
                <Link
                  href={`/${locale}/projects/${project.slug}/`}
                  className="font-sans text-sm text-green underline hover:text-green-light"
                >
                  {ui.actions.viewProject[locale]}
                </Link>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
