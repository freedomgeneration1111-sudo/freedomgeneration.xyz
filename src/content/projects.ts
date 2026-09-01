// src/content/projects.ts — project records per memory file §40/§47/§48.
// Every amount below is transcribed verbatim from §47 (Faisalabad market pricing, 2026).
// Do not recompute or re-round any line. Totals are locked constants, not sums at render time.

export type BudgetItem = {
  code: string; // §47 row code, e.g. "A4"
  category: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  label: { en: string; ur: string };
  qty: string;
  unitCost: number;
  amount: number;
  note?: { en: string; ur: string };
};

export type Project = {
  slug: string;
  title: { en: string; ur: string };
  status: "in-progress" | "funded" | "completed";
  percentComplete: number;
  summary: { en: string; ur: string };
  body: { en: string; ur: string }; // markdown
  goalAmount: number; // PKR
  altGoalAmount: number; // PKR, essential completion without solar
  amountFunded: number;
  amountSpent: number;
  budgetItems: BudgetItem[];
  coverId: string;
  galleryIds: string[];
  updates: string[]; // journal slugs
};

export const budgetCategories: Record<string, { en: string; ur: string }> = {
  A: { en: "Electrical Work", ur: "بجلی کا کام" },
  B: { en: "Doors & Windows", ur: "دروازے اور کھڑکیاں" },
  C: { en: "Flooring & Finishing", ur: "فرش اور فنشنگ" },
  D: { en: "Ventilation & Cooling", ur: "ہوا اور ٹھنڈک" },
  E: { en: "Plumbing & Water System", ur: "پلمبنگ اور پانی کا نظام" },
  F: { en: "Furniture", ur: "فرنیچر" },
  G: { en: "Safety Requirements", ur: "حفاظتی تقاضے" },
  H: { en: "Certification", ur: "سرٹیفیکیشن" },
};

// §47 locked totals — verbatim
export const buildingBudgetTotals = {
  subtotalWithoutSolar: 2271000,
  subtotalWith3kwSolar: 2721000,
  subtotalWith5kwSolar: 3021000,
  contingencyRate: 0.12,
  totalWithoutSolar: 2543520,
  totalWith3kwSolar: 3047520,
  totalWith5kwSolar: 3383520,
} as const;

