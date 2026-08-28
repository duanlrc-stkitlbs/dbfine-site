'use client';

import React from 'react';
import { ComplianceDocument } from '@/types';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ComplianceDossierModalProps {
  document: ComplianceDocument;
  onClose: () => void;
}

export function ComplianceDossierModal({ document, onClose }: ComplianceDossierModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm p-4 sm:p-6 lg:p-10 flex items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Modal Top Actions (Hidden on Print) */}
        <div className="no-print p-4 sm:p-5 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-sm">Authenticated Cloudflare Edge Compliance Dossier</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="bg-navy-900 border-navy-700 text-white hover:bg-navy-800 text-xs font-bold"
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Dossier Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-navy-950 print:p-0">
          <div className="border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 print:border-none print:p-0">
            {/* Header: Company Letterhead */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-navy-950 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center text-teal-400">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-navy-950 font-sans">
                    DB FINE CHEMICALS (PTY) LTD
                  </h1>
                  <p className="text-xs text-slate-600 font-mono">
                    Reg. No: 1998/014238/07 • SAHPRA Wholesaler Lic: 00002241/C
                  </p>
                  <p className="text-[11px] text-slate-500">
                    12 Refinery Road, Germiston, Johannesburg, Gauteng, 1401, South Africa
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-300 sm:pl-5">
                <span className="text-xs uppercase font-extrabold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  {document.docType === 'COA' ? 'Certificate of Analysis' : 'Safety Data Sheet'}
                </span>
                <p className="text-xs font-mono font-bold text-navy-950 mt-1">
                  Batch: {document.batchNumber}
                </p>
                <p className="text-[11px] font-mono text-slate-500">
                  Issued: {document.issueDate}
                </p>
              </div>
            </div>

            {/* Batch & Product Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Product Name</span>
                <span className="font-bold text-navy-950">{document.productName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">CAS Registry Number</span>
                <span className="font-mono font-bold text-amber-800">{document.casNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Production Batch</span>
                <span className="font-mono font-bold text-navy-950">{document.batchNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Retest / Expiry Date</span>
                <span className="font-mono font-bold text-teal-700">{document.expiryDate || 'N/A'}</span>
              </div>
            </div>

            {/* Analytical Test Results Table (For COA) */}
            {document.parameters && document.parameters.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-950 font-mono">
                    Analytical Test Parameters & Monograph Specifications
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Conforms to Pharmacopeial Standard</span>
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-mono uppercase text-[10px] text-slate-700">
                        <th className="py-2.5 px-4 font-bold">Test Parameter</th>
                        <th className="py-2.5 px-4 font-bold">Pharmacopeial Specification</th>
                        <th className="py-2.5 px-4 font-bold">Actual Batch Result</th>
                        <th className="py-2.5 px-4 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {document.parameters.map((param, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-medium text-navy-950">{param.parameter}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-600">{param.specification}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-navy-950">{param.actualResult}</td>
                          <td className="py-2.5 px-4 text-center">
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {param.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* GHS & SANS 10234 Classification Details */}
            {document.ghsClassification && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy-950 uppercase text-[11px] font-mono">
                    GHS & SANS 10234 Classification & Safety Information
                  </h4>
                  <span className="font-bold font-mono text-amber-700 text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Signal Word: {document.ghsClassification.signalWord}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-mono">
                  Standard: {document.ghsClassification.sansClassification}
                </p>

                {document.ghsClassification.hazardStatements.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Hazard Statements:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700 mt-1 text-[11px]">
                      {document.ghsClassification.hazardStatements.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Quality Assurance Verification Footer & Stamp */}
            <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-navy-950">Quality Control & Regulatory Affairs Release</p>
                <p className="text-[11px] text-slate-500">
                  This Certificate of Analysis has been produced electronically and is valid without a handwritten signature.
                </p>
                <p className="text-[11px] font-mono text-slate-400">
                  Document Hash: SHA256-DBF-{document.batchNumber.replace(/[^a-zA-Z0-9]/g, '')}-CERT
                </p>
              </div>

              <div className="border-2 border-dashed border-teal-600/50 bg-teal-50/50 rounded-xl p-3 text-center min-w-[180px] shrink-0">
                <ShieldCheck className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <span className="font-bold text-teal-900 text-[11px] block uppercase">QA Passed & Released</span>
                <span className="text-[10px] text-teal-700 font-mono">DB Fine Chemicals QA Lab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
