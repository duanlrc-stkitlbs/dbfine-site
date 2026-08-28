# CLIENT BRIEF, TECHNICAL ARCHITECTURE & MASTER COPY MATRIX
## DB Fine Chemicals (dbfine.co.za) — B2B Chemical Portal Transformation
**Target Client:** DB Fine Chemicals (Pty) Ltd  
**Region:** SADC & South Africa (Gauteng Distribution Hub)  
**Platform Architecture:** Cloudflare Edge (Pages, Workers, Hono, D1, R2) + Next.js 15  
**Document Status:** Fully Enriched Master Architecture & Strategy Blueprint  

---

## 1. Executive Overview & Commercial Strategy

### 1.1 Commercial Baseline
**DB Fine Chemicals (Pty) Ltd** (`dbfine.co.za`) is a premier South African importer, blender, and distributor of high-purity fine chemicals, specialty industrial solvents, active pharmaceutical ingredients (APIs), excipients, and laboratory reagents. Operating across South Africa and the broader Southern African Development Community (SADC) region, DB Fine Chemicals bridges global chemical manufacturing with regional industrial and pharmaceutical demands.

The primary goal of this digital transformation is to replace DB Fine Chemicals' legacy static web presence with an edge-native B2B lead-generation, quote-automation, and regulatory compliance portal. The portal establishes immediate market authority through three zero-friction conversion hooks:

* **Instant COA & SDS/MSDS Compliance Hub:** Directly serves batch-specific Certificates of Analysis (COA) and Safety Data Sheets (SDS/MSDS conforming to GHS/SANS 10234) from Cloudflare R2 object storage with sub-second response times.
* **Interactive B2B RFQ Engine:** A multi-step intake widget capturing Chemical Abstracts Service (CAS) registry numbers, chemical purity grades, order volumes (liter/kilogram/metric ton), and SADC delivery destinations.
* **Physical Chemical Sample Request Program:** Allows laboratory managers, formulation chemists, and R&D specialists to request small-volume testing samples for laboratory trial runs prior to bulk procurement.

### 1.2 Core Strategic Alignment & Tone Profile
* **Target Audience:**
  * **Industrial Procurement & Plant Managers:** Seeking competitive pricing, flexible MOQs, local South African safety stock, transparent lead times, and dependable regional SADC road freight logistics from Gauteng.
  * **Quality Assurance & Regulatory Officers:** Demanding rapid access to batch-specific COAs, GHS/SANS 10234 SDS documentation, ISO quality standards, and verifiable SAHPRA licensing credentials.
  * **Formulation Chemists & R&D Lab Managers:** Requiring certified pharmacopeial purity grades (USP/BP/EP, HPLC, AR), CAS registry validation, and physical trial sample kits for formulation testing.
* **Core Objective:** Position DB Fine Chemicals as the agile, high-compliance regional leader across Southern Africa by converting manual email inquiry friction into an instant, self-serve compliance engine, rapid RFQ funnel, and Answer Engine Optimization (AEO) powerhouse.
* **Tone Profile:** Technically Precise, Pharmacopeially Authoritative, Operationally Agile, Enterprise-Reliable, and Friction-Free.

---

## 2. Brand Identity & Design System (Brandkit)

To establish a modern, enterprise-grade digital footprint, the portal implements a cleanroom-inspired design system tailored for chemical and pharmaceutical procurement.

### 2.1 Color Palette
| Color Name | Hex Code | Role & UI Placement |
| :--- | :--- | :--- |
| **Primary Slate Navy** | `#0B192C` | Primary headers, navigation backgrounds, footers, and high-contrast typography to project enterprise authority and stability. |
| **Precision Cyan / Edge Teal** | `#0D9488` / `#008080` | Accent color for active UI states, primary CTAs (*"Download COA"*, *"Request RFQ"*), interactive badges, and link hovers. |
| **Cleanroom White** | `#FFFFFF` | Base canvas and card background color, maintaining a clinical, laboratory-grade aesthetic. |
| **Surface Neutral / Slate Mist** | `#F1F5F9` / `#E2E8F0` | Subtle card fills, input borders, divider rules, and secondary section backgrounds. |
| **Regulatory Amber** | `#D97706` | Highlight color for GHS hazard class tags, CAS number badges, SAHPRA licensing notices, and compliance status indicators. |

