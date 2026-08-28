import { NextRequest, NextResponse } from 'next/server';
import { defaultComplianceDocs } from '@/data/defaultComplianceDocs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const batch = searchParams.get('batch');
    const cas = searchParams.get('cas');
    const docType = searchParams.get('docType');

    let docs = defaultComplianceDocs;

    if (batch) {
      const q = batch.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.batchNumber.toLowerCase().includes(q) ||
          d.casNumber.includes(q) ||
          d.productName.toLowerCase().includes(q)
      );
    }

    if (cas) {
      docs = docs.filter((d) => d.casNumber.includes(cas));
    }

    if (docType && docType !== 'ALL') {
      docs = docs.filter((d) => d.docType === docType);
    }

    return NextResponse.json({
      success: true,
      count: docs.length,
      documents: docs,
    });
  } catch (error) {
    console.error('API /api/compliance error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch compliance documents' },
      { status: 500 }
    );
  }
}
