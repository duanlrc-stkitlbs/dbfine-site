'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Phone, Mail, Clock } from 'lucide-react';

export function UtilityBar() {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs border-b border-navy-800/80 tracking-tight py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Logistics & Regulatory Trust Signals */}
        <div className="flex items-center flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 font-medium text-slate-100">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Johannesburg Safety Stock:</span>
            <span className="text-teal-400 font-semibold">24–48h Dispatch Across South Africa</span>
          </div>
          <span className="hidden sm:inline text-navy-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>SAHPRA Section 22C Licensed</span>
          </div>
          <span className="hidden lg:inline text-navy-600">|</span>
          <div className="hidden lg:flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>GHS & SANS 10234 Compliant</span>
          </div>
        </div>

        {/* Right: Direct Contacts & Fast Actions */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="tel:+27110000000"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>+27 (0)11 824 1500</span>
          </a>
          <a
            href="mailto:quotes@dbfine.co.za"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-teal-400" />
            <span>quotes@dbfine.co.za</span>
          </a>
          <Link
            href="/rfq"
            className="bg-teal-600/30 text-teal-300 hover:bg-teal-600 hover:text-white border border-teal-500/40 px-2.5 py-0.5 rounded font-semibold text-[11px] transition-all"
          >
            Direct RFQ Portal →
          </Link>
        </div>
      </div>
    </div>
  );
}
