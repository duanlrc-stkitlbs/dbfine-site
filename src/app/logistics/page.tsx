import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  MapPin,
  Clock,
  Package,
  Layers,
  ThermometerSnowflake,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LogisticsPage() {
  const provincialSlas = [
    {
      province: 'Gauteng',
      hubs: 'Johannesburg, Pretoria, Germiston, Kempton Park, Midrand, Vanderbijlpark',
      leadTime: 'Same-Day / 24 Hours',
      type: 'Local Dedicated Fleet & Ex-Warehouse Collection',
      badge: 'Immediate Dispatch',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      province: 'Western Cape',
      hubs: 'Cape Town, Montague Gardens, Paarl, Stellenbosch, Bellville, George',
      leadTime: '24–48 Hours',
      type: 'Express Hazchem Road Freight (N1 Corridor)',
      badge: 'Scheduled Daily',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      province: 'KwaZulu-Natal',
      hubs: 'Durban, Pinetown, Mobeni, Pietermaritzburg, Richards Bay',
      leadTime: '24–48 Hours',
      type: 'Express Hazchem Road Freight (N3 Corridor)',
      badge: 'Scheduled Daily',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      province: 'Eastern Cape',
      hubs: 'Gqeberha (Port Elizabeth), East London, Uitenhage',
      leadTime: '24–48 Hours',
      type: 'Dangerous Goods Road Transport (N2 / N10)',
      badge: 'Scheduled 3x Weekly',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      province: 'Free State',
      hubs: 'Bloemfontein, Welkom, Sasolburg',
      leadTime: '24–48 Hours',
      type: 'Direct Road Freight Delivery',
      badge: 'Scheduled Daily',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      province: 'Mpumalanga & Limpopo',
      hubs: 'Mbombela, Witbank (eMalahleni), Polokwane, Mokopane',
      leadTime: '24–48 Hours',
      type: 'Regional Dangerous Goods Transport',
      badge: 'Scheduled 3x Weekly',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    {
      province: 'North West & Northern Cape',
      hubs: 'Rustenburg, Potchefstroom, Kimberley, Upington',
      leadTime: '24–72 Hours',
      type: 'Mining & Regional Freight Logistics',
      badge: 'Scheduled 2x Weekly',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="py-10 lg:py-14 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider font-mono">
            <Truck className="w-3.5 h-3.5 text-teal-600" />
            <span>Johannesburg Safety Stock • SANS 10231 Certified Freight</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
            South Africa Nationwide Chemical Logistics Network
          </h1>
          <p className="text-sm text-slate-600">
            Operating from our central Gauteng warehousing and solvent blending facility in Germiston, DB Fine Chemicals delivers batch-traceable raw materials across all 9 provinces with guaranteed delivery SLAs.
          </p>
        </div>

        {/* Central Hub Details Card */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Primary Distribution Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Gauteng Central Chemical & API Warehouse
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our purpose-built facility incorporates temperature-controlled pharmaceutical cold storage, flammable solvent storage bunkers, and high-capacity stainless steel blending tanks conforming to major South African dangerous goods standards.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Location</span>
                  <span className="font-bold text-white">Germiston, JHB</span>
                </div>
                <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Cold Chain</span>
                  <span className="font-bold text-teal-300">2°C – 8°C & 15°C–25°C</span>
                </div>
                <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Dispatch SLA</span>
                  <span className="font-bold text-white">24h Turnaround</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-navy-900/90 rounded-2xl p-6 border border-navy-800 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Direct Warehouse Collections</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Approved commercial buyers and compounding pharmacists may collect directly ex-warehouse in Germiston.
                </p>
                <div className="mt-3 text-xs text-slate-300 font-mono space-y-1">
                  <p>Operating Hours:</p>
                  <p className="text-teal-400">Mon–Fri: 07:30 – 16:30 SAST</p>
                </div>
              </div>
              <Link href="/rfq">
                <Button variant="primary" size="md" className="w-full justify-center font-bold text-xs bg-teal-500 hover:bg-teal-600">
                  Submit Freight Quote Request
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Provincial SLAs Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy-950">
              Provincial Road Freight Delivery SLAs
            </h2>
            <span className="text-xs font-mono font-semibold text-slate-500">
              SANS 10231 Compliant Transport
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-cleanroom overflow-hidden divide-y divide-slate-200">
            {provincialSlas.map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-navy-950">{item.province}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Major Hubs: {item.hubs}
                  </p>
                  <p className="text-xs text-slate-600">
                    Mode: {item.type}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:text-right">
                  <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Guaranteed SLA</span>
                    <span className="text-sm font-extrabold text-teal-800 font-mono">{item.leadTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dangerous Goods & Cold Chain Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-cleanroom">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>SANS 10234 & 10231 Dangerous Goods Protocols</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All hazardous solvents (Class 3 Flammables, Class 8 Corrosives, Class 6.1 Toxics) are packaged in UN-certified packaging (drums, IBCs) with compliant Tremcards, placarding, and trained hazchem drivers across South African road networks.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-cleanroom">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
              <ThermometerSnowflake className="w-5 h-5 text-teal-600" />
              <span>Pharma Cold-Chain API Handling</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Temperature-sensitive APIs and reagents are packed in insulated shippers with calibrated data-loggers to guarantee validated 2°C–8°C or controlled room temperature (15°C–25°C) from our warehouse to your receiving bay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
