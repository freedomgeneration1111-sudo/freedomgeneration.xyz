// src/content/i18n.ts — locales and shared UI strings (per memory file §40)

export type Locale = "en" | "ur";
export const locales: Locale[] = ["en", "ur"];
export const defaultLocale: Locale = "en";

export type Localized = { en: string; ur: string };

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ur" ? "rtl" : "ltr";
}

/** Shared interface strings — content copy lives in the other content modules. */
export const ui = {
  nav: {
    ourStory: { en: "Our Story", ur: "ہماری کہانی" },
    teaching: { en: "Teaching", ur: "تدریس" },
    programs: { en: "Programs", ur: "پروگرامز" },
    journal: { en: "Journal", ur: "جریدہ" },
    projects: { en: "Projects", ur: "منصوبے" },
    transparency: { en: "Transparency", ur: "شفافیت" },
    contact: { en: "Contact", ur: "رابطہ" },
    support: { en: "Ways to Help", ur: "مدد کے طریقے" },
  },
  actions: {
    readJournal: { en: "Read the Journal →", ur: "جریدہ پڑھیں" },
    viewProject: { en: "See the project", ur: "منصوبہ دیکھیں" },
    allProjects: { en: "All projects", ur: "تمام منصوبے" },
    openMenu: { en: "Open menu", ur: "مینیو کھولیں" },
    closeMenu: { en: "Close menu", ur: "مینیو بند کریں" },
  },
  labels: {
    kicker: {
      en: "A real school in Faisalabad — Play Group to Grade 10 — more than 120 students",
      ur: "فیصل آباد میں ایک حقیقی سکول — پلے گروپ سے دسویں جماعت تک — 120 سے زیادہ طلباء",
    },
    journalSectionTitle: { en: "School Journal — Living Record", ur: "سکول جریدہ — زندہ ریکارڈ" },
    currentProject: { en: "Current project", ur: "موجودہ منصوبہ" },
    complete: { en: "complete", ur: "مکمل" },
    remains: { en: "remains", ur: "باقی" },
    goal: { en: "Goal", ur: "ہدف" },
    funded: { en: "Funded", ur: "فنڈ شدہ" },
    rupees: { en: "PKR", ur: "روپے" },
    by: { en: "By", ur: "از" },
    category: {
      "school-life": { en: "School life", ur: "سکول کی زندگی" },
      story: { en: "Story", ur: "کہانی" },
      event: { en: "Event", ur: "تقریب" },
      "project-update": { en: "Project update", ur: "منصوبے کی تازہ کاری" },
      worship: { en: "Worship", ur: "عبادت" },
      milestone: { en: "Milestone", ur: "سنگ میل" },
    },
    status: {
      "in-progress": { en: "In progress", ur: "جاری" },
      funded: { en: "Funded", ur: "فنڈ شدہ" },
      completed: { en: "Completed", ur: "مکمل" },
    },
  },
  footer: {
    donate: { en: "Donate", ur: "عطیہ کریں" },
    donateNote: {
      en: "Giving goes further when you first understand the school — start with the Journal and Transparency.",
      ur: "عطیہ اس وقت زیادہ مؤثر ہوتا ہے جب آپ پہلے سکول کو سمجھ لیں — جریدہ اور شفافیت سے آغاز کریں۔",
    },
    staffNote: {
      en: "10 staff — 9 teachers and 1 security guard. The teachers' council acts as the governing body.",
      ur: "10 عملہ — 9 اساتذہ اور 1 سیکیورٹی گارڈ۔ اساتذہ کی کونسل گورننگ باڈی کے طور پر کام کرتی ہے۔",
    },
    registration: { en: "registration pending", ur: "رجسٹریشن زیر التوا" },
    whatsapp: { en: "WhatsApp", ur: "واٹس ایپ" },
    copyright: { en: "Freedom Generation School, 2020–2026", ur: "فریڈم جنریشن سکول، 2020–2026" },
  },
  contact: {
    name: { en: "Your name", ur: "آپ کا نام" },
    reachback: { en: "Email or WhatsApp number", ur: "ای میل یا واٹس ایپ نمبر" },
    subject: { en: "Subject", ur: "موضوع" },
    subjects: {
      general: { en: "General", ur: "عمومی" },
      partnership: { en: "Partnership", ur: "شراکت داری" },
      volunteer: { en: "Volunteer", ur: "رضاکار" },
      support: { en: "Support", ur: "تعاون" },
      media: { en: "Media", ur: "میڈیا" },
    },
    message: { en: "Message", ur: "پیغام" },
    send: { en: "Send message", ur: "پیغام بھیجیں" },
    sending: { en: "Sending…", ur: "بھیجا جا رہا ہے…" },
    sent: {
      en: "Message sent. We will reply by email or WhatsApp.",
      ur: "پیغام بھیج دیا گیا۔ ہم ای میل یا واٹس ایپ پر جواب دیں گے۔",
    },
    failed: {
      en: "The message could not be sent. Please email us directly at",
      ur: "پیغام نہیں بھیجا جا سکا۔ براہ کرم ہمیں براہ راست ای میل کریں:",
    },
  },
} as const;
