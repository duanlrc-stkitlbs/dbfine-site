import React from 'react';
import {
  Truck,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  Award,
} from 'lucide-react';

export function SaAdvantageGrid() {
  const pillars = [
    {
      title: 'Local Gauteng Safety Stock',
      tag: '24–48h Dispatch',
      headline: 'Bypass 6–10 Week Overseas Freight Delays',
      description:
        'We maintain continuous bulk and packaged inventory reserves in our Johannesburg warehousing facilities, guaranteeing rapid 24–48 hour domestic delivery to Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, and all 9 South African provinces.',
      icon: Truck,
      color: 'teal',
      bullets: [
        'Dedicated road freight lines to Durban, Cape Town & Gqeberha',
        'Direct ex-warehouse collections available in Germiston, JHB',
        'Full hazardous goods transport documentation (SANS 10231)',
        'Buffer stock agreements for continuous plant supply',
      ],
    },
    {
      title: 'Flexible Procurement Scaling',
      tag: 'Zero Bulk Penalties',
      headline: 'Eliminate Restrictive Minimum Order Quantities',
      description:
        'Procure exact batch quantities tailored for pre-production trial compounding, pilot formulation, or full-scale continuous industrial processing without punitive minimum order constraints.',
      icon: Layers,
      color: 'cyan',
      bullets: [
        'Packaged from 1kg / 2.5L bench quantities to 1,000L IBCs',
        'Complimentary physical R&D trial sample program',
        'Custom solvent blending and technical dilution services',
        'Volume tier discounts for quarterly manufacturing contracts',
      ],
    },
    {
      title: 'Audited Quality Governance',
      tag: 'SAHPRA Licensed',
      headline: 'Unbroken Quality & Pharmacopeial Integrity',
      description:
        'Every single consignment features certified batch traceability, CAS-indexed tamper-evident labeling, ISO-aligned handling, and full SAHPRA Section 22C licensing governance.',
      icon: ShieldCheck,
      color: 'amber',
      bullets: [
        'SAHPRA Section 22C Wholesaler License No. 00002241/C',
        'Direct download of authenticated batch COAs & SANS SDS',
        'USP, BP, EP, and AR monograph conformance testing',
        'Full Cold-Chain monitoring for temperature-sensitive APIs',
      ],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Regional Strategic Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Why South African Industry Relies on DB Fine Chemicals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminating import friction, regulatory bottlenecks, and excessive MOQs through local Johannesburg safety stock and automated edge compliance.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between hover:border-teal-400 hover:bg-white hover:shadow-cleanroom-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-teal-600 group-hover:bg-navy-950 group-hover:text-teal-400 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {pillar.title}
                  </h3>
                  <h4 className="text-xl font-bold text-navy-950 mb-3 leading-snug">
                    {pillar.headline}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/80">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
