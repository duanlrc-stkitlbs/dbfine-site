'use client';

import React, { Suspense } from 'react';
import { MultiStepRfqForm } from '@/components/rfq/MultiStepRfqForm';
import { ShieldCheck, Truck, Clock } from 'lucide-react';

export default function RfqPage() {
  return (
    <div className="py-10 lg:py-14 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider font-mono">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>2–4h Rapid Turnaround • Direct ZAR Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            B2B Chemical Quote & Logistics Engine
          </h1>
          <p className="text-sm text-slate-600">
            Submit your chemical, solvent, API, or reagent volume requirements. Receive formal pro-forma pricing with batch traceability, delivery SLAs, and optional R&D trial sample kits.
          </p>
        </div>

        {/* Multi-Step Form */}
        <Suspense fallback={<div className="text-center py-12">Loading Quote Engine...</div>}>
          <MultiStepRfqForm />
        </Suspense>
      </div>
    </div>
  );
}