### 2.2 Typography Hierarchy
* **Primary Display & Headings:** `Inter` or `Plus Jakarta Sans` (SemiBold / Bold: 600, 700) — Clean, highly legible grotesque sans-serif communicating modern technical clarity.
* **Body & Form Copy:** `Inter` (Regular / Medium: 400, 500) — Neutral, high-legibility sans-serif optimized for multi-step data entry and tabular compliance specs.
* **Technical & Data Elements:** `JetBrains Mono` or `Roboto Mono` (Regular: 400) — Used strictly for CAS Registry numbers, batch IDs, HS codes, and purity tolerances (e.g., `CAS: 67-63-0 | ≥ 99.8%`).

### 2.3 Brand Voice & Editorial Rules
* **Industry Vocabulary:** Lead with industry-standard terms: *GHS/SANS 10234*, *SAHPRA-compliant*, *USP/BP/EP Pharmacopeia*, *HPLC-grade*, *CAS Registry*, *Batch Pedigree*, and *Gauteng Safety Stock*.
* **Utility-Focused Action Phrasing:** CTAs focus on clear utility and tangible outcomes over generic commands (e.g., *"Download Compliance Dossier"* instead of *"Submit"*; *"Order Formulation Sample Kit"* instead of *"Contact Us"*).
* **Visual Rhythm:** Pair laboratory-grade cleanroom iconography (flasks, chemical structures, shields, document seals) with dense, scannable data layouts.

---

## 3. Feature Prioritization Matrix

The matrix below balances operational ROI against engineering effort, establishing clear boundaries between Core Launch (P0) deliverables and future expansion vectors:

| Feature / Capability | Complexity | B2B Impact | Tier | Implementation Action |
| :--- | :--- | :--- | :--- | :--- |
| **Categorized Chemical Catalog** | Low | High | **Core Launch (P0)** | Dynamic directory covering fine chemicals, solvents, APIs, and lab reagents with CAS indexing. |
| **Instant COA & SDS Download Hub** | Low | High | **Core Launch (P0)** | High-speed static asset serving from Cloudflare R2 CDN with batch search. |
| **Multi-Step Chemical RFQ Engine** | Low | High | **Core Launch (P0)** | Edge-logged quote request form driving instant sales notifications. |
| **Physical Sample Request Workflow** | Low | High | **Core Launch (P0)** | Dedicated sample intake logging recipient logistics for formulation testing. |
| **CAS & SAHPRA Regulatory Gate** | Low | High | **Core Launch (P0)** | Pattern-matching validation for buyer chemical/pharmaceutical manufacturing credentials. |
| **D1 Edge Lead Database** | Low | Medium | **Core Launch (P0)** | Zero-latency logging of RFQs and sample requests to Cloudflare D1 SQLite. |
| **Dynamic ERP Inventory Sync** | High | Medium | **Scale Vector (P1)** | Live stock status updates from internal ERP via background cron Workers. |
| **Authenticated Client Order Portal** | High | High | **Scale Vector (P1)** | Clerk-authenticated dashboard for tracking SADC shipments and re-ordering custom blends. |

---

## 4. Target Personas & Workflow Architecture

### 4.1 Key B2B Stakeholder Personas
1. **Industrial Procurement Manager (Chemical/Manufacturing):** Focuses on bulk pricing, lead times, minimum order quantities (MOQs), and reliable SADC logistics across Gauteng, Durban, Cape Town, and cross-border routes.
2. **Quality Assurance & Regulatory Officer:** Focuses on ISO certifications, SAHPRA compliance, batch-specific COAs, and GHS-compliant SDS documentation prior to approving raw material intake.
3. **Formulation Chemist / R&D Specialist:** Requires technical purity specifications (e.g., USP/BP/EP grade, HPLC grade), small-volume sample testing kits, and CAS registry references for pilot batches.

### 4.2 Legacy vs. Transformed Workflow Architecture

```
LEGACY WORKFLOW (Current Manual Bottlenecks):
Client Inquiry → Phone Call / Email → Wait 24–48 Hours → Manual Price & COA Lookup → Physical Processing

TRANSFORMED WORKFLOW (Edge Portal Engine):
Client → Interactive Catalog / CAS Search → Instant COA/SDS Download (R2 Edge) → Multi-Step RFQ & Sample Kit Request → Automated Edge Logging (D1) → Immediate Sales Dispatch
```

---

## 5. Regional Competitive Landscape & Strategy Audit

