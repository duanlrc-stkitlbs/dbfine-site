'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { defaultProducts } from '@/data/defaultProducts';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ProductSpecTable } from '@/components/catalog/ProductSpecTable';
import { FlaskConical, ShieldCheck, Truck } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialGrade = searchParams.get('grade') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [grade, setGrade] = useState(initialGrade);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredProducts = useMemo(() => {
    return defaultProducts.filter((product) => {
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCas = product.casNumber.includes(q);
        const matchesFormula = product.molecularFormula?.toLowerCase().includes(q);
        const matchesSynonym = product.synonyms?.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCas && !matchesFormula && !matchesSynonym && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (category !== 'all' && product.category !== category) {
        return false;
      }

      // Grade
      if (grade !== 'all' && product.grade !== grade) {
        return false;
      }

      // In stock
      if (inStockOnly && !product.inStockGauteng) {
        return false;
      }

      return true;
    });
  }, [search, category, grade, inStockOnly]);

  return (
    <div className="py-10 lg:py-14 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">
            <span>South Africa Catalog</span>
            <span>•</span>
            <span>Johannesburg Stock Reserve</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Chemical Catalog & Pharmacopeial Directory
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Browse our South African inventory of high-purity fine chemicals, analytical solvents, SAHPRA-compliant APIs, and lab reagents. Order direct trial quantities or bulk consignments with instant COA/SDS download.
          </p>
        </div>

        {/* Filters */}
        <CatalogFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          grade={grade}
          setGrade={setGrade}
          viewMode={viewMode}
          setViewMode={setViewMode}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          totalCount={filteredProducts.length}
        />

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-cleanroom space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <FlaskConical className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-950">No Chemicals Match Your Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Try searching by CAS Registry number (e.g. 67-63-0) or clear active category filters to view all products.
              </p>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ProductSpecTable products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2 text-teal-600 font-bold">
            <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading South African Chemical Directory...</span>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
