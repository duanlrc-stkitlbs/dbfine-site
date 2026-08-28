'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useRfq } from '@/context/RfqContext';
import {
  FlaskConical,
  Plus,
  Check,
  FileCheck2,
  Package,
  ShieldCheck,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useRfq();
  const inCart = items.some((item) => item.productId === product.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-cleanroom hover:shadow-cleanroom-lg hover:border-teal-400 transition-all group">
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

        {/* Title */}
        <Link href={`/catalog/${product.slug}`} className="block group/link">
          <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover/link:text-teal-700 transition-colors line-clamp-2 leading-snug flex items-start justify-between gap-2">
            <span>{product.name}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/link:text-teal-600 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </h3>
        </Link>

        {/* Purity & SAHPRA Pill */}
        <div className="flex items-center gap-2 flex-wrap mt-2.5">
          <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
            Assay: {product.purity}
          </span>
          {product.hazardClass && (
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {product.hazardClass.split('(')[0]}
            </span>
          )}
          {product.sahpraRegulated && (
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              <span>SAHPRA License Req</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-3 mt-3 leading-relaxed">
          {product.description}
        </p>

        {/* Packaging Formats */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
            Standard Packaging Options:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.packagingOptions.map((pkg, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
              >
                {pkg.size}{pkg.unit} {pkg.type.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <Link
          href={`/compliance?batch=${encodeURIComponent(product.casNumber)}`}
          className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors"
          title="Download batch Certificate of Analysis or Safety Data Sheet"
        >
          <FileCheck2 className="w-4 h-4 text-teal-600" />
          <span>COA / SDS</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href={`/samples?chemical=${encodeURIComponent(product.name)}`}>
            <button
              className="p-2 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Request R&D Formulation Trial Sample Kit"
            >
              <Package className="w-4 h-4" />
            </button>
          </Link>
          <Button
            onClick={() => addItem(product)}
            variant={inCart ? 'secondary' : 'primary'}
            size="sm"
            className="font-bold text-xs"
            icon={inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          >
            {inCart ? 'In RFQ' : 'Add to RFQ'}
          </Button>
        </div>
      </div>
    </div>
  );
}