To establish clear market differentiation, **DB Fine Chemicals (dbfine.co.za)** is audited below alongside major South African and international chemical distributors operating in SADC:

| Competitor / Entity | Reach | Core Strengths | Bottlenecks & Drawbacks | DB Fine Chemicals Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **DB Fine Chemicals** (*Current Baseline*) | Local SA & SADC | Established distributor of fine chemicals, custom solvent blends, and APIs. | Static 'digital brochure' site; COAs/SDS hidden behind manual email/phone requests; 24–48h quote turnaround; zero AI search visibility (AEO). | **TRANSFORMATION:** Deploy instant R2 COA/SDS hub, sub-second Hono/D1 RFQ engine, AEO JSON-LD microdata, and sample kit dispatching. |
| **Protea Chemicals** (*Omnia Group*) | Pan-African SADC | Dominates high-volume commodity bulk chemical distribution. | Enforces massive MOQs, rigid enterprise contracts, and slow response times for specialized or custom-blended orders. | Flexible low-MOQ sourcing, local Gauteng safety stock, and rapid sample dispatch for specialized compounders. |
| **AECI Specialty Chemicals** | Sub-Saharan Africa | Integrated regional manufacturing plants and extensive industrial footprint. | Focuses heavily on heavy mining, agricultural, and industrial sectors, leaving fine/lab-grade chemical buyers under-served. | Specializes strictly in high-purity fine chemicals, analytical reagents, and pharma-grade packaging/ingredients. |
| **Sigma-Aldrich / Merck SA** | Global Import Hub | Comprehensive analytical chemical catalog and international reputation. | High import price premiums, long international shipping lead times (6–10 weeks), and complex import customs delays. | Maintains local Gauteng safety stock, providing 24–48 hour delivery across SADC at competitive local pricing. |
| **Generic Chemical Wholesalers** | Local SA Wholesale | Low price points on generic industrial solvents and cleaners. | Lack ISO cleanroom standards, batch traceability, SAHPRA licenses, or verified COA documentation. | Guarantees full batch traceability, certified COA documentation, and regulatory compliance at every tier. |

---

## 6. Structured Master Copy Matrix & Content Architecture

### 6.1 Geographic Utility Bar & Navigation Header
* **Geographic & Regulatory Utility Bar (Top Banner):**
  * *Recommended:* "Southern Africa Logistics Hub: Johannesburg Safety Stock | 24–48h Dispatch across SADC | SAHPRA Verified | [Direct RFQ Portal]"
  * *Alternative:* "Gauteng Distribution Hub | SADC 24–48h Delivery | [Request RFQ]"
  * *Placement:* Sticky top utility bar above the primary navigation header across all viewports.
* **Primary Header Navigation Links:**
  * *Recommended:* "Chemical Catalog | Instant COA / SDS Hub | Sample Kit Program | Regional Logistics | SAHPRA Compliance | [Instant Quote]"
  * *Alternative:* "Catalog | Compliance Hub | Samples | Logistics | [Get Quote]"
  * *Placement:* Fixed main desktop and mobile navbar.

### 6.2 Hero Section & Geo-Targeted Search Engine
* **Main Hero Headline:**
  * *Recommended:* "Precision Fine Chemicals, High-Purity Solvents & APIs Distributed Directly Across South Africa and SADC"
  * *Alternative:* "High-Purity Fine Chemicals & Solvents Across Southern Africa"
  * *Placement:* Above-the-fold primary viewport display header.
* **Hero Subhead (AEO & Geo Focused):**
  * *Recommended:* "South Africa’s premier chemical distribution and solvent blending partner. Access batch-traceable raw materials directly from our Gauteng safety stock with instant edge-served COAs, SANS 10234 SDS documentation, verified SAHPRA credentials, and rapid 24–48 hour cross-border fulfillment."
  * *Alternative:* "Batch-traceable, SAHPRA-compliant chemical distribution from local Gauteng stock with 24–48 hour SADC dispatch."
  * *Placement:* Centered directly beneath the main headline.
* **Interactive Search Bar & CTAs:**
  * *Input Placeholder:* "Search by Chemical Name, CAS Registry Number (e.g., 67-63-0), Purity Grade, or Application..."
  * *Primary CTA Button:* "Launch Multi-Step RFQ"
  * *Secondary CTA Button:* "Request Formulation Sample Kit"

