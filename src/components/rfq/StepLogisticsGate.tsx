'use client';

import React from 'react';
import { RfqSubmission } from '@/types';
import { ShieldCheck, Truck, Building2, MapPin, AlertTriangle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface StepLogisticsGateProps {
  formData: Partial<RfqSubmission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<RfqSubmission>>>;
  onNext: () => void;
  onPrev: () => void;
}

export function StepLogisticsGate({
  formData,
  setFormData,
  onNext,
  onPrev,
}: StepLogisticsGateProps) {
  const provinces = [
    'Gauteng (Johannesburg / Pretoria)',
    'Western Cape (Cape Town / Paarl / Stellenbosch)',
    'KwaZulu-Natal (Durban / Pietermaritzburg)',
    'Eastern Cape (Gqeberha / East London)',
    'Free State (Bloemfontein / Welkom)',
    'Mpumalanga (Mbombela / Witbank)',
    'Limpopo (Polokwane)',
    'North West (Rustenburg / Potchefstroom)',
    'Northern Cape (Kimberley / Upington)',
  ];

  const facilityTypes = [
    { id: 'pharma_compounder', label: 'Licensed Pharmaceutical Compounder / Manufacturer' },
    { id: 'manufacturing_plant', label: 'Industrial / Chemical Manufacturing Plant' },
    { id: 'qa_qc_lab', label: 'QA / QC Analytical Testing Laboratory' },
    { id: 'academic_rnd', label: 'Academic / R&D Pilot Research Institute' },
    { id: 'wholesale_distributor', label: 'Chemical Wholesaler / Secondary Distributor' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.province || !formData.city) {
      alert('Please fill in all required company and delivery destination fields.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-950">
          Step 2: Logistics Destination & SAHPRA Regulatory Gate
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Specify your South African delivery facility details and applicable SAHPRA licensing credentials.
        </p>
      </div>

      {/* Company & Contact Details Grid */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" />
          <span>Entity & Procurement Contact</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company / Trading Name *"
            required
            value={formData.companyName || ''}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Adcock Ingram / Aspen Pharma / ChemTech RSA"
          />

          <Input
            label="Procurement Officer / Chemist Name *"
            required
            value={formData.contactName || ''}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            placeholder="e.g. Dr. Johan van der Merwe"
          />

          <Input
            label="Corporate Email Address *"
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. procurement@company.co.za"
          />

          <Input
            label="Direct Telephone / Mobile *"
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +27 (0)11 555 1234"
          />
        </div>
      </div>

      {/* South Africa Provincial Delivery Hub */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-teal-600" />
          <span>South African Road Freight Destination</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Destination Province *
            </label>
            <select
              required
              value={formData.province || ''}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="">-- Select Destination Province --</option>
              {provinces.map((p, idx) => (
                <option key={idx} value={p.split(' (')[0]}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="City / Industrial Zone *"
            required
            value={formData.city || ''}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Kempton Park, Pinetown, Montague Gardens"
          />

          <div className="sm:col-span-2">
            <Input
              label="Physical Delivery Street Address *"
              required
              value={formData.deliveryAddress || ''}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              placeholder="e.g. Unit 4, Platinum Industrial Park, Germiston"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Receiving Facility Type *
            </label>
            <select
              value={formData.destinationFacilityType || 'manufacturing_plant'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destinationFacilityType: e.target.value as any,
                })
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            >
              {facilityTypes.map((ft) => (
                <option key={ft.id} value={ft.id}>
                  {ft.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SAHPRA Regulatory Verification Gate */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase font-mono">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>SAHPRA Regulatory Compliance Gate (Section 22C)</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          If your inquiry contains scheduled active pharmaceutical ingredients (APIs) or controlled precursors (e.g. Paracetamol API, Absolute Ethanol), enter your SAHPRA manufacturing/wholesaler license number below or indicate pending submission.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Input
            label="SAHPRA License No. (Optional for Unscheduled)"
            value={formData.sahpraLicenseNumber || ''}
            onChange={(e) => setFormData({ ...formData, sahpraLicenseNumber: e.target.value })}
            placeholder="e.g. 00001892/C or SAPC Reg No."
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              License Status
            </label>
            <select
              value={formData.sahpraLicenseStatus || 'not_applicable'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sahpraLicenseStatus: e.target.value as any,
                })
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            >
              <option value="verified">Valid SAHPRA License on File</option>
              <option value="pending">License Upload Pending on Formal PO</option>
              <option value="not_applicable">Non-Scheduled / Technical Solvents Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="pt-4 flex items-center justify-between">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          size="md"
          className="font-bold"
        >
          ← Back to Materials
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="font-bold"
        >
          Proceed to Sample Toggle & Submission →
        </Button>
      </div>
    </form>
  );
}