const budgetItems: BudgetItem[] = [
  { code: "A1", category: "A", label: { en: "Internal copper wiring + labour", ur: "اندرونی کاپر وائرنگ + مزدوری" }, qty: "1 lot", unitCost: 150000, amount: 150000, note: { en: "7/29, 90m rolls, conduit", ur: "7/29، 90 میٹر رول، کنڈیوٹ" } },
  { code: "A2", category: "A", label: { en: "Switch boards & fittings", ur: "سوئچ بورڈز اور فٹنگز" }, qty: "30", unitCost: 800, amount: 24000, note: { en: "AMSON pearl deluxe type", ur: "AMSON پرل ڈیلکس" } },
  { code: "A3", category: "A", label: { en: "LED lights 12–13W", ur: "ایل ای ڈی لائٹس 12–13 واٹ" }, qty: "30", unitCost: 1200, amount: 36000 },
  { code: "A4", category: "A", label: { en: "Ceiling fans AC-DC Inverter King Model", ur: "سیلنگ پنکھے AC-DC انورٹر کنگ ماڈل" }, qty: "12", unitCost: 13000, amount: 156000, note: { en: "2 per classroom + hall", ur: "فی کلاس روم 2 + ہال" } },
  { code: "A5", category: "A", label: { en: "Distribution board + breakers + install", ur: "ڈسٹری بیوشن بورڈ + بریکرز + تنصیب" }, qty: "1", unitCost: 35000, amount: 35000 },
  { code: "A6", category: "A", label: { en: "Backup — Solar 5kW hybrid", ur: "بیک اپ — سولر 5 کلوواٹ ہائبرڈ" }, qty: "1", unitCost: 750000, amount: 750000, note: { en: "Recommended, or 3kW at Rs 450k", ur: "تجویز کردہ، یا 3 کلوواٹ 450,000 روپے میں" } },
  { code: "B1", category: "B", label: { en: "Classroom doors (solid)", ur: "کلاس روم کے دروازے (ٹھوس)" }, qty: "6", unitCost: 25000, amount: 150000 },
  { code: "B2", category: "B", label: { en: "Office doors", ur: "دفتر کے دروازے" }, qty: "2", unitCost: 25000, amount: 50000 },
  { code: "B3", category: "B", label: { en: "Washroom PVC doors", ur: "واش روم PVC دروازے" }, qty: "4", unitCost: 6500, amount: 26000, note: { en: "PVC recommended", ur: "PVC تجویز کردہ" } },
  { code: "B4", category: "B", label: { en: "Window glass + installation", ur: "کھڑکی کا شیشہ + تنصیب" }, qty: "20", unitCost: 4000, amount: 80000 },
  { code: "B5", category: "B", label: { en: "Locks & handles sets", ur: "تالے اور ہینڈل سیٹس" }, qty: "12", unitCost: 1500, amount: 18000 },
  { code: "C1", category: "C", label: { en: "Flooring — DONE", ur: "فرش — مکمل" }, qty: "0", unitCost: 0, amount: 0, note: { en: "Marble/tile flooring finished summer 2026", ur: "ماربل/ٹائل فرش موسم گرما 2026 میں مکمل" } },
  { code: "C2", category: "C", label: { en: "Staircase finishing (tiles + edge)", ur: "سیڑھیوں کی فنشنگ (ٹائل + کنارہ)" }, qty: "1 lot", unitCost: 40000, amount: 40000 },
  { code: "C3", category: "C", label: { en: "Washroom wall tiles + labour", ur: "واش روم کی دیوار کے ٹائل + مزدوری" }, qty: "1 lot", unitCost: 90000, amount: 90000 },
  { code: "C4", category: "C", label: { en: "Final paint interior + exterior (45 gal + labour)", ur: "حتمی رنگ اندرونی + بیرونی (45 گیلن + مزدوری)" }, qty: "1 lot", unitCost: 280000, amount: 280000, note: { en: "ICI/Nippon @ Rs 4k avg + labour", ur: "ICI/نپون اوسطاً 4 ہزار روپے + مزدوری" } },
  { code: "D1", category: "D", label: { en: "Air coolers evaporative", ur: "ایئر کولر (ایویپوریٹو)" }, qty: "7", unitCost: 25000, amount: 175000 },
  { code: "D2", category: "D", label: { en: "Rooftop green shade sheet", ur: "چھت پر سبز شیڈ شیٹ" }, qty: "500 sq ft", unitCost: 120, amount: 60000, note: { en: "Heat protection", ur: "گرمی سے بچاؤ" } },
  { code: "D3", category: "D", label: { en: "Exhaust fans", ur: "ایگزاسٹ پنکھے" }, qty: "6", unitCost: 3500, amount: 21000 },
  { code: "E1", category: "E", label: { en: "Water tanks (underground 1000G + roof 500G)", ur: "پانی کی ٹینکیاں (زیرِ زمین 1000 گیلن + چھت 500 گیلن)" }, qty: "1 lot", unitCost: 85000, amount: 85000 },
  { code: "E2", category: "E", label: { en: "Washroom fittings (taps, flush, etc.)", ur: "واش روم فٹنگز (نلکے، فلش وغیرہ)" }, qty: "4", unitCost: 15000, amount: 60000 },
  { code: "E3", category: "E", label: { en: "Hand wash basins", ur: "ہاتھ دھونے کے بیسن" }, qty: "4", unitCost: 8000, amount: 32000 },
  { code: "E4", category: "E", label: { en: "Drinking water facility (dispenser/cooler)", ur: "پینے کے پانی کی سہولت (ڈسپنسر/کولر)" }, qty: "1", unitCost: 25000, amount: 25000 },
  { code: "E5", category: "E", label: { en: "Water filtration system + TDS meter", ur: "واٹر فلٹریشن سسٹم + TDS میٹر" }, qty: "1", unitCost: 50000, amount: 50000, note: { en: "Handwritten addition", ur: "ہاتھ سے لکھا اضافہ" } },
  { code: "E6", category: "E", label: { en: "Dust remediation / sealing / cleaning", ur: "گرد و غبار کا تدارک / سیلنگ / صفائی" }, qty: "1 lot", unitCost: 20000, amount: 20000, note: { en: "Handwritten addition", ur: "ہاتھ سے لکھا اضافہ" } },
  { code: "F1", category: "F", label: { en: "Classroom shelving systems", ur: "کلاس روم شیلونگ سسٹمز" }, qty: "6", unitCost: 12000, amount: 72000, note: { en: "Handwritten addition", ur: "ہاتھ سے لکھا اضافہ" } },
  { code: "F2", category: "F", label: { en: "Teacher tables + chairs (9 sets)", ur: "اساتذہ کی میزیں + کرسیاں (9 سیٹ)" }, qty: "9", unitCost: 17000, amount: 153000, note: { en: "Table 12k + chair 5k", ur: "میز 12 ہزار + کرسی 5 ہزار" } },
  { code: "F3", category: "F", label: { en: "Whiteboards 4×6 ft", ur: "وائٹ بورڈز 4×6 فٹ" }, qty: "7", unitCost: 8000, amount: 56000 },
  { code: "F4", category: "F", label: { en: "Notice boards", ur: "نوٹس بورڈز" }, qty: "6", unitCost: 4000, amount: 24000 },
  { code: "F5", category: "F", label: { en: "Principal desk", ur: "پرنسپل ڈیسک" }, qty: "1", unitCost: 35000, amount: 35000 },
  { code: "F6", category: "F", label: { en: "Administrative tables", ur: "انتظامی میزیں" }, qty: "2", unitCost: 20000, amount: 40000 },
  { code: "F7", category: "F", label: { en: "Visitor chairs", ur: "مہمانوں کی کرسیاں" }, qty: "8", unitCost: 4500, amount: 36000 },
  { code: "F8", category: "F", label: { en: "Filing cabinets", ur: "فائلنگ کیبنٹس" }, qty: "2", unitCost: 18000, amount: 36000 },
  { code: "G1", category: "G", label: { en: "Fire extinguishers", ur: "آگ بجھانے والے آلات" }, qty: "4", unitCost: 7500, amount: 30000 },
  { code: "G2", category: "G", label: { en: "First aid kits", ur: "فرسٹ ایڈ کٹس" }, qty: "4", unitCost: 3000, amount: 12000 },
  { code: "G3", category: "G", label: { en: "Emergency exit signage", ur: "ہنگامی اخراج کے نشانات" }, qty: "6", unitCost: 1500, amount: 9000 },
  { code: "G4", category: "G", label: { en: "CCTV 4-cam + DVR", ur: "سی سی ٹی وی 4 کیمرے + DVR" }, qty: "1", unitCost: 65000, amount: 65000 },
  { code: "H1", category: "H", label: { en: "Structural engineer report / certification", ur: "سٹرکچرل انجینئر رپورٹ / سرٹیفیکیشن" }, qty: "1", unitCost: 40000, amount: 40000, note: { en: "Needed for registration", ur: "رجسٹریشن کے لیے درکار" } },
];