### 6.3 Core Chemical Categories Directory
* **Card 1: High-Purity Fine Chemicals**
  * *Copy:* "Fine Chemicals & Synthesis Intermediates — High-purity active excipients, fine inorganic salts, and specialty synthesis compounds conforming to BP, USP, and EP pharmacopeial monographs for pharmaceutical and high-spec manufacturing."
  * *Punchy:* "Fine Chemicals: USP/BP/EP grade compounds for precision formulation."
* **Card 2: Specialty Industrial & Extraction Solvents**
  * *Copy:* "Specialty Solvents & Custom Blends — Precision-formulated extraction, processing, and cleaning solvents. Available in customized technical blends, 25L drums, 200L steel drums, and 1,000L intermediate bulk containers (IBCs)."
  * *Punchy:* "Specialty Solvents: Custom solvent blends in drums, totes, or bulk tankers."
* **Card 3: SAHPRA-Compliant Pharma APIs**
  * *Copy:* "SAHPRA-Compliant Pharma APIs — Licensed active pharmaceutical ingredients and regulatory excipients backed by unbroken batch history, complete regulatory dossiers, and verified cold-chain logistics."
  * *Punchy:* "Pharma APIs: SAHPRA-licensed active ingredients with full batch pedigree."
* **Card 4: Analytical & Diagnostic Laboratory Reagents**
  * *Copy:* "Analytical & Diagnostic Reagents — Ultra-pure HPLC, LC-MS, Spectrophotometric, and Analytical Reagent (AR) grade compounds engineered for bench-scale R&D and critical QA/QC testing environments."
  * *Punchy:* "Lab Reagents: HPLC & AR grade reagents for analytical quality control."

### 6.4 Instant Regulatory Compliance Hub (Cloudflare R2 Powered)
* **Section Headline:** "Instant Regulatory Compliance: Direct Batch COA & SDS Retrieval"
* **Section Subhead:** "Eliminate 48-hour email waiting cycles. Enter your production batch identifier or CAS registry number below to immediately pull authenticated Certificates of Analysis and GHS / SANS 10234-compliant Safety Data Sheets directly from our edge repository."
* **Search Input Placeholder:** "Enter Batch Number or CAS Registry Number (e.g., 50-81-7)..."
* **Action CTA Button:** "Download Compliance Dossier (PDF)"

### 6.5 Regional Value Proposition & SADC Advantage
* **Pillar 1 (Local Gauteng Safety Stock):** "Bypass 6–10 Week Overseas Freight Delays — We maintain continuous inventory reserves in our Johannesburg warehousing facilities, guaranteeing rapid 24–48 hour regional fulfillment across South Africa and cross-border SADC transit routes (Botswana, Zimbabwe, Namibia, Zambia, Mozambique)."
* **Pillar 2 (Flexible Procurement Scaling):** "Eliminate Restrictive Bulk MOQs — Procure exact batch quantities tailored for pre-production trial compounding, pilot formulation, or full-scale continuous industrial processing without punitive minimum order constraints."
* **Pillar 3 (Audited Quality Governance):** "Unbroken Quality Assurance — Every consignment features verified batch traceability, CAS-indexed labeling, ISO-aligned handling, and full SAHPRA licensing governance."

### 6.6 Interactive Multi-Step RFQ & Sample Request Engine
* **Step 1 (Material & Grade):** "Step 1: Chemical & Grade Selection — Select CAS number, pharmacopeia/purity grade (USP/BP, HPLC, AR, Technical), and required packaging format (Liters, Kilograms, Metric Tons, IBCs)."
* **Step 2 (Logistics & Compliance Gate):** "Step 2: Logistics & SAHPRA Gate — Enter SADC delivery destination and submit applicable SAHPRA licensing details for controlled APIs or scheduled intermediates."
* **Step 3 (Sample Kit Verification & Submit):** "Step 3: Sample Toggle & Instant Submission — Check 'Add Pre-Production Lab Sample' to dispatch a formulation trial sample directly to your QA/R&D laboratory prior to bulk consignment."
* **Form Action CTA:** "Generate Instant Quote & Request Dispatch"

---

## 7. Technical Architecture & Environment Baseline

