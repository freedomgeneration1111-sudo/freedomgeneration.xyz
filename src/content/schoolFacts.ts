// src/content/schoolFacts.ts — durable school facts drawn from memory file §2/§4/§34

export const schoolFacts = {
  curriculum: {
    en: "Pakistan standard curriculum with bilingual learning goals, plus a Bible-based Foundation Class in development",
    ur: "پاکستان کا معیاری نصاب دو لسانی تعلیمی اہداف کے ساتھ، نیز بائبل پر مبنی فاؤنڈیشن کلاس جو زیرِ تشکیل ہے",
  },
  facilities: {
    en: "Six classrooms and one larger hall where children learn, gather, worship, and celebrate",
    ur: "چھ کلاس رومز اور ایک بڑا ہال جہاں بچے سیکھتے، جمع ہوتے، عبادت کرتے اور خوشی مناتے ہیں",
  },
  retentionChallenge: {
    en: "Some students leave school around age 11 because economic pressure pushes them toward work.",
    ur: "کچھ طلباء تقریباً 11 سال کی عمر میں سکول چھوڑ دیتے ہیں کیونکہ معاشی دباؤ انہیں کام کی طرف دھکیلتا ہے۔",
  },
  fundingToday: {
    en: "Primarily small local donations and irregular support; the school is actively seeking a broader and more stable funding base.",
    ur: "بنیادی طور پر چھوٹے مقامی عطیات اور بے قاعدہ تعاون؛ سکول ایک وسیع تر اور مستحکم مالی بنیاد کے لیے کوشاں ہے۔",
  },
  vocationalVision: {
    intro: {
      en: "A developing long-term vision: practical and vocational opportunities alongside academic education.",
      ur: "ایک ترقی پذیر طویل مدتی وژن: تعلیمی تعلیم کے ساتھ ساتھ عملی اور پیشہ ورانہ مواقع۔",
    },
    areas: [
      { en: "computers and digital literacy", ur: "کمپیوٹر اور ڈیجیٹل خواندگی" },
      { en: "English communication", ur: "انگریزی ابلاغ" },
      { en: "sewing and garment skills", ur: "سلائی اور ملبوسات کی مہارت" },
      { en: "electrical work", ur: "بجلی کا کام" },
      { en: "motorcycle mechanics", ur: "موٹر سائیکل مکینک" },
      { en: "mobile-phone repair", ur: "موبائل فون کی مرمت" },
      { en: "carpentry", ur: "بڑھئی کا کام" },
      { en: "beauty and personal-care skills", ur: "بیوٹی اور پرسنل کیئر کی مہارت" },
    ],
  },
} as const;
