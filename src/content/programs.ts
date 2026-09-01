// src/content/programs.ts — 2026–2027 hybrid academic calendar and daily schedule
// per memory file §53–57 (Punjab School Education Department session + FG functions).

export type AcademicEvent = {
  date: string; // ISO
  endDate?: string;
  title: { en: string; ur: string };
  type: "govt-milestone" | "govt-holiday" | "govt-break" | "govt-exams" | "fg-function" | "both";
  description: { en: string; ur: string };
};

export const academicYear = {
  session: "2026-2027",
  start: "2026-04-01",
  end: "2027-03-31",
  summerVacation: { start: "2026-05-22", end: "2026-08-23" },
  winterBreak: { start: "2026-12-24", end: "2026-12-31" },
  events: [
    {
      date: "2026-01-01",
      title: { en: "New Year Function", ur: "نئے سال کی تقریب" },
      type: "fg-function",
      description: {
        en: "Welcome the new year with goal setting, speeches, and poems. Students set academic and personal goals.",
        ur: "نئے سال کا خیرمقدم — اہداف کا تعین، تقاریر اور نظمیں۔ طلباء تعلیمی اور ذاتی اہداف طے کرتے ہیں۔",
      },
    },
    {
      date: "2026-02-02",
      title: { en: "School Anniversary Function", ur: "سکول کی سالگرہ" },
      type: "fg-function",
      description: {
        en: "Commemorating the establishment of Freedom Generation (founded 2020) — speeches on achievements and cultural programs.",
        ur: "فریڈم جنریشن کے قیام (2020) کی یاد — کامیابیوں پر تقاریر اور ثقافتی پروگرام۔",
      },
    },
    {
      date: "2026-02-05",
      title: { en: "Kashmir Day", ur: "یوم کشمیر" },
      type: "govt-holiday",
      description: { en: "National public holiday — school closed.", ur: "قومی تعطیل — سکول بند۔" },
    },
    {
      date: "2026-03-15",
      title: { en: "Final Annual Exam Result Function", ur: "سالانہ نتائج کی تقریب" },
      type: "fg-function",
      description: {
        en: "Results announced, high achievers appreciated, and every student encouraged.",
        ur: "نتائج کا اعلان، نمایاں طلباء کی پذیرائی، اور ہر طالب علم کی حوصلہ افزائی۔",
      },
    },
    {
      date: "2026-03-23",
      title: { en: "Pakistan Day", ur: "یوم پاکستان" },
      type: "govt-holiday",
      description: { en: "National holiday.", ur: "قومی تعطیل۔" },
    },
    {
      date: "2026-03-31",
      title: { en: "Result Declaration", ur: "نتیجہ کا اعلان" },
      type: "govt-milestone",
      description: {
        en: "Annual results and promotions finalized.",
        ur: "سالانہ نتائج اور ترقیاں حتمی۔",
      },
    },
    {
      date: "2026-04-01",
      title: { en: "Commencement of Session", ur: "تعلیمی سیشن کا آغاز" },
      type: "govt-milestone",
      description: { en: "New academic classes begin.", ur: "نئی تعلیمی کلاسوں کا آغاز۔" },
    },
    {
      date: "2026-04-03",
      title: { en: "Good Friday Observance", ur: "گڈ فرائیڈے" },
      type: "fg-function",
      description: {
        en: "A respectful observance — the message of sacrifice, peace, and forgiveness.",
        ur: "باوقار یادگاری — قربانی، امن اور معافی کا پیغام۔",
      },
    },
    {
      date: "2026-05-01",
      title: { en: "Labour Day", ur: "یوم مزدور" },
      type: "both",
      description: {
        en: "Recognizing the value of hard work and the importance of workers — speeches.",
        ur: "محنت کی قدر اور مزدوروں کی اہمیت کا اعتراف — تقاریر۔",
      },
    },
    {
      date: "2026-05-22",
      endDate: "2026-08-23",
      title: { en: "Summer Vacation", ur: "موسم گرما کی تعطیلات" },
      type: "govt-break",
      description: {
        en: "Approximately three months — regular classes pause; community events may occur.",
        ur: "تقریباً تین ماہ — باقاعدہ کلاسیں معطل؛ برادری کی تقریبات ہو سکتی ہیں۔",
      },
    },
    {
      date: "2026-06-21",
      title: { en: "Music Day Function", ur: "یوم موسیقی" },
      type: "fg-function",
      description: {
        en: "During summer break — a creative music day as a community gathering.",
        ur: "گرمیوں کی چھٹیوں کے دوران — تخلیقی موسیقی کا دن بطور برادری اجتماع۔",
      },
    },
    {
      date: "2026-08-14",
      title: { en: "Independence Day Function", ur: "یوم آزادی کی تقریب" },
      type: "both",
      description: {
        en: "Flag hoisting, speeches, patriotic performances — the importance of freedom.",
        ur: "پرچم کشائی، تقاریر، ملی نغمے — آزادی کی اہمیت۔",
      },
    },
    {
      date: "2026-10-10",
      title: { en: "Teachers' Day Function", ur: "یوم اساتذہ" },
      type: "fg-function",
      description: {
        en: "Honoring the dedication of teachers — gratitude through speeches, cards, and performances.",
        ur: "اساتذہ کی لگن کا اعتراف — تقاریر، کارڈز اور پرفارمنس کے ذریعے اظہارِ تشکر۔",
      },
    },
    {
      date: "2026-11-01",
      endDate: "2026-11-30",
      title: { en: "First Term / Mid-Term Exams", ur: "پہلی سہ ماہی امتحانات" },
      type: "govt-exams",
      description: { en: "Mid-session assessment.", ur: "وسط سیشن جائزہ۔" },
    },
    {
      date: "2026-11-09",
      title: { en: "Iqbal Day", ur: "یوم اقبال" },
      type: "both",
      description: {
        en: "Reciting Iqbal's poetry — national identity and literature.",
        ur: "اقبال کی شاعری — قومی شناخت اور ادب۔",
      },
    },
    {
      date: "2026-12-24",
      title: { en: "Christmas Grand Function", ur: "کرسمس کی بڑی تقریب" },
      type: "fg-function",
      description: {
        en: "Joy, dramas, carols, and cultural programs — a message of love, peace, and unity.",
        ur: "خوشی، ڈرامے، گیت اور ثقافتی پروگرام — محبت، امن اور اتحاد کا پیغام۔",
      },
    },
    {
      date: "2026-12-24",
      endDate: "2026-12-31",
      title: { en: "Winter Break", ur: "موسم سرما کی تعطیلات" },
      type: "govt-break",
      description: {
        en: "December 24–31, varying with smog and cold.",
        ur: "24 تا 31 دسمبر، سموگ اور سردی کے مطابق۔",
      },
    },
    {
      date: "2026-12-25",
      title: { en: "Quaid-e-Azam Day / Christmas", ur: "یوم قائد / کرسمس" },
      type: "govt-holiday",
      description: { en: "Public holiday.", ur: "عام تعطیل۔" },
    },
    {
      date: "2027-02-01",
      endDate: "2027-03-15",
      title: { en: "Final Annual Examinations", ur: "سالانہ امتحانات" },
      type: "govt-exams",
      description: { en: "Annual evaluations.", ur: "سالانہ جائزے۔" },
    },
    {
      date: "2027-03-31",
      title: { en: "Result Declaration 2027", ur: "نتیجہ 2027" },
      type: "govt-milestone",
      description: { en: "Session close.", ur: "سیشن کا اختتام۔" },
    },
  ] satisfies AcademicEvent[],
};

