"use client";

import { useState } from "react";
import { ui, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

const subjects = ["general", "partnership", "volunteer", "support", "media"] as const;

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const t = ui.contact;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1 w-full border border-stone bg-paper px-3 py-2 font-sans text-[0.95rem] focus:border-green";

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block font-sans text-sm">
          {t.name[locale]}
          <input name="name" required maxLength={200} className={field} />
        </label>
        <label className="block font-sans text-sm">
          {t.reachback[locale]}
          <input name="contact" required maxLength={200} className={field} />
        </label>
      </div>
      <label className="mt-4 block font-sans text-sm">
        {t.subject[locale]}
        <select name="subject" className={field} defaultValue="general">
          {subjects.map((s) => (
            <option key={s} value={s}>
              {t.subjects[s][locale]}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block font-sans text-sm">
        {t.message[locale]}
        <textarea name="message" required rows={6} maxLength={5000} className={field} />
      </label>
      {/* Honeypot — hidden from people, filled by naive bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 bg-green px-5 py-2.5 font-sans text-sm text-paper hover:bg-green-light disabled:opacity-60"
      >
        {status === "sending" ? t.sending[locale] : t.send[locale]}
      </button>
      <p role="status" className="mt-3 min-h-6 font-sans text-sm">
        {status === "sent" && <span className="text-green">{t.sent[locale]}</span>}
        {status === "error" && (
          <span className="text-error">
            {t.failed[locale]}{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}
