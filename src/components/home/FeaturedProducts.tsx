'use client';

import React from 'react';
import Link from 'next/link';
import { defaultProducts } from '@/data/defaultProducts';
import { useRfq } from '@/context/RfqContext';
import {
  FlaskConical,
  Plus,
  FileCheck2,
  Package,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '../ui/Button';

export function FeaturedProducts() {
  const { addItem, items } = useRfq();
  const featured = defaultProducts.slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-slate-mist/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Johannesburg Warehouse Safety Stock
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans mt-2">
              High-Demand Chemical Consignments
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Available for immediate 24–48h domestic road freight dispatch across all South African provinces.
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="outline" size="md" className="font-bold border-slate-300">
              <span>View Full 24+ Chemical Directory</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => {
            const inCart = items.some((item) => item.productId === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-cleanroom hover:shadow-cleanroom-lg hover:border-teal-400 transition-all group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      CAS: {product.casNumber}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {product.grade}
                    </span>
                  </div>

                  {/* Title & Purity */}
                  <Link href={`/catalog/${product.slug}`}>
                    <h3 className="text-base font-bold text-navy-950 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-mono font-bold text-teal-700 bg-slate-100 px-2 py-0.5 rounded">
                      Purity: {product.purity}
                    </span>
                    {product.sahpraRegulated && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>SAHPRA Gate</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Packaging formats pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Available Packaging Formats:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.packagingOptions.map((pkg, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {pkg.size}{pkg.unit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/compliance?batch=${encodeURIComponent(product.casNumber)}`}
                    className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
                    title="Download certified batch COA / SDS"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>COA / SDS</span>
                  </Link>

                  <Button
                    onClick={() => addItem(product)}
                    variant={inCart ? 'secondary' : 'primary'}
                    size="sm"
                    className="font-bold text-xs"
                    icon={inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  >
                    {inCart ? 'In RFQ Docket' : 'Add to RFQ'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
