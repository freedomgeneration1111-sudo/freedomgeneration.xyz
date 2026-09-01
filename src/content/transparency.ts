// src/content/transparency.ts — real operating budget per memory file §50–§52, verbatim.
// Funding-language principle per §14: precise, accountable category language only.
// Never claim "100% / zero overhead."

export type BudgetCategory = {
  key: "teacher-comp" | "classroom" | "materials" | "facility" | "admin" | "fees" | "in-kind";
  label: { en: string; ur: string };
  amount: number;
};

// §51 — verbatim numbers, 52-week year
export const operatingBudget = {
  currency: "PKR",
  year: 2026,
  enrollmentBaseline: 120,
  monthly: {
    power: 50000,
    staffStipends: 216667, // 52-week average — see note
    staffStipendsSimple: 200000, // 4-week
    garbage: 2167,
    waterFilter: 500,
    stationary: 10000,
    cleaningRepairs: 3000,
    teachersMeetings: 5000,
    events: 3333,
    total: 290667,
    totalSimple: 273833,
  },
  annual: {
    power: 600000,
    staffStipends: 2600000,
    staffStipendsSimple: 2400000,
    garbage: 26000,
    waterFilter: 6000,
    stationary: 120000,
    cleaningRepairs: 36000,
    teachersMeetings: 60000,
    events: 40000,
    total: 3488000,
    totalSimple: 3286000,
  },
  perStudentAnnual: 29067,
  perStudentMonthly: 2422,
  perStudentAnnualUsd: "~$104",
} as const;

export type OperatingLineKey = keyof Omit<
  typeof operatingBudget.monthly,
  "total" | "totalSimple" | "staffStipendsSimple"
>;

export const operatingLines: {
  key: OperatingLineKey;
  label: { en: string; ur: string };
  note?: { en: string; ur: string };
  transparencyCategory: { en: string; ur: string };
}[] = [
  {
    key: "staffStipends",
    label: {
      en: "Staff stipends — 9 teachers + 1 security guard, Rs 5,000/week each",
      ur: "عملے کے وظائف — 9 اساتذہ + 1 سیکیورٹی گارڈ، فی کس 5,000 روپے فی ہفتہ",
    },
    note: {
      en: "Rs 50,000/week × 52 weeks. Stipends are modest — about Rs 20,000 per staff member per month.",
      ur: "50,000 روپے فی ہفتہ × 52 ہفتے۔ وظائف معمولی ہیں — تقریباً 20,000 روپے فی فرد ماہانہ۔",
    },
    transparencyCategory: { en: "Teacher compensation", ur: "اساتذہ کا معاوضہ" },
  },
  {
    key: "power",
    label: { en: "Power / electricity", ur: "بجلی" },
    note: {
      en: "Average bill — varies by season (summer coolers, less in winter).",
      ur: "اوسط بل — موسم کے مطابق بدلتا ہے (گرمیوں میں کولر، سردیوں میں کم)۔",
    },
    transparencyCategory: { en: "Facility / building", ur: "عمارت / سہولیات" },
  },
  {
    key: "stationary",
    label: { en: "Stationery & supplies", ur: "سٹیشنری اور سامان" },
    note: { en: "Books, copies, chalk.", ur: "کتابیں، کاپیاں، چاک۔" },
    transparencyCategory: { en: "Educational materials", ur: "تعلیمی مواد" },
  },
  {
    key: "teachersMeetings",
    label: { en: "Teachers' meetings", ur: "اساتذہ کے اجلاس" },
    note: { en: "Tea, materials.", ur: "چائے، مواد۔" },
    transparencyCategory: { en: "Administration", ur: "انتظامیہ" },
  },
  {
    key: "events",
    label: { en: "School events (rentals & food)", ur: "سکول کی تقریبات (کرایہ اور کھانا)" },
    note: { en: "Rs 40,000 annually, averaged monthly.", ur: "سالانہ 40,000 روپے، ماہانہ اوسط۔" },
    transparencyCategory: { en: "Classroom / program costs", ur: "کلاس روم / پروگرام اخراجات" },
  },
  {
    key: "cleaningRepairs",
    label: { en: "Cleaning & repairs", ur: "صفائی اور مرمت" },
    transparencyCategory: { en: "Facility / building", ur: "عمارت / سہولیات" },
  },
  {
    key: "garbage",
    label: { en: "Garbage collection", ur: "کوڑا اٹھوائی" },
    note: { en: "Rs 500/week × 52.", ur: "500 روپے فی ہفتہ × 52۔" },
    transparencyCategory: { en: "Administration", ur: "انتظامیہ" },
  },
  {
    key: "waterFilter",
    label: { en: "Water filter", ur: "واٹر فلٹر" },
    transparencyCategory: { en: "Facility / building", ur: "عمارت / سہولیات" },
  },
];

