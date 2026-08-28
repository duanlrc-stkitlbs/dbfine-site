'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useRfq } from '@/context/RfqContext';
import { FileCheck2, Plus, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductSpecTableProps {
  products: Product[];
}

export function ProductSpecTable({ products }: ProductSpecTableProps) {
  const { addItem, items } = useRfq();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-cleanroom overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-navy-950 text-white font-mono uppercase text-[11px] tracking-wider">
              <th className="py-3.5 px-4 font-bold">CAS Number</th>
              <th className="py-3.5 px-4 font-bold">Chemical Name & Description</th>
              <th className="py-3.5 px-4 font-bold">Grade</th>
              <th className="py-3.5 px-4 font-bold">Assay / Purity</th>
              <th className="py-3.5 px-4 font-bold">Packaging</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-sans">
            {products.map((product) => {
              const inCart = items.some((item) => item.productId === product.id);

              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* CAS Number */}
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-800 whitespace-nowrap">
                    {product.casNumber}
                  </td>

                  {/* Name & Subtitle */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <Link
                      href={`/catalog/${product.slug}`}
                      className="font-bold text-navy-950 group-hover:text-teal-700 transition-colors block"
                    >
                      {product.name}
                    </Link>
                    <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {product.molecularFormula ? `${product.molecularFormula} • ` : ''}
                      {product.hazardClass}
                    </span>
                  </td>

                  {/* Grade */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {product.grade}
                    </span>
                  </td>

                  {/* Purity */}
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                    {product.purity}
                  </td>

                  {/* Packaging */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {product.packagingOptions.map((p) => `${p.size}${p.unit}`).join(', ')}
                  </td>

                  {/* Stock / SAHPRA */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {product.sahpraRegulated ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <ShieldCheck className="w-3 h-3" />
                        <span>SAHPRA Gate</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        <span>JHB In-Stock</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/compliance?batch=${encodeURIComponent(product.casNumber)}`}
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                        title="Download Certificate of Analysis"
                      >
                        <FileCheck2 className="w-4 h-4" />
                      </Link>
                      <Button
                        onClick={() => addItem(product)}
                        variant={inCart ? 'secondary' : 'primary'}
                        size="sm"
                        className="text-[11px] py-1 px-2.5 font-bold"
                        icon={inCart ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      >
                        {inCart ? 'Added' : 'RFQ'}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
