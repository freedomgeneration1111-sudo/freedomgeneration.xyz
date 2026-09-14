# Media readiness audit

Audit date: 2026-09-14

## Summary

- Registered semantic assets: **24**
- Real photographs: **0**
- Generated placeholders: **24**
- Missing files: **0**
- Registry records with English and Urdu alt text: **24 of 24**
- Registry records with captions: **1 of 24** (`ORIGIN-01`)
- Registry consent flags set to `true`: **24 of 24**

Every current JPEG matches the dimensions produced by `scripts/generate-placeholders.mjs` and remains a labeled clay/stone placeholder. No media file was modified during this audit. Replace each file in place at `public/media/<ID>.jpg`; the semantic ID and registry metadata should remain stable.

The `consent: true` values reflect the V1 assumption for group/classroom imagery. Explicit consent is still to be formalized at the next parents' meeting. Before replacing placeholders, confirm that the selected photograph fits the registered description and safeguarding constraints; do not use individual teacher headshots or bios without explicit permission.

## Asset register

All paths below are relative to `public/media/`. “None” under Caption means no caption is currently registered.

| Semantic ID | File | Pixels | Orientation | Current asset | English alt | Urdu alt | Caption | Consent |
|---|---|---:|---:|---|---|---|---|---|
| `HERO-01` | `HERO-01.jpg` | 1600×900 | 16:9 | Generated placeholder | Children and teacher during morning assembly at Freedom Generation School | فریڈم جنریشن سکول میں صبح کی اسمبلی کے دوران بچے اور استاد | None | `true` |
| `ORIGIN-01` | `ORIGIN-01.jpg` | 1200×900 | 4:3 | Generated placeholder | Early classroom at Freedom Generation School in 2020 | 2020 میں فریڈم جنریشن سکول کا ابتدائی کلاس روم | EN: The first classroom, 2020 — a small place, simple materials, and a willingness to begin. UR: پہلا کلاس روم، 2020 — ایک چھوٹی جگہ، سادہ مواد، اور آغاز کرنے کی رضامندی۔ | `true` |
| `TODAY-01` | `TODAY-01.jpg` | 1200×900 | 4:3 | Generated placeholder | Students learning in classroom | کلاس روم میں پڑھتے ہوئے طلباء | None | `true` |
| `TODAY-02` | `TODAY-02.jpg` | 1200×900 | 4:3 | Generated placeholder | Child reading book | کتاب پڑھتا ہوا بچہ | None | `true` |
| `TODAY-03` | `TODAY-03.jpg` | 1200×900 | 4:3 | Generated placeholder | Children during group activity | گروپ سرگرمی کے دوران بچے | None | `true` |
| `LEARNING-01` | `LEARNING-01.jpg` | 1200×800 | 3:2 | Generated placeholder | Blackboard and school books | بلیک بورڈ اور سکول کی کتابیں | None | `true` |
| `FAITH-01` | `FAITH-01.jpg` | 1200×900 | 4:3 | Generated placeholder | Children during prayer time | دعا کے وقت بچے | None | `true` |
| `CHALLENGE-01` | `CHALLENGE-01.jpg` | 1600×900 | 16:9 | Generated placeholder | Empty desk representing students at risk of leaving school | خالی ڈیسک — ان طلباء کی علامت جو سکول چھوڑنے کے خطرے میں ہیں | None | `true` |
| `VOCATIONAL-01` | `VOCATIONAL-01.jpg` | 1200×900 | 4:3 | Generated placeholder | Vocational tools for future skills program | مستقبل کے ہنر پروگرام کے لیے پیشہ ورانہ اوزار | None | `true` |
| `JOURNAL-COVER-01` | `JOURNAL-COVER-01.jpg` | 1600×900 | 16:9 | Generated placeholder | Daily life at Freedom Generation School — a morning of assembly and lessons | فریڈم جنریشن سکول کی روزمرہ زندگی — اسمبلی اور اسباق کی ایک صبح | None | `true` |
| `JOURNAL-COVER-02` | `JOURNAL-COVER-02.jpg` | 1600×900 | 16:9 | Generated placeholder | School building exterior — six classrooms and a hall | سکول کی عمارت کا بیرونی منظر — چھ کلاس رومز اور ایک ہال | None | `true` |
| `JOURNAL-COVER-03` | `JOURNAL-COVER-03.jpg` | 1600×900 | 16:9 | Generated placeholder | Construction interior of the school building nearing completion | تکمیل کے قریب سکول کی عمارت کا اندرونی تعمیراتی منظر | None | `true` |
| `PROJECT-01` | `PROJECT-01.jpg` | 1600×900 | 16:9 | Generated placeholder | School building under construction, 80% complete | زیرِ تعمیر سکول کی عمارت، 80 فیصد مکمل | None | `true` |
| `PROJECT-02` | `PROJECT-02.jpg` | 1200×900 | 4:3 | Generated placeholder | Large hall interior, unfinished | بڑے ہال کا اندرونی حصہ، نامکمل | None | `true` |
| `PROJECT-03` | `PROJECT-03.jpg` | 1200×900 | 4:3 | Generated placeholder | Construction detail — wall and flooring work | تعمیراتی تفصیل — دیوار اور فرش کا کام | None | `true` |
| `PROJECT-04` | `PROJECT-04.jpg` | 1200×900 | 4:3 | Generated placeholder | What remains — roof and electrical detail | جو باقی ہے — چھت اور بجلی کے کام کی تفصیل | None | `true` |
| `TEACHING-01` | `TEACHING-01.jpg` | 1200×900 | 4:3 | Generated placeholder | Teachers planning lessons together | اساتذہ مل کر اسباق کی منصوبہ بندی کرتے ہوئے | None | `true` |
| `TEACHING-02` | `TEACHING-02.jpg` | 1200×900 | 4:3 | Generated placeholder | Lesson plans and teaching materials | اسباق کے منصوبے اور تدریسی مواد | None | `true` |
| `PROGRAMS-01` | `PROGRAMS-01.jpg` | 1200×900 | 4:3 | Generated placeholder | School timetable board on the wall | دیوار پر سکول کا نظام الاوقات بورڈ | None | `true` |
| `PROGRAMS-02` | `PROGRAMS-02.jpg` | 1200×900 | 4:3 | Generated placeholder | Stack of school books and stationery | سکول کی کتابوں اور سٹیشنری کا ڈھیر | None | `true` |
| `COMMUNITY-01` | `COMMUNITY-01.jpg` | 1600×900 | 16:9 | Generated placeholder | Parents and community gathering at school | سکول میں والدین اور برادری کا اجتماع | None | `true` |
| `CONTACT-01` | `CONTACT-01.jpg` | 1600×900 | 16:9 | Generated placeholder | Entrance to Freedom Generation School | فریڈم جنریشن سکول کا داخلی دروازہ | None | `true` |
| `TRANSPARENCY-01` | `TRANSPARENCY-01.jpg` | 1200×900 | 4:3 | Generated placeholder | School financial records | سکول کے مالی ریکارڈ | None | `true` |
| `FOOTER-TRUST` | `FOOTER-TRUST.jpg` | 2100×900 | 21:9 | Generated placeholder | Students at Freedom Generation School | فریڈم جنریشن سکول کے طلباء | None | `true` |

## Remaining replacement jobs

All 24 semantic jobs still need real photography:

- Documentary foundation: `HERO-01`, `ORIGIN-01`, `TODAY-01`–`TODAY-03`, and `JOURNAL-COVER-01`–`JOURNAL-COVER-03`.
- Learning, faith, challenge, and future vision: `LEARNING-01`, `FAITH-01`, `CHALLENGE-01`, and `VOCATIONAL-01`.
- Building proof and stewardship: `PROJECT-01`–`PROJECT-04` and `TRANSPARENCY-01`.
- Teaching and programs: `TEACHING-01`, `TEACHING-02`, `PROGRAMS-01`, and `PROGRAMS-02`.
- Community and trust surfaces: `COMMUNITY-01`, `CONTACT-01`, and `FOOTER-TRUST`.

For teacher-related frames, favor hands, notebooks, lesson planning, whiteboards, or views from behind. For children, use dignified group/classroom imagery under the V1 consent assumption and avoid unnecessary identification. `CHALLENGE-01` and `VOCATIONAL-01` can be object-led photographs without identifiable people.
