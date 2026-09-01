// src/content/media/registry.ts — 24 photo jobs per memory file §39.
// Placeholder files live at /public/media/<id>.jpg in clay/stone tones sized to each
// job's orientation. Real photography drops in later by filename with zero code changes.

export type MediaRecord = {
  id: string;
  file: string; // /media/HERO-01.jpg
  alt: { en: string; ur: string };
  caption?: { en: string; ur: string };
  orientation: "16:9" | "4:3" | "3:2" | "4:5" | "21:9";
  consent: boolean;
  date?: string;
};

export const mediaRegistry: MediaRecord[] = [
  {
    id: "HERO-01",
    file: "/media/HERO-01.jpg",
    alt: {
      en: "Children and teacher during morning assembly at Freedom Generation School",
      ur: "فریڈم جنریشن سکول میں صبح کی اسمبلی کے دوران بچے اور استاد",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "ORIGIN-01",
    file: "/media/ORIGIN-01.jpg",
    alt: {
      en: "Early classroom at Freedom Generation School in 2020",
      ur: "2020 میں فریڈم جنریشن سکول کا ابتدائی کلاس روم",
    },
    caption: {
      en: "The first classroom, 2020 — a small place, simple materials, and a willingness to begin.",
      ur: "پہلا کلاس روم، 2020 — ایک چھوٹی جگہ، سادہ مواد، اور آغاز کرنے کی رضامندی۔",
    },
    orientation: "4:3",
    consent: true,
    date: "2020",
  },
  {
    id: "TODAY-01",
    file: "/media/TODAY-01.jpg",
    alt: {
      en: "Students learning in classroom",
      ur: "کلاس روم میں پڑھتے ہوئے طلباء",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "TODAY-02",
    file: "/media/TODAY-02.jpg",
    alt: { en: "Child reading book", ur: "کتاب پڑھتا ہوا بچہ" },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "TODAY-03",
    file: "/media/TODAY-03.jpg",
    alt: { en: "Children during group activity", ur: "گروپ سرگرمی کے دوران بچے" },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "LEARNING-01",
    file: "/media/LEARNING-01.jpg",
    alt: { en: "Blackboard and school books", ur: "بلیک بورڈ اور سکول کی کتابیں" },
    orientation: "3:2",
    consent: true,
  },
  {
    id: "FAITH-01",
    file: "/media/FAITH-01.jpg",
    alt: { en: "Children during prayer time", ur: "دعا کے وقت بچے" },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "CHALLENGE-01",
    file: "/media/CHALLENGE-01.jpg",
    alt: {
      en: "Empty desk representing students at risk of leaving school",
      ur: "خالی ڈیسک — ان طلباء کی علامت جو سکول چھوڑنے کے خطرے میں ہیں",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "VOCATIONAL-01",
    file: "/media/VOCATIONAL-01.jpg",
    alt: {
      en: "Vocational tools for future skills program",
      ur: "مستقبل کے ہنر پروگرام کے لیے پیشہ ورانہ اوزار",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "JOURNAL-COVER-01",
    file: "/media/JOURNAL-COVER-01.jpg",
    alt: {
      en: "Daily life at Freedom Generation School — a morning of assembly and lessons",
      ur: "فریڈم جنریشن سکول کی روزمرہ زندگی — اسمبلی اور اسباق کی ایک صبح",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "JOURNAL-COVER-02",
    file: "/media/JOURNAL-COVER-02.jpg",
    alt: {
      en: "School building exterior — six classrooms and a hall",
      ur: "سکول کی عمارت کا بیرونی منظر — چھ کلاس رومز اور ایک ہال",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "JOURNAL-COVER-03",
    file: "/media/JOURNAL-COVER-03.jpg",
    alt: {
      en: "Construction interior of the school building nearing completion",
      ur: "تکمیل کے قریب سکول کی عمارت کا اندرونی تعمیراتی منظر",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "PROJECT-01",
    file: "/media/PROJECT-01.jpg",
    alt: {
      en: "School building under construction, 80% complete",
      ur: "زیرِ تعمیر سکول کی عمارت، 80 فیصد مکمل",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "PROJECT-02",
    file: "/media/PROJECT-02.jpg",
    alt: {
      en: "Large hall interior, unfinished",
      ur: "بڑے ہال کا اندرونی حصہ، نامکمل",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "PROJECT-03",
    file: "/media/PROJECT-03.jpg",
    alt: {
      en: "Construction detail — wall and flooring work",
      ur: "تعمیراتی تفصیل — دیوار اور فرش کا کام",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "PROJECT-04",
    file: "/media/PROJECT-04.jpg",
    alt: {
      en: "What remains — roof and electrical detail",
      ur: "جو باقی ہے — چھت اور بجلی کے کام کی تفصیل",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "TEACHING-01",
    file: "/media/TEACHING-01.jpg",
    alt: {
      en: "Teachers planning lessons together",
      ur: "اساتذہ مل کر اسباق کی منصوبہ بندی کرتے ہوئے",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "TEACHING-02",
    file: "/media/TEACHING-02.jpg",
    alt: {
      en: "Lesson plans and teaching materials",
      ur: "اسباق کے منصوبے اور تدریسی مواد",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "PROGRAMS-01",
    file: "/media/PROGRAMS-01.jpg",
    alt: {
      en: "School timetable board on the wall",
      ur: "دیوار پر سکول کا نظام الاوقات بورڈ",
    },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "PROGRAMS-02",
    file: "/media/PROGRAMS-02.jpg",
    alt: { en: "Stack of school books and stationery", ur: "سکول کی کتابوں اور سٹیشنری کا ڈھیر" },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "COMMUNITY-01",
    file: "/media/COMMUNITY-01.jpg",
    alt: {
      en: "Parents and community gathering at school",
      ur: "سکول میں والدین اور برادری کا اجتماع",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "CONTACT-01",
    file: "/media/CONTACT-01.jpg",
    alt: {
      en: "Entrance to Freedom Generation School",
      ur: "فریڈم جنریشن سکول کا داخلی دروازہ",
    },
    orientation: "16:9",
    consent: true,
  },
  {
    id: "TRANSPARENCY-01",
    file: "/media/TRANSPARENCY-01.jpg",
    alt: { en: "School financial records", ur: "سکول کے مالی ریکارڈ" },
    orientation: "4:3",
    consent: true,
  },
  {
    id: "FOOTER-TRUST",
    file: "/media/FOOTER-TRUST.jpg",
    alt: {
      en: "Students at Freedom Generation School",
      ur: "فریڈم جنریشن سکول کے طلباء",
    },
    orientation: "21:9",
    consent: true,
  },
];

export function media(id: string): MediaRecord {
  const record = mediaRegistry.find((m) => m.id === id);
  if (!record) throw new Error(`Unknown media id: ${id}`);
  return record;
}