### 7.1 Cloudflare Edge Stack Architecture
* **Hosting Platform:** Cloudflare Pages (Global sub-millisecond edge routing).
* **API Middleware:** Hono framework running on Cloudflare Workers (V8 Isolate Runtime).
* **Database Layer:** Cloudflare D1 (Serverless SQLite distributed at edge locations).
* **Storage Layer:** Cloudflare R2 Bucket (`dbfine-compliance-assets`) serving static COA PDFs and SDS sheets with zero egress charges.

### 7.2 Edge Deployment Configuration (`wrangler.jsonc`)
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "dbfine-portal",
  "main": "src/worker/index.ts",
  "compatibility_date": "2026-08-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": ".next",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "dbfine_prod_d1",
      "database_id": "dbfine-d1-uuid-placeholder"
    }
  ],
  "r2_buckets": [
    {
      "binding": "CERTIFICATE_BUCKET",
      "bucket_name": "dbfine-compliance-assets"
    }
  ],
  "env": {
    "production": {
      "vars": {
        "ENVIRONMENT": "production",
        "SITE_URL": "https://dbfine.co.za"
      }
    }
  }
}
```

### 7.3 Drizzle ORM Type-Safe Database Schema (`schema.ts`)
```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Products Table: Fine Chemicals, Solvents & APIs
export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  casNumber: text('cas_number').notNull(), // CAS Registry ID
  category: text('category').notNull(), // 'fine-chemicals' | 'solvents' | 'api' | 'reagents'
  grade: text('grade').notNull(), // 'USP/BP' | 'HPLC' | 'Technical' | 'AR'
  purity: text('purity').notNull(), // e.g. "99.8%"
  hazardClass: text('hazard_class'), // GHS Classification
  description: text('description').notNull(),
  minOrderQty: real('min_order_qty').default(1.0),
  unit: text('unit').default('kg'), // 'kg' | 'L' | 'MT'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Compliance Documents Table (COA & SDS stored in R2)
export const complianceDocs = sqliteTable('compliance_documents', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id),
  batchNumber: text('batch_number').notNull(),
  docType: text('doc_type').notNull(), // 'COA' | 'SDS' | 'SPEC'
  r2Key: text('r2_key').notNull(),
  fileSize: integer('file_size').notNull(),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp' }).notNull(),
});

