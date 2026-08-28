'use client';

import React from 'react';
import Link from 'next/link';
import { useRfq } from '@/context/RfqContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Package,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function RfqDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    updatePackaging,
    toggleSample,
    clearCart,
    isDrawerOpen,
    closeDrawer,
    itemCount,
  } = useRfq();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teal-600/30 text-teal-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight">RFQ Inquiry Docket</h2>
                <p className="text-xs text-slate-300">
                  {itemCount} {itemCount === 1 ? 'material' : 'materials'} configured
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <FlaskConical className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950">Inquiry Docket is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Browse our South African inventory to add high-purity fine chemicals, specialty solvents, APIs, or reagents.
                  </p>
                </div>
                <Link href="/catalog" onClick={closeDrawer}>
                  <Button variant="primary" size="md">
                    Explore Chemical Catalog
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        CAS {item.casNumber}
                      </span>
                      <h4 className="text-sm font-bold text-navy-950 mt-1 leading-snug">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-teal-700 font-medium mt-0.5">
                        Grade: {item.grade} • Purity: {item.purity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Packaging & Quantity Controls */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Format
                      </label>
                      <input
                        type="text"
                        value={item.packagingFormat}
                        onChange={(e) => updatePackaging(item.productId, e.target.value)}
                        className="w-full text-xs font-medium text-navy-950 bg-white border border-slate-300 rounded px-2 py-1 focus:border-teal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Qty ({item.unit})
                      </label>
                      <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-navy-950 min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sample Kit Request Option */}
                  <div className="pt-1 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.requestSample}
                        onChange={() => toggleSample(item.productId)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                      />
                      <span className="text-xs font-medium text-navy-800 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-teal-600" />
                        Include R&D Formulation Sample Kit
                      </span>
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Dispatch Fulfillment:</span>
                <span className="text-teal-700 font-bold">Johannesburg Hub (24–48h)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Compliance Verification:</span>
                <span className="text-navy-950 font-bold">Instant Batch COA & SDS</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link href="/rfq" onClick={closeDrawer} className="w-full">
                  <Button variant="primary" size="lg" className="w-full justify-center gap-2">
                    <span>Proceed to Multi-Step Quote Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
                  >
                    Clear All Items
                  </button>
                  <button
                    onClick={closeDrawer}
                    className="text-xs text-slate-600 hover:text-navy-950 font-medium"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