export const eventTypeLabels: Record<AcademicEvent["type"], { en: string; ur: string }> = {
  "govt-milestone": { en: "Govt milestone", ur: "سرکاری سنگ میل" },
  "govt-holiday": { en: "Govt holiday", ur: "سرکاری تعطیل" },
  "govt-break": { en: "Govt break", ur: "سرکاری تعطیلات" },
  "govt-exams": { en: "Exams", ur: "امتحانات" },
  "fg-function": { en: "FG function", ur: "سکول کی تقریب" },
  both: { en: "National + school", ur: "قومی + سکول" },
};

export const dailySchedule = [
  { time: "8:00–8:30", activity: { en: "Morning Assembly & Prayer", ur: "صبح کی اسمبلی اور دعا" } },
  { time: "8:30–9:20", activity: { en: "Period 1", ur: "پہلا پیریڈ" } },
  { time: "9:20–10:10", activity: { en: "Period 2", ur: "دوسرا پیریڈ" } },
  { time: "10:10–10:30", activity: { en: "Break", ur: "وقفہ" } },
  { time: "10:30–11:20", activity: { en: "Period 3", ur: "تیسرا پیریڈ" } },
  { time: "11:20–12:10", activity: { en: "Period 4", ur: "چوتھا پیریڈ" } },
  { time: "12:10–12:40", activity: { en: "Lunch / Zuhr", ur: "دوپہر کا کھانا / ظہر" } },
  { time: "12:40–1:30", activity: { en: "Period 5", ur: "پانچواں پیریڈ" } },
  { time: "1:30–2:20", activity: { en: "Period 6", ur: "چھٹا پیریڈ" } },
  {
    time: "2:20–3:00",
    activity: {
      en: "Foundation / Bible Class (in development) / Study & Remediation",
      ur: "فاؤنڈیشن / بائبل کلاس (زیرِ تشکیل) / مطالعہ و اصلاح",
    },
  },
];

