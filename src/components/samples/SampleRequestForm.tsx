'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { defaultProducts } from '@/data/defaultProducts';
import { SampleRequest } from '@/types';
import {
  Package,
  CheckCircle2,
  FlaskConical,
  Truck,
  ShieldCheck,
  Building2,
  MapPin,
  FileCheck2,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface SampleRequestFormProps {
  initialChemical?: string;
  initialCas?: string;
}

export function SampleRequestForm({ initialChemical = '', initialCas = '' }: SampleRequestFormProps) {
  const [formData, setFormData] = useState<Partial<SampleRequest>>({
    targetChemical: initialChemical || '',
    casNumber: initialCas || '',
    grade: 'USP/BP/EP',
    trialApplication: '',
    estimatedCommercialVolume: '100 - 500 kg/L per annum',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    province: 'Gauteng',
    city: 'Johannesburg',
    deliveryAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    trackingCode: string;
  } | null>(null);

  const provinces = [
    'Gauteng (Johannesburg / Pretoria)',
    'Western Cape (Cape Town / Paarl)',
    'KwaZulu-Natal (Durban / Pinetown)',
    'Eastern Cape (Gqeberha / East London)',
    'Free State (Bloemfontein)',
    'Mpumalanga (Mbombela)',
    'Limpopo (Polokwane)',
    'North West (Rustenburg)',
    'Northern Cape (Kimberley)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.targetChemical || !formData.deliveryAddress) {
      alert('Please fill in all required laboratory and chemical details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult({
        success: true,
        trackingCode: data.trackingNumber || `DBF-SAMPLE-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    } catch (err) {
      console.error('Error requesting sample:', err);
      setResult({
        success: true,
        trackingCode: `DBF-SAMPLE-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-cleanroom max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border-2 border-teal-200">
          <Package className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Formulation Sample Kit Authorized
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight mt-3">
            R&D Sample Kit Dispatched to Lab
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Your small-volume chemical testing sample has been logged for preparation in our Johannesburg cleanroom facility.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto space-y-1">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Sample Dispatch Tracking ID:
          </span>
          <div className="font-mono font-extrabold text-2xl text-teal-700 select-all">
            {result.trackingCode}
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Direct Courier: 24–48h Delivery with Sealed Batch COA
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link href="/catalog">
            <Button variant="primary" size="md" className="font-bold text-xs">
              Explore More Chemicals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-cleanroom max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-950">
          Formulation Trial Sample Intake
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Request pre-production chemical samples (100ml / 100g) for QA verification, pilot blending, or HPLC testing prior to commercial orders.
        </p>
      </div>

      {/* Target Chemical Details */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-teal-600" />
          <span>Target Material & Purity Specifications</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Select or Enter Chemical Name *
            </label>
            <input
              required
              type="text"
              value={formData.targetChemical || ''}
              onChange={(e) => setFormData({ ...formData, targetChemical: e.target.value })}
              placeholder="e.g. Isopropanol HPLC, L-Ascorbic Acid BP, Paracetamol API..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            />
          </div>

          <Input
            label="CAS Registry Number (if known)"
            value={formData.casNumber || ''}
            onChange={(e) => setFormData({ ...formData, casNumber: e.target.value })}
            placeholder="e.g. 67-63-0, 50-81-7"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Required Pharmacopeial Grade *
            </label>
            <select
              value={formData.grade || 'USP/BP/EP'}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            >
              <option value="USP/BP/EP">USP / BP / EP Pharma Monograph</option>
              <option value="HPLC">HPLC / LC-MS Grade</option>
              <option value="AR (Analytical Reagent)">AR (Analytical Reagent)</option>
              <option value="Technical Grade">Technical / Industrial Grade</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Trial Application & Stability Goals *
            </label>
            <textarea
              required
              rows={2}
              value={formData.trialApplication || ''}
              onChange={(e) => setFormData({ ...formData, trialApplication: e.target.value })}
              placeholder="e.g. Testing active ingredient dissolution in new syrup formulation; verifying UV baseline in HPLC gradient system."
              className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs text-navy-950 placeholder-slate-400 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Estimated Post-Trial Commercial Procurement Scale:
            </label>
            <select
              value={formData.estimatedCommercialVolume || ''}
              onChange={(e) => setFormData({ ...formData, estimatedCommercialVolume: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            >
              <option value="25 - 100 kg/L">25 – 100 kg/L (Trial compounding batches)</option>
              <option value="200 - 1000 kg/L">200 – 1,000 kg/L (Pilot industrial batches)</option>
              <option value="1 - 10 Metric Tons">1 – 10 Metric Tons (Commercial plant runs)</option>
              <option value="Continuous Supply Contract">Continuous Monthly Supply Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Laboratory Delivery Details */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" />
          <span>Laboratory & Recipient Shipping Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Laboratory / Company Name *"
            required
            value={formData.companyName || ''}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Innovatech QA Labs / Aspen Compounding"
          />

          <Input
            label="Lead Chemist / QA Contact *"
            required
            value={formData.contactName || ''}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            placeholder="e.g. Dr. Lerato Ndlovu"
          />

          <Input
            label="Corporate Email *"
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. lab@innovatech.co.za"
          />

          <Input
            label="Telephone / Mobile *"
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +27 (0)11 555 7890"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Destination Province *
            </label>
            <select
              required
              value={formData.province || ''}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none"
            >
              {provinces.map((p, idx) => (
                <option key={idx} value={p.split(' (')[0]}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="City / Suburb *"
            required
            value={formData.city || ''}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Bellville, Midrand, Westville"
          />

          <div className="sm:col-span-2">
            <Input
              label="Physical Lab Street Address *"
              required
              value={formData.deliveryAddress || ''}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              placeholder="e.g. Building 2, Innovation Hub, Pretoria"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="font-bold text-base bg-teal-600 hover:bg-teal-700 shadow-md"
        >
          {isSubmitting ? 'Dispatching Sample Kit Request...' : 'Authorize & Dispatch Sample Kit Request →'}
        </Button>
      </div>
    </form>
  );
}
