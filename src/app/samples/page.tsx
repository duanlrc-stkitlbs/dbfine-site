'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SampleRequestForm } from '@/components/samples/SampleRequestForm';
import { Package, ShieldCheck, CheckCircle2, FlaskConical, Clock } from 'lucide-react';

function SamplesContent() {
  const searchParams = useSearchParams();
  const chemical = searchParams.get('chemical') || '';
  const cas = searchParams.get('cas') || '';

  return (
    <div className="py-10 lg:py-14 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider font-mono">
            <Package className="w-3.5 h-3.5 text-teal-600" />
            <span>R&D & QA Evaluation Program • Zero Purchase Obligation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Physical Formulation Sample Kit Program
          </h1>
          <p className="text-sm text-slate-600">
            Order authenticated, tamper-sealed chemical and solvent samples (100ml / 100g) dispatched directly to your laboratory for stability trials, HPLC calibration, and formulation verification prior to bulk procurement.
          </p>
        </div>

        {/* 3 Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10 text-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">Exact Production Batch</span>
              <span className="text-slate-500">Sample drawn directly from active consignment</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">Batch COA Included</span>
              <span className="text-slate-500">Full certified analytical monograph sheet</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">24–48h Courier Dispatch</span>
              <span className="text-slate-500">Tracked door-to-door delivery across SA</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <SampleRequestForm initialChemical={chemical} initialCas={cas} />
      </div>
    </div>
  );
}

export default function SamplesPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading Sample Kit Program...</div>}>
      <SamplesContent />
    </Suspense>
  );
}
