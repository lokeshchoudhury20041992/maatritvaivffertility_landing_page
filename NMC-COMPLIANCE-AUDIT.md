# NMC Ethical Advertising — Website Compliance Audit (Internal)

**Audit date:** 11 Oct 2026 · **Scope:** this repository only (static HTML site + `GMB-COPY.md`)
**Status:** Code changes applied (uncommitted at time of writing). **This is not a legal opinion and does not certify compliance.** Items in §4 need sign-off by an authorised clinic representative / qualified compliance adviser.

---

## 1. Source verified

- **Document:** NMC Public Notice No. **R-13014/01/2024-Ethics**, dated **06/10/2026** — *Guidelines on Ethical Advertising and Public Communication by Hospitals/Medical Institutions and Registered Medical Practitioners*. In force immediately (cl. 1.2).
- **Retrieved from:** https://nmc.org.in/whats-new → https://nmc.org.in/whats-new/download/1874 (13-page scanned PDF, read in full).
- Read together with the IMC (Professional Conduct, Etiquette and Ethics) Regulations 2002 (cl. 4.2); for clinics, the applicable Clinical Establishments Act/State Act overrides on conflict (cl. 4.3).

## 2. Provisions that affect website content

| Clause | What it says (summary) | Website impact |
|---|---|---|
| 3.2 + 3.5 | "Advertisement" includes any promotional communication; **websites, blogs, search-engine, WhatsApp, influencer, AI-generated** content are media of advertisement. | The whole site, ads landing pages and GMB posts are in scope. |
| 3.2 Expl. I | Non-promotional public information without commercial intent is exempt. | Genuine patient-education content can stay. |
| 3.2 Expl. II | Equipment/facility info allowed as **factual** info — no superiority, guaranteed outcomes, comparative or unverifiable claims. | Lab/technology claims must be factual and verifiable. |
| 3.2 Expl. III/IV | Electronic-media posts must disclose RMP **name, qualifications, registration status and SMR/NMR registration number**. | **No registration numbers on site — open item.** |
| 3.2 Expl. V | No fake/paid/misleading reviews or testimonials; **an RMP shall not request or share patient testimonials, reviews… for professional promotion on social media.** | Testimonial sections removed; review-request links flagged. |
| 5.1 | Health-awareness content allowed if it does not promote personal practice or solicit patients. | Blog CTAs kept neutral. |
| 6.1–6.4, 7.4 | Patient info/photos/testimonials not usable for advertising except as permitted by law with specific consent; consent alone doesn't legalise prohibited practices; anonymise. | Named patient reviews and the patient-story video removed. |
| 7.2 | AI-generated promotional campaigns prohibited; permitted AI content must carry a source mark; no synthetic patient images/endorsements. | Check whether hero/stock images are AI-generated (open item). |
| 7.6 | Personal data handling must comply with IT Act 2000 and DPDP Act 2023 / Rules 2025. | Privacy policy cites "HIPAA" (US law) — open item. |
| 8.1(i) | No creating unnecessary demand or **fear-based marketing**. | Pressure wording removed (e.g. "don't waste it on IUI"). |
| 8.1(ii) | No soliciting patients / self-promotion / permitting name or testimonial for promotion. | Promotional doctor copy neutralised. |
| 8.1(iii) | No advertising **personal achievements, success rates, or number of patients treated**; "Guaranteed cures", "Best doctors", "No.1", "100% success", "**painless treatment**", "Miracle" etc. | Patient counts, clinic success rates, "Gold Medalist" taglines, "painless" removed. |
| 8.1(v) | No promotional case publication, before/after, personal success stories (except anonymised scientific/educational). | Patient story section removed. |
| 8.1(vi) | No statements creating unrealistic expectations or concealing risks. | Outcome language softened; caveats added. |
| 8.1(ix) | No "best", "No.1", "leading", "most trusted", "top", "unmatched" etc. unless objectively verifiable via transparent, independent methodology; rankings/awards must be independently verifiable. | Self-published "Top 10" ranking removed; superlatives removed sitewide. |
| 8.1(x) | No discounts, limited offers, free procedures or similar inducements that encourage unnecessary consultation or amount to solicitation; **fee disclosure must be factual and transparent**. | "Free consultation" CTAs → "Book a consultation". |
| 8.1(xi)–(xii) | No third-party/influencer testimonials; no fake engagement or **manipulating search rankings** to mislead about standing. | Fabricated competitor ratings removed. |
| 8.3, 9.1 | Institutions may publish factual, verifiable info (name, location, departments, facilities, equipment, accreditation, charges). A doctor directory with names, qualifications, specialties, **registration details** and availability is distinct from advertising. | Doctor pages kept as a directory; registration numbers still needed. |
| 9.2 | RMP photographs not permitted where they amount to self-advertisement/promotional publicity. | Doctor photos retained — judgement call, open item. |
| 10–11 | RMP violations → SMC graded penalties (warning → suspension/removal); serious violations include misleading cure claims, patient inducements, digital mass solicitation. Hospitals → Clinical Establishments Act. | — |

