import React from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  FileCheck2,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Award,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900">
      {/* Top Banner: Emergency & Dangerous Goods Support */}
      <div className="bg-navy-900/90 border-b border-navy-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>South Africa Dangerous Goods & Chemical Safety Hotline (24/7):</span>
            <strong className="text-white font-mono">0861 555 777</strong>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>SANS 10234 Conformance</span>
            <span>•</span>
            <span>SAHPRA Licensed Facility</span>
            <span>•</span>
            <span>ISO 9001:2015 Standards</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Authority (2 cols wide on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <FlaskConical className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  DB FINE
                </span>
                <span className="ml-2 text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-500/30">
                  Chemicals
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              DB Fine Chemicals (Pty) Ltd is South Africa’s premier importer, blender, and distributor of high-purity fine chemicals, specialty industrial solvents, active pharmaceutical ingredients (APIs), and laboratory reagents.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>SAHPRA Lic. No. 00002241/C</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-800">
                <Award className="w-4 h-4 text-teal-400 shrink-0" />
                <span>ISO 9001:2015 Aligned</span>
              </div>
            </div>
          </div>

          {/* Column 2: Chemical Catalog */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Chemical Catalog
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/catalog?category=fine-chemicals" className="hover:text-teal-400 transition-colors">
                  High-Purity Fine Chemicals
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=solvents" className="hover:text-teal-400 transition-colors">
                  Specialty Solvents & Blends
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=api" className="hover:text-teal-400 transition-colors">
                  Pharma APIs & Excipients
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=reagents" className="hover:text-teal-400 transition-colors">
                  HPLC & Analytical Reagents
                </Link>
              </li>
              <li>
                <Link href="/catalog?grade=USP/BP/EP" className="hover:text-teal-400 transition-colors">
                  USP/BP Monograph Grade
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Compliance & Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/compliance" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Instant Batch COA Lookup</span>
                </Link>
              </li>
              <li>
                <Link href="/compliance#sds" className="hover:text-teal-400 transition-colors">
                  SANS 10234 SDS Library
                </Link>
              </li>
              <li>
                <Link href="/samples" className="hover:text-teal-400 transition-colors">
                  R&D Formulation Sample Kits
                </Link>
              </li>
              <li>
                <Link href="/rfq" className="hover:text-teal-400 transition-colors">
                  B2B Quote Request Engine
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Nationwide Freight Matrix</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Gauteng Central Hub & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Gauteng Distribution Hub
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  12 Refinery Road, Driehoek, Germiston, Gauteng, 1401, South Africa
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+27118241500" className="hover:text-white transition-colors">
                  +27 (0)11 824 1500
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:quotes@dbfine.co.za" className="hover:text-white transition-colors">
                  quotes@dbfine.co.za
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon – Fri: 07:30 – 16:30 SAST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Regulatory disclaimer */}
        <div className="mt-12 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DB Fine Chemicals (Pty) Ltd. All rights reserved. Reg No. 1998/014238/07.</p>
          <div className="flex items-center gap-4">
            <Link href="/compliance#sahpra" className="hover:text-slate-300 transition-colors">
              SAHPRA Section 22C
            </Link>
            <span>•</span>
            <Link href="/compliance#ghs" className="hover:text-slate-300 transition-colors">
              GHS / SANS 10234
            </Link>
            <span>•</span>
            <Link href="/logistics" className="hover:text-slate-300 transition-colors">
              Nationwide Delivery SLAs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