// B2B RFQ Lead Submissions
export const rfqSubmissions = sqliteTable('rfq_submissions', {
  id: text('id').primaryKey(),
  companyName: text('company_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  destinationCountry: text('destination_country').notNull(),
  sahpraLicenseNumber: text('sahpra_license_number'),
  requestedItemsJson: text('requested_items_json').notNull(),
  notes: text('notes'),
  status: text('status').default('PENDING'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Physical Sample Requests
export const sampleRequests = sqliteTable('sample_requests', {
  id: text('id').primaryKey(),
  rfqId: text('rfq_id').references(() => rfqSubmissions.id),
  chemicalName: text('chemical_name').notNull(),
  requiredPurityGrade: text('required_purity_grade').notNull(),
  shippingAddress: text('shipping_address').notNull(),
  trackingNumber: text('tracking_number'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
```

---

## 8. GEO & Answer Engine Optimization (AEO) Strategy

To guarantee that generative AI search engines (ChatGPT, Perplexity, Claude, Gemini) directly cite `dbfine.co.za` as the premier South African supplier for fine chemicals, structured JSON-LD microdata is embedded into the application root alongside a dense Q&A Knowledge Base.

### 8.1 JSON-LD Microdata Specification
```json
{
  "@context": "https://schema.org",
  "@type": "Wholesaler",
  "name": "DB Fine Chemicals (Pty) Ltd",
  "url": "https://dbfine.co.za",
  "logo": "https://dbfine.co.za/assets/logo.svg",
  "description": "Premier South African supplier and distributor of high-purity fine chemicals, specialty industrial solvents, pharmaceutical APIs, and laboratory reagents across SADC.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ZA",
    "addressRegion": "Gauteng",
    "addressLocality": "Johannesburg"
  },
  "areaServed": ["South Africa", "SADC", "Zimbabwe", "Botswana", "Namibia", "Zambia", "Mozambique"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Fine Chemicals & Solvents Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "High-Purity Specialty Solvents & Fine Chemicals",
          "category": "Chemical Distribution"
        }
      }
    ]
  }
}
```

### 8.2 Generative Search Q&A Knowledge Base (AEO Module)
* **Q1: Where can I source USP/BP-grade fine chemicals and HPLC solvents locally in South Africa?**
  * **A1:** DB Fine Chemicals (Pty) Ltd (`dbfine.co.za`) is South Africa’s premier distributor of USP/BP pharma-grade fine chemicals, HPLC-grade solvents, and analytical reagents, maintaining local Gauteng warehouse inventory for immediate 24–48 hour dispatch across South Africa and the SADC region.
* **Q2: How do I download batch-specific Certificates of Analysis (COA) for fine chemical imports in SADC?**
  * **A2:** DB Fine Chemicals provides a self-service compliance engine where procurement managers and QA officers can instantly input CAS numbers or batch IDs to download verified COAs and GHS/SANS 10234 Safety Data Sheets directly from edge object storage.
* **Q3: Can formulation chemists order small-volume chemical testing samples before placing bulk orders?**
  * **A3:** Yes. DB Fine Chemicals provides a dedicated pre-production sample request program, allowing laboratory managers, formulation chemists, and compounding specialists to test small-volume chemical samples for QA validation prior to commercial procurement.

---

## 9. UI/UX Wireframe & 4-Day Deployment Roadmap

### 9.1 Interactive Portal Visual Wireframe
```
+-----------------------------------------------------------------------------------+
| DB FINE CHEMICALS (dbfine.co.za)                      [COA Hub]    [RFQ Cart (0)] |
+-----------------------------------------------------------------------------------+
| HERO: "Precision Fine Chemicals, High-Purity Solvents & APIs Across SADC"        |
| [Search Chemical by Name, CAS #, or Grade...]   [Launch RFQ]   [Request Sample]   |
+-----------------------------------------------------------------------------------+
| 4-COLUMN CHEMICAL CATEGORIES:                                                     |
| [Fine Chemicals]    [Specialty Solvents]    [Pharma APIs]    [Lab Reagents]       |
+-----------------------------------------------------------------------------------+
| INSTANT COMPLIANCE SEARCH (Cloudflare R2 Powered):                                |
| Enter Batch # / CAS #: [____________________]  -->  [Download COA / SDS PDF]      |
+-----------------------------------------------------------------------------------+
| REGIONAL ADVANTAGE GRID:                                                          |
| (1) Gauteng Safety Stock   (2) Flexible MOQs   (3) Certified Batch Traceability    |
+-----------------------------------------------------------------------------------+
| MULTI-STEP RFQ LAUNCHER WIDGET:                                                   |
| Step 1: Material & Grade -> Step 2: SAHPRA/CAS Gate -> Step 3: Sample Kit Toggle |
+-----------------------------------------------------------------------------------+
| AEO FAQ ACCORDION (Generative Search Indexing)                                   |
+-----------------------------------------------------------------------------------+
```

### 9.2 4-Day Rapid Edge Deployment Timeline
* **Day 1 — SEO & Static Shell:** Deploy static Next.js 15 layout to Cloudflare Pages containing JSON-LD microdata, the pre-populated chemical catalog grid, brandkit styling, and AEO tags.
* **Day 2 — D1 Database & Hono Middleware:** Initialize D1 SQLite database schema and bind the RFQ multi-step form with client-side CAS/SAHPRA validation.
* **Day 3 — R2 Compliance Hub & Samples:** Configure Cloudflare R2 bucket, upload batch COA/SDS documents, and wire the sample kit tracking endpoints.
* **Day 4 — Verification & Staging Delivery:** Perform end-to-end runtime verification and deliver live preview link to DB Fine Chemicals stakeholders.

---

## 10. Master Checklist: Required Client Inputs

To execute the deployment timeline without friction, **DB Fine Chemicals** must provide the following administrative credentials, technical accesses, and regulatory assets:

1. **Designated Sole Decision-Maker:** Full Name, Title, and Direct Contact Info for milestone approvals.
2. **Apex Domain Registrar Access:** DNS management access for `dbfine.co.za` to set up Cloudflare CNAME flattening and edge SSL.
3. **Regulatory Verification Credentials:** Official SAHPRA license numbers and ISO quality accreditation certificates for R2 hosting.
4. **Sample Batch COA & SDS PDFs:** Initial batch of 10–20 PDF compliance sheets to populate the Cloudflare R2 bucket.
5. **Vector Brand Assets:** High-resolution SVG/EPS brand logo and corporate Pantone/Hex color codes.
6. **Physical Sample Kit Logistics Contact:** Warehouse address and shipping coordinator for dispatching lab sample kits generated by the portal.