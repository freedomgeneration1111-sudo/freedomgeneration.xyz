// src/content/journal.ts — 3 seed entries for launch, bilingual EN/UR (per memory file §38/§40).
// The website is the canonical archive; fbPostId/fbUrl are the seam for future
// Facebook distribution — publish once here, distribute outward.

export type JournalEntry = {
  slug: string
  date: string // ISO
  category: "school-life" | "story" | "event" | "project-update" | "worship" | "milestone"
  title: { en: string, ur: string }
  excerpt: { en: string, ur: string }
  coverId: string // media registry id
  galleryIds: string[]
  body: { en: string, ur: string } // markdown
  author: string
  fbPostId?: string
  fbUrl?: string
}

export const journal: JournalEntry[] = [
  {
    slug: "a-morning-at-freedom-generation",
    date: "2026-08-20",
    category: "school-life",
    title: {
      en: "A Morning at Freedom Generation",
      ur: "فریڈم جنریشن میں ایک صبح"
    },
    excerpt: {
      en: "Assembly, prayer, and notebooks open — how a day begins with a question: why does this matter to this child?",
      ur: "اسمبلی، دعا، اور کھلی نوٹ بکس — دن کا آغاز ایک سوال سے: یہ اس بچے کے لیے کیوں اہم ہے؟"
    },
    coverId: "JOURNAL-COVER-01",
    galleryIds: ["TODAY-01", "TODAY-02", "TODAY-03", "LEARNING-01", "FAITH-01", "TEACHING-02"],
    author: "Teachers' Council",
    body: {
      en: `The day starts before the bell.

At 8:00, children gather in the courtyard for morning assembly. A short prayer, a song, and a thought for the day. No loudspeakers. Just voices.

Then classrooms.

**Why does this matter to this child?** That is the question every teacher asks before the lesson. Today in Class 3, it is English and Urdu letters — small sounds that will become big words.

On the whiteboard, the teacher writes the day's plan. Slowly, clearly. Students copy it into their own notebooks. Not printed worksheets — their own handwriting. Their notebook grows into a record of mastery.

> "We do not rank notebooks. We read them to see where to guide next." — Teacher

After copying, they close the whiteboard and try to remember. The teacher asks, they answer in writing. Repetition over time, not cramming. It is quiet, focused work.

In one corner, a girl who joined last month is placed not by age but by what she already knows. We quizzed from that point to find gaps. She is moving ahead, but with a plan to close what is missing.

At 10:10, break. At 12:10, lunch. At 2:20, Foundation Class — Bible-based, bilingual, anchored in Scripture. Today: patience and faithfulness with small things.

By 3:00, notebooks are fuller than this morning. So are the children.

*Photos: Classroom learning (TODAY-01), hands holding books (TODAY-02), group activity (TODAY-03), blackboard detail (LEARNING-01), prayer time (FAITH-01). No individual names shown, out of respect for privacy.*

**What comes next:** This week we are preparing for Independence Day function on Aug 14. See our hybrid calendar in /programs.`,
      ur: `دن گھنٹی سے پہلے شروع ہوتا ہے۔

صبح 8 بجے بچے صحن میں اسمبلی کے لیے جمع ہوتے ہیں۔ مختصر دعا، ایک گیت، اور دن کے لیے ایک سوچ۔ کوئی لاؤڈ اسپیکر نہیں۔ صرف آوازیں۔

پھر کلاس رومز۔

**یہ اس بچے کے لیے کیوں اہم ہے؟** ہر استاد سبق سے پہلے یہ سوال پوچھتا ہے۔ آج کلاس 3 میں انگریزی اور اردو کے حروف ہیں — چھوٹی آوازیں جو بڑے الفاظ بنیں گی۔

وائٹ بورڈ پر استاد دن کا منصوبہ لکھتا ہے۔ آہستہ، واضح۔ طلباء اسے اپنی نوٹ بک میں نقل کرتے ہیں۔ پرنٹ شدہ ورک شیٹس نہیں — ان کی اپنی لکھائی۔ ان کی نوٹ بک مہارت کا ریکارڈ بن جاتی ہے۔

نقل کرنے کے بعد وہ وائٹ بورڈ بند کر کے یاد کرنے کی کوشش کرتے ہیں۔ استاد پوچھتا ہے، وہ تحریری جواب دیتے ہیں۔ وقت کے ساتھ دہرانا، رٹہ نہیں۔

ایک کونے میں ایک بچی جس نے پچھلے مہینے داخلہ لیا، اسے عمر سے نہیں بلکہ اس سے جو وہ جانتی ہے، رکھا گیا۔ ہم نے وہیں سے کوئز لے کر خلا تلاش کیا۔

10:10 پر وقفہ، 12:10 پر دوپہر کا کھانا، 2:20 پر فاؤنڈیشن کلاس — بائبل پر مبنی، دو لسانی۔ آج: صبر اور چھوٹی چیزوں میں وفاداری۔

3 بجے تک نوٹ بکس صبح سے زیادہ بھری ہوئی ہیں۔ بچے بھی۔

*تصاویر: کلاس روم، کتابیں، گروپ سرگرمی، بلیک بورڈ، دعا — انفرادی نام نہیں دکھائے گئے۔*

**آگے کیا:** اس ہفتے ہم یوم آزادی کی تقریب کی تیاری کر رہے ہیں۔`
    }
  },
  {
    slug: "six-classrooms-and-a-hall",
    date: "2026-07-15",
    category: "story",
    title: {
      en: "Six Classrooms and a Hall",
      ur: "چھ کلاس رومز اور ایک ہال"
    },
    excerpt: {
      en: "What started in 2020 with very little — a small place, limited materials — is now six classrooms and a hall where children learn, gather, and worship.",
      ur: "جو 2020 میں بہت کم سے شروع ہوا — ایک چھوٹی جگہ، محدود مواد — اب چھ کلاس رومز اور ایک ہال ہے جہاں بچے سیکھتے، جمع ہوتے اور عبادت کرتے ہیں۔"
    },
    coverId: "JOURNAL-COVER-02",
    galleryIds: ["ORIGIN-01", "COMMUNITY-01", "TODAY-01", "PROJECT-01"],
    author: "Komal Shahzadi",
    body: {
      en: `Freedom Generation began with a simple conviction: a child's future should not be decided by the circumstances into which he or she was born.

In 2020, we started with very little — a small place to teach, limited materials, and a willingness to begin.

Step by step, through prayer, persistence, volunteer effort, and local support, it grew.

Today, in Chak 007 JB Punjawar Kohala, Faisalabad, the school has:

- Six classrooms — Play Group through Grade 10, more than 120 students
- One larger hall — where children gather, worship, celebrate
- Boundary wall completed, main gate installed, basic plaster done
- **Flooring finished** — marble/tile in hall and classrooms (finished this summer)

The building is structurally ready and secure. An engineer report is being arranged to document it.

But a building is not a school. A school is what happens inside.

Inside, teachers meet regularly and act as governing council — 9 teachers and 1 security guard, 10 staff total. Collaborative, teacher-led. No formal board. Mostly young women who prefer low publicity — so we show our method, not their faces.

We teach from the Punjab standard curriculum with bilingual goals — Urdu and English from the first letter — plus our developing Foundation Bible curriculum.

Families matter. At different times the school becomes more than classrooms. Children and parents gather for prayer, worship, fellowship, and Scripture.

Difficult realities remain. Some students leave around age 11 because families need them to work. Teachers must be paid. Books must be found. Classrooms must be maintained.

We do not hide those limitations. They are part of the story.

When someone supports Freedom Generation, they are not funding an idea that may exist someday. They are helping a school where children are already sitting in classrooms.

That is why we call it Freedom Generation. "If ye continue in my word... ye shall know the truth, and the truth shall make you free." John 8:31-32.

**See also:** Our Story /our-story and Teaching Methodology /teaching.`,
      ur: `فریڈم جنریشن ایک سادہ یقین سے شروع ہوا: بچے کا مستقبل اس کے حالات سے طے نہیں ہونا چاہیے جس میں وہ پیدا ہوا۔

2020 میں ہم نے بہت کم سے آغاز کیا — پڑھانے کے لیے ایک چھوٹی جگہ، محدود مواد، اور شروع کرنے کی رضامندی۔

قدم بہ قدم، دعا، استقامت، رضاکارانہ کوشش اور مقامی تعاون سے یہ بڑھا۔

آج چک 007 ج ب پنجوار کوہالہ، فیصل آباد میں سکول کے پاس:

- چھ کلاس رومز — پلے گروپ سے دسویں تک، 120 سے زیادہ طلباء
- ایک بڑا ہال — جہاں بچے جمع ہوتے، عبادت کرتے، خوشی مناتے ہیں
- باؤنڈری وال مکمل، مین گیٹ نصب، بنیادی پلستر مکمل
- **فرش مکمل** — ہال اور کلاس رومز میں ماربل/ٹائل (اس گرمیوں میں مکمل)

عمارت ساختی طور پر تیار اور محفوظ ہے۔ انجینئر رپورٹ کا انتظام کیا جا رہا ہے۔

لیکن عمارت سکول نہیں۔ سکول وہ ہے جو اندر ہوتا ہے۔

اندر، اساتذہ باقاعدگی سے ملتے ہیں اور گورننگ کونسل کے طور پر کام کرتے ہیں — 9 اساتذہ اور 1 گارڈ، کل 10 عملہ۔ زیادہ تر نوجوان خواتین جو کم تشہیر کو ترجیح دیتی ہیں — اس لیے ہم اپنا طریقہ دکھاتے ہیں، چہرے نہیں۔

ہم پنجاب کے معیاری نصاب کو دو لسانی اہداف کے ساتھ پڑھاتے ہیں — پہلے حرف سے اردو اور انگریزی — اور ہماری فاؤنڈیشن بائبل کلاس زیر تعمیر ہے۔

مشکل حقیقتیں باقی ہیں۔ کچھ طلباء 11 سال کی عمر میں چھوڑ دیتے ہیں کیونکہ خاندان کو کام کی ضرورت ہے۔ اساتذہ کو تنخواہ دینی ہے۔ کتابیں ڈھونڈنی ہیں۔

ہم ان حدود کو نہیں چھپاتے۔ یہ کہانی کا حصہ ہیں۔

اسی لیے ہم اسے فریڈم جنریشن کہتے ہیں۔ "اگر تم میرے کلام میں قائم رہو گے... تو حق کو جانو گے اور حق تمہیں آزاد کرے گا۔" یوحنا 8:31-32۔`
    }
  },
  {
    slug: "building-80-percent-complete",
    date: "2026-09-01",
    category: "project-update",
    title: {
      en: "Building 80% Complete — What Remains",
      ur: "عمارت 80 فیصد مکمل — کیا باقی ہے"
    },
    excerpt: {
      en: "Structure, classrooms, boundary wall, plaster, gate, and now flooring are done. Here's what remains to open fully — and what it costs in Faisalabad today.",
      ur: "ڈھانچہ، کلاس رومز، باؤنڈری وال، پلستر، گیٹ، اور اب فرش مکمل۔ مکمل کھولنے کے لیے کیا باقی ہے — اور فیصل آباد میں آج اس کی قیمت کیا ہے۔"
    },
    coverId: "JOURNAL-COVER-03",
    galleryIds: ["PROJECT-01", "PROJECT-02", "PROJECT-03", "PROJECT-04", "TRANSPARENCY-01"],
    author: "Komal Shahzadi",
    body: {
      en: `We have finished the floor.

As of September 2026, Freedom Generation School System is 80% complete:

**Done:**
- Building structure, 6 classrooms, hall, boundary wall, basic plaster, main gate — structurally ready and secure
- Marble/tile flooring in hall and classrooms — FINISHED this summer

**What remains (from our Feb 2026 Requirements Report + handwritten additions):**

**A. Electrical:** Complete internal wiring, switch boards, LED lights, ceiling fans (12 x Rs 13,000), distribution board, backup solar — we are adding Solar 5kW (Rs 750k) as preferred over generator/UPS.

**B. Doors & Windows:** Classroom doors (6), office doors (2), washroom PVC doors (4), window glass (20), locks/handles.

**C. Flooring & Finishing:** Flooring DONE. Remaining: staircase finishing, washroom wall tiles, final paint interior & exterior (45 gallons ICI/Nippon @ Rs 2,500-5,000/gal + labour).

**D. Ventilation & Cooling:** Air coolers (7), rooftop green shade sheet, exhaust fans.

**E. Plumbing & Water:** Water tanks roof + underground, washroom fittings, hand wash basins, drinking water, plus handwritten extras — water filtration / TDS meter and dust remediation.

**F. Furniture:** Shelving systems (handwritten), teacher tables/chairs 9 sets, whiteboards 7, notice boards 6, office principal desk, admin tables, visitor chairs, filing cabinets.

**G. Safety:** Fire extinguishers, first aid kits, exit signage, CCTV.

**H. Engineer report** — needed for registration.

**Budget — Faisalabad market 2026:**

We priced each item locally:

- Subtotal without solar: Rs 2,271,000
- With 3kW solar (Rs 450k): Rs 2,721,000
- With 5kW solar recommended (Rs 750k): Rs 3,021,000

With 12% contingency:

- **Without solar: Rs 2,543,520 (~$9,080)**
- **With 3kW solar: Rs 3,047,520 (~$10,880)**
- **With 5kW solar: Rs 3,383,520 (~$12,080)**

We are raising **Rs 3.4M as full completion goal with 5kW solar**, or **Rs 2.55M essential without solar** — solar as stretch goal.

See full breakdown in /projects/complete-school-building and our transparency page /transparency which also shows our operating budget: Rs 290,667/month (Rs 3,488,000/year), about Rs 29,067 per student per year for more than 120 students.

**Why this matters:** Without these installations we cannot meet government registration requirements, ensure student safety, provide comfortable learning, open on schedule, or maintain professional standard.

The building is ready. The need is now finishing, not structure.

**How to follow:** This journal is our canonical record. We will post weekly updates here and distribute to Facebook. The website is our proof system — what was needed, what was funded, what was spent, what changed.

*Photos: Exterior 80% (PROJECT-01), interior hall (PROJECT-02), construction detail (PROJECT-03), what remains (PROJECT-04), receipts ledger (TRANSPARENCY-01).*

Thank you for your trust.

— Komal Shahzadi, Founder & Principal
Freedom Generation School System, Chak 007 JB Punjawar Kohala, Faisalabad`,
      ur: `ہم نے فرش مکمل کر لیا ہے۔

ستمبر 2026 تک، فریڈم جنریشن سکول سسٹم 80 فیصد مکمل ہے:

**مکمل:**
- عمارت کا ڈھانچہ، 6 کلاس رومز، ہال، باؤنڈری وال، بنیادی پلستر، مین گیٹ — ساختی طور پر تیار
- ہال اور کلاس رومز میں ماربل/ٹائل فرش — اس گرمیوں میں مکمل

**کیا باقی ہے:**

**A. بجلی:** اندرونی وائرنگ، سوئچ بورڈز، ایل ای ڈی لائٹس، سیلنگ پنکھے (12 x 13,000 روپے)، ڈسٹری بیوشن بورڈ، بیک اپ سولر 5kW (750k روپے)

**B. دروازے اور کھڑکیاں:** کلاس روم دروازے (6)، دفتر دروازے (2)، واش روم PVC دروازے (4)، کھڑکی شیشہ (20)، تالے

**C. فرش مکمل۔** باقی: سیڑھی، واش روم ٹائل، فائنل پینٹ

**D. وینٹیلیشن:** ایئر کولرز (7)، چھت پر سبز شیڈ شیٹ، ایگزاسٹ پنکھے

**E. پلمبنگ:** پانی کی ٹینکیاں، واش روم فٹنگز، ہاتھ دھونے کے بیسن، پینے کا پانی، واٹر فلٹریشن / TDS میٹر، ڈسٹ ری میڈی ایشن

**F. فرنیچر:** شیلونگ سسٹمز، اساتذہ ٹیبل/کرسیاں 9 سیٹ، وائٹ بورڈز 7، نوٹس بورڈز 6، دفتر کا فرنیچر

**G. حفاظت:** آگ بجھانے والے، فرسٹ ایڈ کٹس، ایگزٹ سائن، CCTV

**H. انجینئر رپورٹ**

**بجٹ — فیصل آباد مارکیٹ 2026:**

- سولر کے بغیر: 2,271,000 روپے
- 3kW سولر کے ساتھ: 2,721,000 روپے
- 5kW سولر کے ساتھ: 3,021,000 روپے

12 فیصد کنٹیجنسی کے ساتھ:

- **بغیر سولر: 2,543,520 روپے**
- **3kW سولر کے ساتھ: 3,047,520 روپے**
- **5kW سولر کے ساتھ: 3,383,520 روپے**

ہم **3.4M روپے مکمل تکمیل کے لیے 5kW سولر کے ساتھ** یا **2.55M ضروری کام کے لیے بغیر سولر** جمع کر رہے ہیں۔

ہمارا آپریٹنگ بجٹ بھی دیکھیں: 290,667 روپے/ماہ (3,488,000 روپے/سال)، تقریباً 29,067 روپے فی طالب علم فی سال۔

عمارت تیار ہے۔ ضرورت اب فنشنگ کی ہے۔

شکریہ۔

— کومل شہزادی، بانی و پرنسپل`
    }
  }
]
