import React from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Droplets,
  Pill,
  Microscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../ui/Card';

export function CategoryGrid() {
  const categories = [
    {
      id: 'fine-chemicals',
      title: 'High-Purity Fine Chemicals',
      punchy: 'Fine Chemicals: USP/BP/EP grade compounds for precision formulation.',
      description:
        'High-purity active excipients, fine inorganic salts, and specialty synthesis compounds conforming to BP, USP, and Ph. Eur. pharmacopeial monographs for pharmaceutical and high-spec manufacturing.',
      icon: FlaskConical,
      accentColor: 'text-teal-600',
      bgGradient: 'from-teal-500/10 to-transparent',
      borderColor: 'border-teal-200 hover:border-teal-500',
      badge: 'USP / BP / EP Monographs',
      highlights: ['Active Excipients & Salts', 'Batch-Traceable Pedigree', 'Low Heavy Metal Limits', 'Compounding Ready'],
      href: '/catalog?category=fine-chemicals',
      sampleChemicals: 'L-Ascorbic Acid, Citric Acid, Sodium Hydroxide Pellets AR, NaCl Pharma',
    },
    {
      id: 'solvents',
      title: 'Specialty Solvents & Blends',
      punchy: 'Specialty Solvents: Custom solvent blends in drums, totes, or bulk tankers.',
      description:
        'Precision-formulated extraction, processing, and cleaning solvents. Available in customized technical blends, 25L drums, 200L steel drums, and 1,000L intermediate bulk containers (IBCs).',
      icon: Droplets,
      accentColor: 'text-cyan-600',
      bgGradient: 'from-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-200 hover:border-cyan-500',
      badge: '25L Drums to 1,000L IBCs',
      highlights: ['Custom Solvent Blending', 'HPLC & Spectro Purity', 'UN Dangerous Goods Packing', 'Johannesburg Safety Stock'],
      href: '/catalog?category=solvents',
      sampleChemicals: 'Isopropanol 99.9%, Acetone AR, Acetonitrile LC-MS, Methanol HPLC, Ethanol 99.9%',
    },
    {
      id: 'api',
      title: 'SAHPRA-Compliant Pharma APIs',
      punchy: 'Pharma APIs: SAHPRA-licensed active ingredients with full batch pedigree.',
      description:
        'Licensed active pharmaceutical ingredients (APIs) and regulatory excipients backed by unbroken batch history, complete CEP/DMF regulatory dossiers, and verified cold-chain logistics in South Africa.',
      icon: Pill,
      accentColor: 'text-amber-600',
      bgGradient: 'from-amber-500/10 to-transparent',
      borderColor: 'border-amber-200 hover:border-amber-500',
      badge: 'SAHPRA Section 22C Licensed',
      highlights: ['Micronized & DC Grades', 'Full CEP / DMF Dossiers', 'Strict cGMP Manufacturing', 'Schedule 2–4 Verification'],
      href: '/catalog?category=api',
      sampleChemicals: 'Paracetamol Micronized BP, Ibuprofen DC, Metformin HCl API, Amoxicillin Trihydrate',
    },
    {
      id: 'reagents',
      title: 'Analytical & Diagnostic Reagents',
      punchy: 'Lab Reagents: HPLC & AR grade reagents for analytical quality control.',
      description:
        'Ultra-pure HPLC, LC-MS, Spectrophotometric, and Analytical Reagent (AR) grade compounds engineered for bench-scale R&D, environmental testing, and critical pharmaceutical QA/QC testing environments.',
      icon: Microscope,
      accentColor: 'text-emerald-600',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-200 hover:border-emerald-500',
      badge: 'AR & LC-MS Matrix',
      highlights: ['Sub-ppb Trace Metals', 'Ultra-Low Baseline Drift', 'Titration & Buffer Standards', 'R&D Bench Kits Available'],
      href: '/catalog?category=reagents',
      sampleChemicals: 'Hydrochloric Acid 37% AR, Sulfuric Acid 98% AR, H2O2 30%, EDTA Disodium AR',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-mist/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Core Chemical Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Specialized Product Sectors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Engineered for South African pharmaceutical compounders, industrial formulators, analytical testing laboratories, and R&D chemists with immediate Gauteng dispatch.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`relative rounded-2xl bg-white p-7 border transition-all duration-300 shadow-cleanroom hover:shadow-cleanroom-lg flex flex-col justify-between group ${cat.borderColor}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`p-3.5 rounded-xl bg-slate-50 border border-slate-100 ${cat.accentColor} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-100 text-navy-900 border border-slate-200">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 mb-2 group-hover:text-teal-700 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 mb-3 leading-snug">
                    {cat.punchy}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-slate-100">
                    {cat.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-mono truncate max-w-xs">
                    <span className="font-semibold text-slate-700">Stock:</span> {cat.sampleChemicals}
                  </div>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100/80 px-3.5 py-2 rounded-lg transition-colors shrink-0"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
