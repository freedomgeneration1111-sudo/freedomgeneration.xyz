import type { Metadata } from "next";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { contactPage } from "@/content/support";
import { pageMetadata } from "@/lib/meta";
import { Photo } from "@/components/Photo";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata({
    locale,
    path: "contact",
    title: contactPage.title[locale],
    description:
      locale === "ur"
        ? "فریڈم جنریشن سکول سے رابطہ کریں — فارم، پتہ، فون، واٹس ایپ اور ای میل۔"
        : "Contact Freedom Generation School — form, address, phone, WhatsApp, and email.",
    ogImageId: "CONTACT-01",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <div>
      <Photo
        id="CONTACT-01"
        locale={locale}
        priority
        showCaption={false}
        className="hero-frame"
      />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h1 className="mt-12 font-serif text-3xl font-semibold md:text-4xl">
          {contactPage.title[locale]}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed">{contactPage.intro[locale]}</p>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_20rem]">
          <ContactForm locale={locale} />

          <div className="font-sans text-[0.95rem]">
            <address className="not-italic leading-relaxed">
              <p className="font-medium">{site.legalName}</p>
              <p className="mt-2 text-ink/80">{site.address}</p>
              <p className="mt-4">
                <a href={`tel:${site.phone.replace(/[\s-]/g, "")}`} className="text-green underline">
                  {site.phone}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  rel="noopener"
                  className="text-green underline"
                >
                  {ui.footer.whatsapp[locale]}: {site.phone}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${site.email}`} className="text-green underline break-all">
                  {site.email}
                </a>
              </p>
            </address>
            <div className="mt-8 border-t border-stone pt-5">
              <h2 className="font-medium">{contactPage.visit.heading[locale]}</h2>
              <p className="mt-2 leading-relaxed text-ink/80">{contactPage.visit.body[locale]}</p>
            </div>
          </div>
        </div>

        {/* Map — OpenStreetMap embed placeholder (memory file §38) */}
        <section className="mt-14">
          <h2 className="font-serif text-xl font-semibold">{contactPage.map.heading[locale]}</h2>
          <div className="mt-4 flex aspect-[16/7] items-center justify-center border border-stone bg-clay/60 p-6 text-center">
            <p className="max-w-md font-sans text-sm text-ink/70">
              {contactPage.map.placeholder[locale]}{" "}
              <a
                href={contactPage.map.osmSearchUrl}
                rel="noopener"
                className="text-green underline"
              >
                OpenStreetMap
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
