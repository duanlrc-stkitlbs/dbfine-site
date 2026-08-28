import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { defaultProducts } from '@/data/defaultProducts';
import { defaultComplianceDocs } from '@/data/defaultComplianceDocs';
import path from 'path';
import fs from 'fs';

let client: ReturnType<typeof createClient> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;
let isInitialized = false;

export async function getDb() {
  if (dbInstance && isInitialized) {
    return dbInstance;
  }

  try {
    const dataDir = path.join(process.cwd(), '.data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'dbfine.db');
    const url = `file:${dbPath.replace(/\\/g, '/')}`;

    client = createClient({ url });
    dbInstance = drizzle(client, { schema });

    // Ensure tables exist
    await client.executeMultiple(`
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
    `);

    // Check if seeded
    const countRes = await client.execute('SELECT COUNT(*) as count FROM products');
    const count = Number(countRes.rows[0]?.count || 0);

    if (count === 0) {
      await seedDatabase(client);
    }

    isInitialized = true;
    return dbInstance;
  } catch (error) {
    console.warn('Database initialization warning:', error);
    return null;
  }
}

async function seedDatabase(cli: ReturnType<typeof createClient>) {
  for (const p of defaultProducts) {
    await cli.execute({
      sql: `INSERT OR IGNORE INTO products (
        id, name, slug, cas_number, category, grade, purity, molecular_formula, molecular_weight,
        appearance, assay, hazard_class, ghs_pictograms_json, description, applications_json,
        packaging_json, min_order_qty, unit, lead_time, in_stock_gauteng, sahpra_regulated,
        sahpra_schedule, synonyms_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id,
        p.name,
        p.slug,
        p.casNumber,
        p.category,
        p.grade,
        p.purity,
        p.molecularFormula || null,
        p.molecularWeight || null,
        p.appearance || null,
        p.assay || null,
        p.hazardClass,
        JSON.stringify(p.ghsPictograms || []),
        p.description,
        JSON.stringify(p.applications || []),
        JSON.stringify(p.packagingOptions || []),
        p.minOrderQty,
        p.unit,
        p.leadTime,
        p.inStockGauteng ? 1 : 0,
        p.sahpraRegulated ? 1 : 0,
        p.sahpraSchedule || null,
        JSON.stringify(p.synonyms || []),
        Date.now(),
      ],
    });
  }

  for (const d of defaultComplianceDocs) {
    await cli.execute({
      sql: `INSERT OR IGNORE INTO compliance_documents (
        id, product_id, product_name, cas_number, batch_number, doc_type, title, issue_date,
        expiry_date, r2_key, file_size, parameters_json, ghs_classification_json, uploaded_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        d.id,
        d.productId,
        d.productName,
        d.casNumber,
        d.batchNumber,
        d.docType,
        d.title,
        d.issueDate,
        d.expiryDate || null,
        d.r2Key,
        d.fileSize,
        JSON.stringify(d.parameters || []),
        JSON.stringify(d.ghsClassification || {}),
        Date.now(),
      ],
    });
  }
}