## 3. Changes made (summary — see `git diff` for exact edits)

**Sitewide (23 pages):** footer tagline "Dr. Ankita Mandal, MD (OBGYN) | Gold Medalist | 12+ Years Experience" → "Dr. Ankita Mandal, MD (OBGYN)" [8.1(iii)]; footer blurb "world-class… gold-medalist doctors… best care" → factual description [8.1(ix)]; all "Book (Your) Free Consultation" CTAs → "Book a Consultation" [8.1(x)]; editorial internal-link anchors "best/leading/top IVF centre in X" → "IVF centre in X" [8.1(ix)]; page titles "…Best IVF Centre in Kolkata" → "…, Kolkata"; link text "Top 10 IVF Centres" → "Compare IVF Centres" / "IVF Centres in Kolkata – Comparison Guide".

**top-10-ivf-centres-in-kolkata.html (URL kept):** removed the self-ranked list (Maatritva #1 "Editor's Pick", ★4.9; competitors given invented ratings 3.7–4.3), the competitor clinic descriptions, the ItemList ranking schema, "verified ranking" claims, and Maatritva-attributed 55–70 % success rate [8.1(iii), (ix), (xii), 8.3(ii)]. Rewritten as a neutral "how to compare IVF centres" guide (doctor registration, ART Act registration, comparable outcome data, written estimates, counselling/SET policy) with a factual "About Maatritva" box. Age-bracket figures kept but labelled as general, not the clinic's results.

**index.html:** H1 "Best IVF Centre in Kolkata and Newtown" → "IVF and Fertility Care in / Kolkata and Newtown" (two lines); kicker "Kolkata's Trusted Fertility Centre" → "Fertility Centre in Newtown, Kolkata"; hero copy "World-class… Gold Medalist" → factual with outcome caveat; "5000+ Families Created With Care" → "IVF · ICSI · IUI / Fertility Services"; "Gold Medalist" hero card → "MD (OBGYN)"; "most advanced… maximize your chances" → neutral; removed **Real Patient Story** section (patient video + quote + "First cycle positive") and **Patient Reviews** section (6 named Google reviews, incl. "Best antenatal and infertility care centre") [Expl. V, 6.1, 8.1(v), (xi)]; meta/OG/keywords de-superlatived; FAQ "free consultation" removed. CSS: two-line hero title rule appended to `css/style.css`.

**about.html:** removed "leading", "factory model of large chains" comparison, "high success rates (67 %–79 %)", "one of the few clinics… significantly reducing time to pregnancy", "world-renowned", "pioneer", "Gold medalist", incorrect assertion that ISO/ICMR certification is a legal requirement [8.1(iii), (vi), (ix)].

**Doctor pages (ankita, prattayghosh, chhabi, our-doctors):** removed patient/procedure counts (12k+, 10K+ satisfied patients, 5k+ procedures, 3.5k+ deliveries, etc.) [8.1(iii)]; removed testimonial sections (5 + 4 named patients, "545+ Google Reviews", "Best Rated (166 Reviews)") [Expl. V]; removed "best endocrinologist", "one of the leading", "Best Obstetric Care", "premier institutions", "Renowned", "Expert" titles; "Painless Normal Delivery" → "Labour Pain Relief Options" [8.1(iii)]; "higher success rates"/"maximise success" removed [8.1(vi)]. **chhabi.html: replaced placeholder contact details (+91 98765 43210, contact@maatritva.com) with the clinic's real number/email.**

**Other pages:** why-choose (superlatives, "No hidden charges", "failed elsewhere", "reducing miscarriage risk significantly"); ivf-success-rate (removed "Maatritva reports 55–70 %… comparable with the best centres", added caveats, removed "up to 85 %" cumulative claim, "Most couples achieve pregnancy within 1–3 cycles"); ivf-cost (removed unverifiable competitor price table, kept Maatritva's own fee range as factual disclosure); appointment ("Success Stories — hundreds of families", "higher success rates", "cutting-edge"); contact ("Best IVF Centre in Kolkata" label); best_ivf_centre_in_kolkata.html ads page ("5000+ Patients", "4.9★ Patient Satisfaction"); blogs/articles ("Our high success rates", "very best chance", "embryo transfer is painless", "dramatically reducing miscarriage", "don't waste it on lower-success IUI", "Gold Medal is a positive marker", "ICMR accredited" → "registered under the ART (Regulation) Act, 2021"); `GMB-COPY.md` (leading/most trusted/world-class/Gold Medalist/free consultation/5,000+ families/success %).

## 4. Items requiring approval / human action

### High priority
1. **SMR/NMR registration numbers** for Dr. Ankita Mandal, Dr. Chhabi Ghosh and Dr. Prattay Ghosh are missing everywhere (Expl. III/IV, 9.1). Add to doctor cards, profile pages, footer and article author boxes.
2. **Dr. Ankita Mandal's qualification:** "MD (OBGYN)" sitewide vs "MS – Obstetrics And Gynaecology" in her CV section. Also "Diploma in Reproductive Medicine, FIMAS" — confirm recognised qualifications.
3. **Experience figures are inconsistent:** Dr. Ankita 12+ / 14+ / 15+ years; Dr. Prattay 14+ / 15+ / 18+; clinic "15+ years". Pick verified figures.
4. **Dr. Prattay Ghosh's designation:** described as "Endocrinologist", "General Physician", "MD – Medicine and Cardiologist", "Diabetologist". Use only titles supported by recognised qualifications (MD Medicine; PG Diploma Clinical Endocrinology; PGDCC). Institution names given as "Reputed College in India".
5. **Accreditation claims are contradictory and unverified:** "ISO and ICMR-certified" (index, about) vs "NABL Accredited Laboratory" (ads landing page). Replace with the actual **ART (Regulation) Act 2021 registration** and any genuine accreditation certificates, or remove.
6. **Equipment claims** to verify: AI-assisted embryo selection, time-lapse incubation, ERA, HEPA/VOC air handling (about, why-choose, comparison page, articles).
7. **Surrogacy and ovum donation** listed as services (ankita.html, appointment.html) — confirm registration under the Surrogacy (Regulation) Act 2021 / ART Act 2021 before advertising.
8. **General IVF success figures** (55–70 % <35, 40–50 % 35–40, 20–35 % >40; donor egg 50–65 %; cumulative 75–90 %) on blog/educational pages are unsourced and appear optimistic vs published registry data. Needs clinical review and a cited source, or removal.
9. **Off-site content not changed:** Google Business Profile names contain "Best IVF Centre in Kolkata | Best Fertility Clinic in West Bengal" (visible in map URLs); YouTube handle `@BestFertilityIVFclinicKolkata`; GBP posts already published; Google/Meta ad copy; sister site maatritvaivf.com; Dr. Ankita's personal site; blog CMS (Railway backend feeding `blog-view.html`).

### Medium priority
10. **Google review solicitation** ("Leave a Google Review" links sitewide; "Loved your visit? Leave us a Google review" on contact.html) — Expl. V bars RMPs requesting reviews for professional promotion. Decide whether to keep.
11. **Doctor photographs** on directory/profile pages and doctor faces in the hero — acceptable as a patient-information directory (9.1) but not as promotional publicity (9.2). Decide on use.
12. **Hero and section images** (e.g. family-with-baby hero) — confirm they are licensed stock, not real patients, and not AI-generated without a source mark (7.2, 6.1).
13. **Fees:** "IVF packages from ₹95,000" described as "all-inclusive" in places while medications are "billed separately" elsewhere; "₹95,000 – ₹1,80,000" range; EMI. Verify and make consistent (8.1(x) proviso).
14. **Free consultations:** if consultations genuinely are free, a factual fee statement may be acceptable; promotional "free" CTAs were removed.
15. **Affiliations** listed on doctor pages (Apollo Clinics, Neotia, ILS, Suraksha) and the clinic network (13 satellite towns on about.html vs 4–5 elsewhere) — verify.
16. **Two different Newtown addresses** (101, Block-CF, 700156 vs Plot CF/9, 700107) and an email mismatch (`care@maatritvafertility.com` on index contact block vs `care@maatritvaivffertility.com` elsewhere; `info@maatritvaivf.com` and `+91 98765 43210` placeholder on 404.html).
17. **Dr. Chhabi Ghosh's contact block** now shows the clinic number/email — confirm.
18. **Privacy policy** states "HIPAA-compliant" (US law); align with DPDP Act 2023 / Rules 2025 (cl. 7.6).

### Low priority
19. Blog title "How to Choose the **Best** IVF Centre in Kolkata" — educational use, not a self-claim; retained.
20. "Medically reviewed · Updated May 2026" badge on the comparison page — re-date after clinical review.
21. `article-1.html` shows literal `**markdown**` asterisks (rendering bug, not compliance).
22. `img/` contains internship report PPTX/PDF files that are deployed publicly — consider removing.

## 5. Not inspected
Live production site (only this repo), the blog CMS/backend, Google Business Profiles, Google/Meta ad accounts and creatives, social media accounts, external sister/personal sites, WhatsApp broadcast templates, and image content in detail (text-in-image not OCR-checked).