// §52 — combined funding picture, verbatim
export const combinedPicture = {
  buildingCompletionWithSolar: 3383520,
  annualOperating: 3488000,
  combinedYearOne: 6871520,
  combinedYearOneUsd: "~$24,540",
} as const;

export const transparencyCopy = {
  philosophy: {
    en: "We copy the accounting discipline of the most transparent charities — not their branding or their slogans. We make only claims we can account for precisely. We will never tell you that running a school has zero overhead, because it does not: teachers must be paid, electricity bills arrive, and meetings need tea. Instead, we publish real categories with real numbers — teacher compensation, classroom and program costs, educational materials, facility and building costs, administration — and, as our reporting matures, what was funded, what was spent, and what changed.",
    ur: "ہم سب سے شفاف فلاحی اداروں کے حساب کتاب کے نظم کی پیروی کرتے ہیں — ان کے برانڈ یا نعروں کی نہیں۔ ہم صرف وہی دعوے کرتے ہیں جن کا درست حساب دے سکیں۔ ہم کبھی نہیں کہیں گے کہ سکول چلانے کا کوئی انتظامی خرچ نہیں ہوتا، کیونکہ ہوتا ہے: اساتذہ کو معاوضہ دینا ہوتا ہے، بجلی کے بل آتے ہیں، اور اجلاسوں میں چائے بھی چاہیے۔ اس کے بجائے ہم حقیقی زمروں میں حقیقی اعداد شائع کرتے ہیں — اساتذہ کا معاوضہ، کلاس روم اور پروگرام اخراجات، تعلیمی مواد، عمارت کے اخراجات، انتظامیہ — اور جیسے جیسے ہماری رپورٹنگ پختہ ہوگی، یہ بھی کہ کیا فنڈ ہوا، کیا خرچ ہوا، اور کیا بدلا۔",
  },
  designatedFunds: {
    en: "Where a donation is designated for a specific project or category, it is used for that purpose. Website development and certain administrative services are currently donated separately, in kind.",
    ur: "جہاں کوئی عطیہ کسی مخصوص منصوبے یا زمرے کے لیے مختص ہو، وہ اسی مقصد کے لیے استعمال ہوتا ہے۔ ویب سائٹ کی تیاری اور بعض انتظامی خدمات اس وقت الگ سے، بلا معاوضہ عطیہ کی جاتی ہیں۔",
  },
  weekNote: {
    en: "Figures use a 52-week year (the real year). Staff stipends average Rs 216,667/month on a 52-week basis; the simple 4-week figure often used locally is Rs 200,000/month.",
    ur: "اعداد و شمار 52 ہفتوں کے سال پر مبنی ہیں (حقیقی سال)۔ عملے کے وظائف 52 ہفتوں کی بنیاد پر اوسطاً 216,667 روپے ماہانہ ہیں؛ مقامی طور پر رائج سادہ 4 ہفتہ حساب 200,000 روپے ماہانہ بنتا ہے۔",
  },
} as const;
