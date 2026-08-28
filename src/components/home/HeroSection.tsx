'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Package,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/catalog');
    }
  };

  const quickSearches = [
    { label: 'Isopropanol HPLC (67-63-0)', query: '67-63-0' },
    { label: 'Ascorbic Acid BP (50-81-7)', query: '50-81-7' },
    { label: 'Paracetamol API (103-90-2)', query: '103-90-2' },
    { label: 'Acetone AR (67-64-1)', query: '67-64-1' },
    { label: 'Acetonitrile LC-MS (75-05-8)', query: '75-05-8' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-14 pb-20 lg:pt-20 lg:pb-28 border-b border-navy-800">
      {/* Background Molecular Grid Graphic Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill / Regulatory Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>SAHPRA Licensed • SANS 10234 Compliant • Gauteng Central Hub</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
            Precision Fine Chemicals, High-Purity Solvents & APIs Distributed{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300">
              Nationwide Across South Africa
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            South Africa’s premier chemical distribution and solvent blending partner. Access batch-traceable raw materials directly from our Gauteng safety stock with instant edge-served COAs, SANS 10234 SDS documentation, verified SAHPRA credentials, and rapid 24–48 hour nationwide fulfillment.
          </p>

          {/* High-Contrast Interactive Search Bar */}
          <div className="pt-3 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-2xl border-2 border-teal-500/40 focus-within:border-teal-500 transition-all"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Chemical Name, CAS Registry No (e.g. 67-63-0), Grade..."
                  className="w-full pl-3 pr-2 py-2.5 text-sm text-navy-950 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-6 font-bold shadow-md shrink-0"
              >
                <span>Search Catalog</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            {/* Quick CAS query pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-3 text-xs text-slate-400">
              <span className="text-slate-400 font-medium">Quick Lookup:</span>
              {quickSearches.map((item) => (
                <button
                  key={item.query}
                  onClick={() => router.push(`/catalog?q=${encodeURIComponent(item.query)}`)}
                  className="px-2.5 py-1 rounded-full bg-navy-900/90 hover:bg-navy-800 text-slate-300 hover:text-teal-300 border border-navy-700 text-[11px] font-mono transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/rfq" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center text-base font-bold bg-teal-500 hover:bg-teal-600 shadow-lg shadow-teal-500/20"
                icon={<FlaskConical className="w-5 h-5" />}
              >
                Launch Multi-Step RFQ
              </Button>
            </Link>
            <Link href="/samples" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center text-base font-bold bg-navy-900/80 hover:bg-navy-800 text-white border-slate-700 hover:border-slate-500"
                icon={<Package className="w-5 h-5 text-teal-400" />}
              >
                Request Formulation Sample Kit
              </Button>
            </Link>
            <Link href="/compliance" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full justify-center text-sm font-semibold text-slate-300 hover:text-white"
              >
                Instant COA / SDS Hub →
              </Button>
            </Link>
          </div>

          {/* Key Metric & Assurance Badges */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-navy-800/80 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-xl bg-navy-900/50 border border-navy-800 text-left">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                <Truck className="w-5 h-5" />
                <span>24–48h</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Nationwide Road Freight from Johannesburg Hub</p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/50 border border-navy-800 text-left">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>100%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Batch Traceability & Direct COA Downloads</p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/50 border border-navy-800 text-left">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5" />
                <span>Sec 22C</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">SAHPRA Licensed Facility & Cold-Chain APIs</p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/50 border border-navy-800 text-left">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                <Package className="w-5 h-5" />
                <span>Flexible</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Low MOQs: Trial Liters to 1,000L Bulk IBCs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