export const projects: Project[] = [
  {
    slug: "complete-school-building",
    title: {
      en: "Complete the School Building — 80% Complete",
      ur: "سکول کی عمارت کی تکمیل — 80 فیصد مکمل",
    },
    status: "in-progress",
    percentComplete: 80,
    summary: {
      en: "The structure is finished — six classrooms, a hall, boundary wall, plaster, main gate, and now the flooring. What remains is finishing: electrical work, doors and windows, paint, ventilation, water, furniture, and safety installations.",
      ur: "ڈھانچہ مکمل ہے — چھ کلاس رومز، ایک ہال، باؤنڈری وال، پلستر، مین گیٹ، اور اب فرش بھی۔ جو باقی ہے وہ فنشنگ ہے: بجلی کا کام، دروازے اور کھڑکیاں، رنگ، ہوا کا نظام، پانی، فرنیچر اور حفاظتی تنصیبات۔",
    },
    body: {
      en: `Freedom Generation's building has been raised step by step since 2020. As of September 2026 the school building is **80% complete**.

**Already done — do not need funding:**

- School building structure completed
- Classrooms constructed
- Boundary wall completed
- Basic plaster work completed
- Main gate installed
- Marble/tile flooring for hall and classrooms — **finished this summer**

**What remains** is everything that turns a sound structure into a finished school: complete internal wiring and lighting, ceiling fans and backup solar power, doors and windows with locks, staircase and washroom tiling, final paint inside and out, air coolers and exhaust fans, water tanks and filtration, furniture for classrooms and offices, fire safety and CCTV, and a structural engineer's report needed for registration.

**Why this matters:** without these installations the school cannot meet government registration requirements, ensure student safety, provide a comfortable learning environment, or open fully on schedule.

The full budget below was priced line by line in the Faisalabad market in 2026. We are raising **Rs 3,383,520 for full completion with a 5kW solar system** (12% contingency included). Essential completion without solar is **Rs 2,543,520** — solar is the stretch goal that frees the school from unreliable grid power and heavy electricity bills.`,
      ur: `فریڈم جنریشن کی عمارت 2020 سے قدم بہ قدم تعمیر ہوئی ہے۔ ستمبر 2026 تک سکول کی عمارت **80 فیصد مکمل** ہے۔

**جو مکمل ہو چکا ہے — فنڈنگ درکار نہیں:**

- عمارت کا ڈھانچہ مکمل
- کلاس رومز تعمیر شدہ
- باؤنڈری وال مکمل
- بنیادی پلستر مکمل
- مین گیٹ نصب
- ہال اور کلاس رومز میں ماربل/ٹائل فرش — **اس موسم گرما میں مکمل**

**جو باقی ہے** وہ سب کچھ ہے جو مضبوط ڈھانچے کو مکمل سکول بناتا ہے: مکمل اندرونی وائرنگ اور روشنی، سیلنگ پنکھے اور بیک اپ سولر، تالوں سمیت دروازے اور کھڑکیاں، سیڑھیوں اور واش رومز کے ٹائل، اندر اور باہر حتمی رنگ، ایئر کولر اور ایگزاسٹ پنکھے، پانی کی ٹینکیاں اور فلٹریشن، کلاس رومز اور دفاتر کا فرنیچر، فائر سیفٹی اور سی سی ٹی وی، اور رجسٹریشن کے لیے درکار سٹرکچرل انجینئر رپورٹ۔

**یہ کیوں اہم ہے:** ان تنصیبات کے بغیر سکول حکومتی رجسٹریشن کے تقاضے پورے نہیں کر سکتا، طلباء کی حفاظت یقینی نہیں بنا سکتا، آرام دہ تعلیمی ماحول فراہم نہیں کر سکتا، اور شیڈول کے مطابق مکمل طور پر کھل نہیں سکتا۔

نیچے دیا گیا مکمل بجٹ 2026 میں فیصل آباد کی مارکیٹ میں سطر بہ سطر قیمت لگا کر بنایا گیا ہے۔ ہم **5 کلوواٹ سولر سسٹم کے ساتھ مکمل تکمیل کے لیے 3,383,520 روپے** جمع کر رہے ہیں (12 فیصد کنٹیجنسی شامل)۔ سولر کے بغیر ضروری تکمیل **2,543,520 روپے** ہے — سولر وہ اضافی ہدف ہے جو سکول کو غیر یقینی بجلی اور بھاری بلوں سے آزاد کرتا ہے۔`,
    },
    goalAmount: 3383520,
    altGoalAmount: 2543520,
    amountFunded: 0,
    amountSpent: 0, // spending on the completed structure is documented separately
    budgetItems,
    coverId: "PROJECT-01",
    galleryIds: ["PROJECT-02", "PROJECT-03", "PROJECT-04"],
    updates: ["building-80-percent-complete"],
  },
];

export function project(slug: string): Project {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
}
