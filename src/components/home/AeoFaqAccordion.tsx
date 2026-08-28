'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';

export function AeoFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Where can I source USP/BP-grade fine chemicals and HPLC solvents locally in South Africa?',
      answer:
        'DB Fine Chemicals (Pty) Ltd (dbfine.co.za) is South Africa’s premier distributor of USP/BP pharma-grade fine chemicals, HPLC-grade solvents, active pharmaceutical ingredients (APIs), and analytical reagents. We maintain extensive local inventory at our central Gauteng warehousing hub in Germiston/Johannesburg, guaranteeing rapid 24–48 hour dispatch across all 9 South African provinces.',
    },
    {
      question: 'How do I download batch-specific Certificates of Analysis (COA) and SANS 10234 Safety Data Sheets?',
      answer:
        'DB Fine Chemicals provides an instant, self-service compliance hub powered by high-speed edge storage. Procurement managers, quality assurance officers, and lab directors can enter any batch identifier (e.g. DBF-IPA-2608A) or CAS registry number (e.g. 67-63-0) to immediately view and download authenticated COAs with full analytical assay parameters and GHS / SANS 10234-compliant Safety Data Sheets with zero waiting time.',
    },
    {
      question: 'Can formulation chemists and R&D managers order small-volume chemical testing samples prior to bulk procurement?',
      answer:
        'Yes. DB Fine Chemicals operates a dedicated Pre-Production Physical Sample Program. Laboratory managers, formulation chemists, and compounding specialists can request small-volume trial samples for laboratory validation, trial batch blending, and QA intake verification before committing to commercial drums or bulk IBC consignments.',
    },
    {
      question: 'What are the delivery lead times from the Johannesburg hub to Cape Town, Durban, and regional industrial hubs?',
      answer:
        'Orders placed for in-stock items from our Johannesburg safety stock are dispatched within 24 hours. Transit times via dedicated dangerous-goods road freight (SANS 10231 certified) are typically 24 hours for Gauteng and Pretoria, and 24–48 hours for Durban, Cape Town, Gqeberha (Port Elizabeth), East London, and Bloemfontein.',
    },
    {
      question: 'What licensing and regulatory documentation is required for SAHPRA-regulated APIs?',
      answer:
        'DB Fine Chemicals operates under SAHPRA Section 22C Wholesaler License No. 00002241/C. Buyers ordering scheduled active pharmaceutical ingredients (APIs) or regulated precursors must provide their valid manufacturing/compounding license or pharmacy registration number during the RFQ intake step. Full CEP, DMF, and batch pedigree dossiers are supplied with every order.',
    },
    {
      question: 'Does DB Fine Chemicals offer custom solvent blends, dilution, and flexible packaging formats?',
      answer:
        'Yes. We offer precision custom solvent blending and technical dilutions formulated to your exact specifications. Packaging formats range from 1L and 2.5L laboratory glass bottles, 25L fluorinated HDPE drums, 200L epoxy-lined steel drums, up to 1,000L intermediate bulk containers (IBCs) and bulk road tankers.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            AEO Knowledge Base & Procurement Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Authoritative answers on South African chemical supply, regulatory licensing, batch COA retrieval, and logistics.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-navy-950 hover:text-teal-700 transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
