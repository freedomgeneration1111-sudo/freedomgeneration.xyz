// src/content/site.ts — locked facts, verbatim per memory file §34/§40. Do not paraphrase or round.

export const site = {
  domain: "freedomgeneration.xyz",
  url: "https://freedomgeneration.xyz",
  name: { en: "Freedom Generation School", ur: "فریڈم جنریشن سکول" },
  tagline: { en: "teach your children well", ur: "اپنے بچوں کو اچھی تعلیم دو" },
  legalName: "Freedom Generation School System",
  registrationStatus: "registration pending",
  founded: 2020,
  address:
    "Daak Khana Khas Chak 007 JB Punjawar Kohala, Faisalabad Punjab Pakistan 38000",
  phone: "+92 318-707-7423",
  whatsapp: "923187077423",
  email: "freedomgenerationschool@gmail.com",
  enrollment: "more than 120",
  enrollmentUr: "120 سے زیادہ",
  grades: { en: "Play Group through Grade 10", ur: "پلے گروپ سے دسویں جماعت تک" },
  staff: { total: 10, teachers: 9, security: 1 },
  founder: "Komal Shahzadi",
  founderUr: "کومل شہزادی",
  governance: {
    en: "No formal board — the teachers' council (9 teachers and 1 security guard, 10 staff) meets regularly and acts as the governing body. Collaborative and teacher-led.",
    ur: "کوئی رسمی بورڈ نہیں — اساتذہ کی کونسل (9 اساتذہ اور 1 سیکیورٹی گارڈ، 10 عملہ) باقاعدگی سے ملتی ہے اور گورننگ باڈی کے طور پر کام کرتی ہے۔ باہمی تعاون پر مبنی اور اساتذہ کی قیادت میں۔",
  },
} as const;

export const northStar = {
  school: {
    reference: { en: "John 8:31–32", ur: "یوحنا 8:31–32" },
    text: {
      en: "If ye continue in my word, then are ye my disciples indeed; and ye shall know the truth, and the truth shall make you free.",
      ur: "اگر تم میرے کلام پر قائم رہو گے تو حقیقت میں میرے شاگرد ٹھہرو گے؛ اور سچائی کو جانو گے اور سچائی تم کو آزاد کرے گی۔",
    },
  },
  website: {
    reference: { en: "Matthew 5:14–16", ur: "متی 5:14–16" },
    text: {
      en: "Ye are the light of the world… let your light so shine before men, that they may see your good works, and glorify your Father.",
      ur: "تم دنیا کے نور ہو… تمہاری روشنی آدمیوں کے سامنے چمکے تاکہ وہ تمہارے نیک کاموں کو دیکھ کر تمہارے باپ کی تمجید کریں۔",
    },
  },
} as const;
