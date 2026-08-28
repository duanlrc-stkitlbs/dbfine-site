import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/db';
import { sampleRequests } from '@/db/schema';

const SampleBodySchema = z.object({
  rfqId: z.string().optional().nullable(),
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  province: z.string().min(2),
  city: z.string().min(2),
  deliveryAddress: z.string().min(3),
  targetChemical: z.string().min(2),
  casNumber: z.string().optional().nullable(),
  grade: z.string().default('USP/BP/EP'),
  trialApplication: z.string().min(2),
  estimatedCommercialVolume: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = SampleBodySchema.parse(json);

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `DBF-SAMPLE-${year}-${randomSeq}`;
    const id = `sample-${Date.now()}-${randomSeq}`;

    // Log to DB
    const db = await getDb();
    if (db) {
      try {
        await db.insert(sampleRequests).values({
          id,
          rfqId: parsed.rfqId || null,
          companyName: parsed.companyName,
          contactName: parsed.contactName,
          email: parsed.email,
          phone: parsed.phone,
          province: parsed.province,
          city: parsed.city,
          deliveryAddress: parsed.deliveryAddress,
          targetChemical: parsed.targetChemical,
          casNumber: parsed.casNumber || null,
          grade: parsed.grade,
          trialApplication: parsed.trialApplication,
          estimatedCommercialVolume: parsed.estimatedCommercialVolume || null,
          trackingNumber,
          status: 'RECEIVED',
          createdAt: new Date(),
        });
      } catch (dbErr) {
        console.warn('DB sample insert non-fatal warning:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      trackingNumber,
      message: 'Sample kit request received. Dispatch allocated from Johannesburg cleanroom.',
      sampleId: id,
    });
  } catch (error: any) {
    console.error('API /api/samples error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to process sample request' },
      { status: 500 }
    );
  }
}
