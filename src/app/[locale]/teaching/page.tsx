import type { Metadata } from "next";
import { type Locale } from "@/content/i18n";
import { teaching } from "@/content/teaching";
import { pageMetadata } from "@/lib/meta";
import { Photo } from "@/components/Photo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "teaching",
    title: teaching.title[locale],
    description:
      locale === "ur"
        ? "فریڈم جنریشن کا طریقہ تدریس — چھ اصول: سوال سے آغاز، نوٹ بک سسٹم، ہر طالب علم سے وہیں ملنا جہاں وہ ہے، پہلے حرف سے دو لسانی، ایمان اور کردار، روزگار کی طرف تعمیر۔"
        : "How Freedom Generation teaches — six principles: starting from why, the notebook system, meeting each student where they are, bilingual from the first letter, faith and character, and building toward a livelihood.",
    ogImageId: "TEACHING-01",
  });
}

// Philosophy and method only — no individual teacher photos or bios (memory file §59).
export default async function TeachingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <div className="mx-auto max-w-2xl px-5 md:px-0">
      <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
        {teaching.title[locale]}
      </h1>
      <p className="mt-5 font-serif text-xl leading-relaxed text-ink/90">
        {teaching.intro[locale]}
      </p>

      <div className="mt-12 space-y-12">
        {teaching.principles.map((principle) => (
          <section key={principle.key}>
            <h2 className="font-serif text-2xl font-semibold">{principle.title[locale]}</h2>
            <p className="mt-3 leading-relaxed">{principle.body[locale]}</p>
            {"photoId" in principle && principle.photoId && (
              <Photo id={principle.photoId} locale={locale} className="mt-6" showCaption={false} />
            )}
          </section>
        ))}
      </div>

      <section className="mt-14 border-t border-dusty-blue pt-8">
        <p className="font-sans text-sm leading-relaxed text-ink/80">
          {teaching.governance[locale]}
        </p>
      </section>
    </div>
  );
}
