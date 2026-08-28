import { NextRequest, NextResponse } from 'next/server';
import { defaultProducts } from '@/data/defaultProducts';
import { getDb } from '@/db';
import { products } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const grade = searchParams.get('grade');
    const q = searchParams.get('q');
    const inStock = searchParams.get('inStock');

    // Attempt DB fetch or fallback to defaultProducts
    let results = defaultProducts;

    if (category && category !== 'all') {
      results = results.filter((p) => p.category === category);
    }

    if (grade && grade !== 'all') {
      results = results.filter((p) => p.grade === grade);
    }

    if (inStock === 'true') {
      results = results.filter((p) => p.inStockGauteng);
    }

    if (q && q.trim()) {
      const query = q.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.casNumber.includes(query) ||
          p.molecularFormula?.toLowerCase().includes(query) ||
          p.synonyms?.some((s) => s.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      products: results,
    });
  } catch (error) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chemical products' },
      { status: 500 }
    );
  }
}
