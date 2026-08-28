-- ==============================================================================
-- DB FINE CHEMICALS (PTY) LTD — CLOUDFLARE D1 DATABASE SCHEMA & SEED SCRIPT
-- Region: South Africa (Gauteng Central Distribution Hub)
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cas_number TEXT NOT NULL,
  category TEXT NOT NULL,
  grade TEXT NOT NULL,
  purity TEXT NOT NULL,
  molecular_formula TEXT,
  molecular_weight TEXT,
  appearance TEXT,
  assay TEXT,
  hazard_class TEXT NOT NULL,
  ghs_pictograms_json TEXT,
  description TEXT NOT NULL,
  applications_json TEXT,
  packaging_json TEXT,
  min_order_qty REAL DEFAULT 1.0,
  unit TEXT DEFAULT 'kg',
  lead_time TEXT DEFAULT 'Immediate (Johannesburg Stock)',
  in_stock_gauteng INTEGER DEFAULT 1,
  sahpra_regulated INTEGER DEFAULT 0,
  sahpra_schedule TEXT,
  synonyms_json TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_cas ON products (cas_number);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);

-- 2. COMPLIANCE DOCUMENTS TABLE (COA & SDS)
CREATE TABLE IF NOT EXISTS compliance_documents (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  product_name TEXT NOT NULL,
  cas_number TEXT NOT NULL,
  batch_number TEXT NOT NULL,
  doc_type TEXT NOT NULL,
  title TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  expiry_date TEXT,
  r2_key TEXT NOT NULL,
  file_size TEXT NOT NULL,
  parameters_json TEXT,
  ghs_classification_json TEXT,
  uploaded_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_compliance_batch ON compliance_documents (batch_number);
CREATE INDEX IF NOT EXISTS idx_compliance_cas ON compliance_documents (cas_number);

-- 3. RFQ SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS rfq_submissions (
  id TEXT PRIMARY KEY,
  reference_code TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  facility_type TEXT NOT NULL,
  sahpra_license_number TEXT,
  sahpra_license_status TEXT DEFAULT 'not_applicable',
  requested_items_json TEXT NOT NULL,
  notes TEXT,
  include_sample_kit INTEGER DEFAULT 0,
  sample_kit_details TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rfq_reference ON rfq_submissions (reference_code);

-- 4. SAMPLE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS sample_requests (
  id TEXT PRIMARY KEY,
  rfq_id TEXT,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  chemical_name TEXT NOT NULL,
  cas_number TEXT,
  grade TEXT NOT NULL,
  trial_application TEXT NOT NULL,
  estimated_commercial_volume TEXT,
  tracking_number TEXT,
  status TEXT DEFAULT 'RECEIVED',
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sample_tracking ON sample_requests (tracking_number);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

INSERT OR IGNORE INTO products (
  id, name, slug, cas_number, category, grade, purity, molecular_formula,
  molecular_weight, appearance, assay, hazard_class, description, min_order_qty,
  unit, lead_time, in_stock_gauteng, sahpra_regulated, created_at
) VALUES 
('prod-ipa-001', 'Isopropanol (IPA) 99.9% HPLC & Electronic Grade', 'isopropanol-99-9-hplc-electronic-grade', '67-63-0', 'solvents', 'HPLC', '≥ 99.9%', 'C3H8O', '60.10 g/mol', 'Clear, colorless volatile liquid', '99.92% (GC)', 'Flammable Liquid (Class 3)', 'High-purity anhydrous isopropyl alcohol engineered for precision chromatography and cleanroom disinfection.', 25.0, 'L', 'Immediate (Johannesburg Stock)', 1, 0, 1724800000),
('prod-ace-002', 'Acetone AR (Analytical Reagent) ≥ 99.8%', 'acetone-ar-analytical-reagent', '67-64-1', 'solvents', 'AR (Analytical Reagent)', '≥ 99.8%', 'C3H6O', '58.08 g/mol', 'Clear, mobile liquid with characteristic ketone odor', '99.85%', 'Flammable Liquid (Class 3)', 'Analytical reagent grade dimethyl ketone characterized by ultra-low non-volatile residue.', 25.0, 'L', 'Immediate (Johannesburg Stock)', 1, 0, 1724800000),
('prod-asc-004', 'L-Ascorbic Acid (Vitamin C) USP / EP Pharma Grade', 'l-ascorbic-acid-vitamin-c-usp-ep-pharma-grade', '50-81-7', 'fine-chemicals', 'USP/BP/EP', '99.0% - 100.5%', 'C6H8O6', '176.12 g/mol', 'White to slightly yellow crystalline powder', '99.7%', 'Non-Hazardous', 'High-potency pharma-grade crystalline Vitamin C compliant with USP/EP standards.', 25.0, 'kg', 'Immediate (Johannesburg Stock)', 1, 1, 1724800000),
('prod-par-006', 'Paracetamol (Acetaminophen) Micronized BP / USP API', 'paracetamol-acetaminophen-micronized-bp-usp-api', '103-90-2', 'api', 'USP/BP/EP', '99.0% - 101.0%', 'C8H9NO2', '151.16 g/mol', 'White odorless crystalline powder', '99.8%', 'Non-Hazardous (Pharma API)', 'Active Pharmaceutical Ingredient (API) micronized for direct tablet compression and liquid suspension.', 50.0, 'kg', '24-48 Hours (Gauteng Cleanroom)', 1, 1, 1724800000);

INSERT OR IGNORE INTO compliance_documents (
  id, product_id, product_name, cas_number, batch_number, doc_type, title,
  issue_date, expiry_date, r2_key, file_size, uploaded_at
) VALUES
('doc-coa-ipa-01', 'prod-ipa-001', 'Isopropanol (IPA) 99.9% HPLC Grade', '67-63-0', 'DBF-IPA-2608A', 'COA', 'Certificate of Analysis - Isopropanol HPLC (Batch DBF-IPA-2608A)', '2026-08-15', '2028-08-14', 'coa/DBF-IPA-2608A.pdf', '384 KB', 1724800000),
('doc-sds-ipa-01', 'prod-ipa-001', 'Isopropanol (IPA) 99.9% HPLC Grade', '67-63-0', 'DBF-IPA-2608A', 'SDS', 'SANS 10234 Safety Data Sheet - Isopropanol 99.9%', '2026-01-10', '2029-01-09', 'sds/DBF-SDS-67-63-0.pdf', '612 KB', 1724800000),
('doc-coa-asc-01', 'prod-asc-004', 'L-Ascorbic Acid USP/EP', '50-81-7', 'DBF-ASC-2607B', 'COA', 'Certificate of Analysis - L-Ascorbic Acid USP/EP (Batch DBF-ASC-2607B)', '2026-07-22', '2029-07-21', 'coa/DBF-ASC-2607B.pdf', '418 KB', 1724800000);
