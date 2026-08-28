'use client';

import React from 'react';
import { RfqSubmission, RfqItem } from '@/types';
import {
  FlaskConical,
  Package,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface StepSampleReviewProps {
  formData: Partial<RfqSubmission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<RfqSubmission>>>;
  items: RfqItem[];
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export function StepSampleReview({
  formData,
  setFormData,
  items,
  onSubmit,
  onPrev,
  isSubmitting,
}: StepSampleReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-950">
          Step 3: Sample Toggle & Instant Submission
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review your RFQ summary, specify formulation testing sample preferences, and generate your quote docket.
        </p>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Destination Summary */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-navy-950 font-bold uppercase tracking-wider text-[11px]">
            <Truck className="w-4 h-4 text-teal-600" />
            <span>Delivery Destination (South Africa)</span>
          </div>
          <p className="font-bold text-navy-950 text-sm">{formData.companyName}</p>
          <p className="text-slate-600">Contact: {formData.contactName} ({formData.email} • {formData.phone})</p>
          <p className="text-slate-600">Destination: {formData.deliveryAddress}, {formData.city}, {formData.province}</p>
          {formData.sahpraLicenseNumber && (
            <p className="text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200">
              SAHPRA Lic: {formData.sahpraLicenseNumber}
            </p>
          )}
        </div>

        {/* Dispatch & SLA Summary */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-navy-950 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Dispatch & Compliance Guarantees</span>
          </div>
          <p className="text-slate-700 font-medium">
            • Stock Reserve: <strong className="text-navy-950">Johannesburg Central Hub</strong>
          </p>
          <p className="text-slate-700 font-medium">
            • Fulfillment SLA: <strong className="text-teal-700">24–48 Hours Nationwide</strong>
          </p>
          <p className="text-slate-700 font-medium">
            • Documentation: <strong className="text-navy-950">Authenticated Batch COA & SANS 10234 SDS</strong>
          </p>
        </div>
      </div>

      {/* Items Summary Table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-navy-950 text-white p-3.5 px-4 font-mono uppercase text-xs font-bold flex items-center justify-between">
          <span>Chemical Consignment Items ({items.length})</span>
          <span className="text-[11px] text-teal-400">Purity & Monograph Guaranteed</span>
        </div>
        <div className="divide-y divide-slate-200 bg-white">
          {items.map((item) => (
            <div key={item.productId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">
                    CAS: {item.casNumber}
                  </span>
                  <span className="font-bold text-navy-950 text-sm">{item.productName}</span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Grade: {item.grade} • Target Purity: {item.purity}
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                <span className="font-bold text-navy-950 text-sm block">
                  {item.quantity} {item.unit}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Format: {item.packagingFormat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Production Physical Sample Program Toggle */}
      <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.includeSampleKit || false}
            onChange={(e) => setFormData({ ...formData, includeSampleKit: e.target.checked })}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-5 w-5 mt-0.5"
          />
          <div>
            <span className="text-sm font-bold text-navy-950 block">
              Dispatch Pre-Production Formulation Testing Sample Kit (Complimentary)
            </span>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Check this box to dispatch a small-volume testing sample kit (100ml / 100g) to your QA/R&D lab ahead of bulk consignment for pre-formulation stability testing.
            </p>
          </div>
        </label>

        {formData.includeSampleKit && (
          <div className="pt-3 border-t border-teal-500/20">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Formulation Application / Test Objectives:
            </label>
            <textarea
              rows={2}
              value={formData.sampleKitDetails || ''}
              onChange={(e) => setFormData({ ...formData, sampleKitDetails: e.target.value })}
              placeholder="e.g. For HPLC mobile phase baseline calibration / trial syrup compounding stability..."
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-navy-950 placeholder-slate-400 focus:border-teal-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Special Handling / Notes */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
          Special Handling, COA Specifications or Packaging Notes:
        </label>
        <textarea
          rows={3}
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="e.g. Require batch COA with specific endotoxin assay under 0.05 EU/ml; delivery to loading bay 3 with tailgate truck."
          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs text-navy-950 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      {/* Submission Actions */}
      <div className="pt-4 flex items-center justify-between">
        <Button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          variant="outline"
          size="md"
          className="font-bold"
        >
          ← Back to Logistics
        </Button>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="font-bold text-base bg-teal-600 hover:bg-teal-700 shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Official RFQ Docket...</span>
            </span>
          ) : (
            <span>Generate Instant Quote & Request Dispatch →</span>
          )}
        </Button>
      </div>
    </div>
  );
}
