'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Search,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { defaultComplianceDocs } from '@/data/defaultComplianceDocs';
import { ComplianceDocument } from '@/types';
import { Button } from '../ui/Button';

export function QuickComplianceSearch() {
  const [query, setQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<ComplianceDocument | null>(null);

  const filteredDocs = query.trim()
    ? defaultComplianceDocs.filter(
        (d) =>
          d.batchNumber.toLowerCase().includes(query.toLowerCase()) ||
          d.casNumber.includes(query) ||
          d.productName.toLowerCase().includes(query.toLowerCase())
      )
    : defaultComplianceDocs.slice(0, 3);

  return (
    <section className="py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4 text-teal-400" />
              <span>Cloudflare R2 Edge Powered Compliance Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Instant Regulatory Compliance: Direct Batch COA & SDS Retrieval
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Eliminate 48-hour email waiting cycles. Enter your production batch identifier or CAS registry number below to immediately pull authenticated Certificates of Analysis and GHS / SANS 10234-compliant Safety Data Sheets directly from our edge repository.
            </p>

            {/* Search Input Widget */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border-2 border-teal-400/40 focus-within:border-teal-400">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Batch No (e.g. DBF-IPA-2608A) or CAS No (e.g. 67-63-0)..."
                  className="w-full pl-3 pr-3 py-3 text-sm text-navy-950 placeholder-slate-400 bg-transparent focus:outline-none font-mono"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 mr-3 px-2 py-1"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
                <span>Sample Batches:</span>
                <button
                  onClick={() => setQuery('DBF-IPA-2608A')}
                  className="underline hover:text-teal-300 font-mono"
                >
                  DBF-IPA-2608A
                </button>
                <span>•</span>
                <button
                  onClick={() => setQuery('DBF-ASC-2601B')}
                  className="underline hover:text-teal-300 font-mono"
                >
                  DBF-ASC-2601B
                </button>
                <span>•</span>
                <button
                  onClick={() => setQuery('DBF-PARA-2604P')}
                  className="underline hover:text-teal-300 font-mono"
                >
                  DBF-PARA-2604P
                </button>
              </div>
            </div>
          </div>

          {/* Results Cards List */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {filteredDocs.length === 0 ? (
              <div className="bg-navy-900/60 border border-navy-800 rounded-xl p-6 text-center text-slate-400 text-sm">
                No matching batch certificates found for &quot;{query}&quot;. Try searching by CAS Number (e.g. <span className="font-mono text-teal-400">67-63-0</span>) or visit our full compliance hub.
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-navy-900/80 hover:bg-navy-900 border border-navy-800 hover:border-teal-500/40 rounded-xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-300 shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {doc.docType}
                        </span>
                        <span className="text-xs font-mono text-slate-300 font-semibold">
                          Batch: {doc.batchNumber}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          CAS: {doc.casNumber}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Issued: {doc.issueDate} {doc.expiryDate ? `• Retest: ${doc.expiryDate}` : ''} • Size: {doc.fileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <Link
                      href={`/compliance?batch=${encodeURIComponent(doc.batchNumber)}`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full sm:w-auto text-xs font-bold bg-teal-500 hover:bg-teal-600"
                        icon={<Download className="w-3.5 h-3.5" />}
                      >
                        Download Dossier (PDF)
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Full Hub Link */}
          <div className="text-center pt-6">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Explore All Batch Records & SANS 10234 Documents</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
