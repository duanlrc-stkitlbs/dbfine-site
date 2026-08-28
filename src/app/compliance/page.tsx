'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { defaultComplianceDocs } from '@/data/defaultComplianceDocs';
import { ComplianceDocument } from '@/types';
import { BatchSearchWidget } from '@/components/compliance/BatchSearchWidget';
import { ComplianceDossierModal } from '@/components/compliance/ComplianceDossierModal';
import {
  FileCheck2,
  FileText,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ComplianceContent() {
  const searchParams = useSearchParams();
  const initialBatch = searchParams.get('batch') || '';

  const [query, setQuery] = useState(initialBatch);
  const [docType, setDocType] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState<ComplianceDocument | null>(null);

  // Filter documents
  const filteredDocs = useMemo(() => {
    return defaultComplianceDocs.filter((doc) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesBatch = doc.batchNumber.toLowerCase().includes(q);
        const matchesCas = doc.casNumber.includes(q);
        const matchesName = doc.productName.toLowerCase().includes(q);
        if (!matchesBatch && !matchesCas && !matchesName) {
          return false;
        }
      }

      if (docType !== 'ALL' && doc.docType !== docType) {
        return false;
      }

      return true;
    });
  }, [query, docType]);

  return (
    <div className="py-10 lg:py-14 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Cloudflare R2 Compliance Repository</span>
            <span>•</span>
            <span>Zero Egress Direct Serving</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            Instant Regulatory Compliance Hub
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Retrieve authenticated batch-specific Certificates of Analysis (COA) and SANS 10234 / GHS Safety Data Sheets (SDS) with sub-second response times. Verify pharmacopeial assay parameters, heavy metal limits, and batch release declarations.
          </p>
        </div>

        {/* Regulatory Accreditation Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-cleanroom">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-navy-950 block">SAHPRA Section 22C Wholesaler</span>
              <span className="text-[11px] font-mono text-slate-500">License No. 00002241/C</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-cleanroom">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-navy-950 block">SANS 10234 Dangerous Goods</span>
              <span className="text-[11px] font-mono text-slate-500">GHS Classification Conformance</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-cleanroom">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-navy-950 block">100% Batch Pedigree History</span>
              <span className="text-[11px] font-mono text-slate-500">Full CEP / DMF Dossiers</span>
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <BatchSearchWidget
          query={query}
          setQuery={setQuery}
          docType={docType}
          setDocType={setDocType}
          totalCount={filteredDocs.length}
        />

        {/* Results List */}
        <div className="space-y-4">
          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-cleanroom space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <FileCheck2 className="w-8 h-8 stroke-1" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">No Compliance Records Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Try searching by Batch Number (e.g. <span className="font-mono text-teal-600">DBF-IPA-2608A</span>) or CAS Registry Number (e.g. <span className="font-mono text-teal-600">67-63-0</span>).
                </p>
              </div>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-cleanroom hover:shadow-cleanroom-lg hover:border-teal-400 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-teal-700 shrink-0 mt-1">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {doc.docType}
                      </span>
                      <span className="text-xs font-mono font-bold text-navy-950">
                        Batch: {doc.batchNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        CAS: {doc.casNumber}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-navy-950">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Product: {doc.productName} • Issued: {doc.issueDate} {doc.expiryDate ? `• Retest: ${doc.expiryDate}` : ''} • Size: {doc.fileSize}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <Button
                    onClick={() => setSelectedDoc(doc)}
                    variant="outline"
                    size="sm"
                    className="font-bold text-xs border-slate-300"
                    icon={<Eye className="w-3.5 h-3.5" />}
                  >
                    View Dossier
                  </Button>
                  <Button
                    onClick={() => setSelectedDoc(doc)}
                    variant="primary"
                    size="sm"
                    className="font-bold text-xs bg-teal-600 hover:bg-teal-700"
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SAHPRA Section Reference */}
        <div id="sahpra" className="mt-14 p-8 rounded-3xl bg-navy-950 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>SAHPRA Regulatory Governance & Section 22C Licensing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            South African Health Products Regulatory Authority (SAHPRA) Compliance
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            DB Fine Chemicals (Pty) Ltd operates strictly in accordance with Section 22C of the Medicines and Related Substances Act, 1965 (Act 101 of 1965). All active pharmaceutical ingredients (APIs), scheduled substances, and regulated excipients are handled under verified cGMP conditions with unbroken temperature tracking, batch recall procedures, and verified customer license validation.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>Wholesaler License: <strong className="text-white font-mono">00002241/C</strong></span>
            <span>•</span>
            <span>Responsible Pharmacist on Duty</span>
            <span>•</span>
            <span>SARS Customs Bonded Warehouse</span>
          </div>
        </div>
      </div>

      {/* Dossier Modal */}
      {selectedDoc && (
        <ComplianceDossierModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}

export default function CompliancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2 text-teal-600 font-bold">
            <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Compliance Repository...</span>
          </div>
        </div>
      }
    >
      <ComplianceContent />
    </Suspense>
  );
}
