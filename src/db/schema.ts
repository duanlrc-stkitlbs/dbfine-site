import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Products Table: Fine Chemicals, Solvents & APIs
export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  casNumber: text('cas_number').notNull(),
  category: text('category').notNull(), // 'fine-chemicals' | 'solvents' | 'api' | 'reagents'
  grade: text('grade').notNull(), // 'USP/BP/EP' | 'HPLC' | 'LC-MS' | 'AR' | 'Technical'
  purity: text('purity').notNull(),
  molecularFormula: text('molecular_formula'),
  molecularWeight: text('molecular_weight'),
  appearance: text('appearance'),
  assay: text('assay'),
  hazardClass: text('hazard_class').notNull(),
  ghsPictogramsJson: text('ghs_pictograms_json'),
  description: text('description').notNull(),
  applicationsJson: text('applications_json'),
  packagingJson: text('packaging_json'),
  minOrderQty: real('min_order_qty').default(1.0),
  unit: text('unit').default('kg'),
  leadTime: text('lead_time').default('Immediate (Johannesburg Stock)'),
  inStockGauteng: integer('in_stock_gauteng', { mode: 'boolean' }).default(true),
  sahpraRegulated: integer('sahpra_regulated', { mode: 'boolean' }).default(false),
  sahpraSchedule: text('sahpra_schedule'),
  synonymsJson: text('synonyms_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Compliance Documents Table (COA & SDS stored in R2)
export const complianceDocs = sqliteTable('compliance_documents', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id),
  productName: text('product_name').notNull(),
  casNumber: text('cas_number').notNull(),
  batchNumber: text('batch_number').notNull(),
  docType: text('doc_type').notNull(), // 'COA' | 'SDS' | 'SPEC'
  title: text('title').notNull(),
  issueDate: text('issue_date').notNull(),
  expiryDate: text('expiry_date'),
  r2Key: text('r2_key').notNull(),
  fileSize: text('file_size').notNull(),
  parametersJson: text('parameters_json'),
  ghsClassificationJson: text('ghs_classification_json'),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp' }).notNull(),
});

// B2B RFQ Lead Submissions
export const rfqSubmissions = sqliteTable('rfq_submissions', {
  id: text('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  companyName: text('company_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  province: text('province').notNull(), // SA Province (Gauteng, Western Cape, KZN, etc.)
  city: text('city').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  destinationFacilityType: text('facility_type').notNull(),
  sahpraLicenseNumber: text('sahpra_license_number'),
  sahpraLicenseStatus: text('sahpra_license_status').default('not_applicable'),
  requestedItemsJson: text('requested_items_json').notNull(),
  notes: text('notes'),
  includeSampleKit: integer('include_sample_kit', { mode: 'boolean' }).default(false),
  sampleKitDetails: text('sample_kit_details'),
  status: text('status').default('PENDING'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Physical Sample Requests
export const sampleRequests = sqliteTable('sample_requests', {
  id: text('id').primaryKey(),
  rfqId: text('rfq_id'),
  companyName: text('company_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  province: text('province').notNull(),
  city: text('city').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  targetChemical: text('chemical_name').notNull(),
  casNumber: text('cas_number'),
  grade: text('grade').notNull(),
  trialApplication: text('trial_application').notNull(),
  estimatedCommercialVolume: text('estimated_commercial_volume'),
  trackingNumber: text('tracking_number'),
  status: text('status').default('RECEIVED'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
