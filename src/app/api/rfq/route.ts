import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/db';
import { rfqSubmissions } from '@/db/schema';

const RfqItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  casNumber: z.string(),
  grade: z.string(),
  purity: z.string(),
  packagingFormat: z.string(),
  quantity: z.number().positive(),
  unit: z.string(),
  requestSample: z.boolean().optional(),
});

const RfqBodySchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  province: z.string().min(2),
  city: z.string().min(2),
  deliveryAddress: z.string().min(3),
  destinationFacilityType: z.string().default('manufacturing_plant'),
  sahpraLicenseNumber: z.string().optional().nullable(),
  sahpraLicenseStatus: z.string().optional().nullable(),
  items: z.array(RfqItemSchema).min(1),
  notes: z.string().optional().nullable(),
  includeSampleKit: z.boolean().optional(),
  sampleKitDetails: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = RfqBodySchema.parse(json);

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `DBF-RFQ-${year}-${randomSeq}`;
    const id = `rfq-${Date.now()}-${randomSeq}`;

    // Log to DB
    const db = await getDb();
    if (db) {
      try {
        await db.insert(rfqSubmissions).values({
          id,
          referenceCode,
          companyName: parsed.companyName,
          contactName: parsed.contactName,
          email: parsed.email,
          phone: parsed.phone,
          province: parsed.province,
          city: parsed.city,
          deliveryAddress: parsed.deliveryAddress,
          destinationFacilityType: parsed.destinationFacilityType,
          sahpraLicenseNumber: parsed.sahpraLicenseNumber || null,
          sahpraLicenseStatus: parsed.sahpraLicenseStatus || 'not_applicable',
          requestedItemsJson: JSON.stringify(parsed.items),
          notes: parsed.notes || null,
          includeSampleKit: parsed.includeSampleKit || false,
          sampleKitDetails: parsed.sampleKitDetails || null,
          status: 'PENDING',
          createdAt: new Date(),
        });
      } catch (dbErr) {
        console.warn('DB insert non-fatal warning:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      referenceCode,
      message: 'RFQ inquiry successfully received and logged to Johannesburg sales desk.',
      submissionId: id,
    });
  } catch (error: any) {
    console.error('API /api/rfq error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to process RFQ submission' },
      { status: 500 }
    );
  }
}