export const programsCopy = {
  intro: {
    en: "Freedom Generation follows the Punjab School Education Department session April–March, enriched with our own functions that build confidence, creativity, and character. Our daily schedule balances core academics, bilingual learning goals, and our developing Foundation Bible curriculum.",
    ur: "فریڈم جنریشن سکول پنجاب کے تعلیمی سیشن اپریل تا مارچ کی پیروی کرتا ہے، جس میں ہماری اپنی تقریبات شامل ہیں جو اعتماد، تخلیقی صلاحیت اور کردار کو فروغ دیتی ہیں۔ ہمارا روزانہ کا شیڈول بنیادی تعلیم، دو لسانی اہداف اور ہماری زیرِ تشکیل فاؤنڈیشن بائبل کلاس میں توازن رکھتا ہے۔",
  },
  calendarNote: {
    en: "We observe both national holidays and our school family celebrations — from School Anniversary on Feb 2 to Independence Day on Aug 14 to Christmas Grand Function on Dec 24. During summer vacation (May 22 – Aug 23), regular classes pause, but community and planning continue.",
    ur: "ہم قومی تعطیلات اور اپنے سکول خاندان کی تقریبات دونوں مناتے ہیں — 2 فروری کو سکول کی سالگرہ سے 14 اگست کو یوم آزادی اور 24 دسمبر کو کرسمس کی بڑی تقریب تک۔ موسم گرما کی تعطیلات (22 مئی تا 23 اگست) میں باقاعدہ کلاسیں رک جاتی ہیں، لیکن برادری اور منصوبہ بندی جاری رہتی ہے۔",
  },
  participation: {
    en: "All functions are participatory — every child takes part. Teachers and staff work together to organize them, and functions help students develop confidence, creativity, discipline, and moral understanding. The school emphasizes holistic education — academic, moral, social.",
    ur: "تمام تقریبات شراکتی ہیں — ہر بچہ حصہ لیتا ہے۔ اساتذہ اور عملہ مل کر انہیں منظم کرتے ہیں، اور یہ تقریبات طلباء میں اعتماد، تخلیقی صلاحیت، نظم و ضبط اور اخلاقی فہم پیدا کرتی ہیں۔ سکول ہمہ گیر تعلیم پر زور دیتا ہے — تعلیمی، اخلاقی، سماجی۔",
  },
};
