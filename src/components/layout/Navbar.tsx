'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRfq } from '@/context/RfqContext';
import {
  FlaskConical,
  FileCheck2,
  Package,
  Truck,
  ShieldAlert,
  ClipboardList,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useRfq();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/catalog', label: 'Chemical Catalog', icon: FlaskConical },
    { href: '/compliance', label: 'Instant COA / SDS Hub', icon: FileCheck2 },
    { href: '/samples', label: 'Sample Kit Program', icon: Package },
    { href: '/logistics', label: 'National Logistics', icon: Truck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-navy-950 flex items-center justify-center text-teal-400 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-md">
              <FlaskConical className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-navy-950 font-sans">
                  DB FINE
                </span>
                <span className="text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Chemicals
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase font-medium text-slate-500 font-mono">
                SAHPRA • SANS 10234 • RSA HUB
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-teal-700 font-semibold'
                      : 'text-navy-900 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: RFQ Cart Drawer & Request Instant Quote */}
          <div className="hidden sm:flex items-center gap-3">
            {/* RFQ Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 hover:border-navy-950 bg-slate-50 hover:bg-white text-navy-950 text-sm font-medium transition-all group"
              title="View RFQ Inquiry Cart"
            >
              <ClipboardList className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
              <span>RFQ Inquiry</span>
              {itemCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-white bg-teal-600 rounded-full animate-bounce">
                  {itemCount}
                </span>
              ) : (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-medium text-slate-500 bg-slate-200 rounded-full">
                  0
                </span>
              )}
            </button>

            {/* Instant Quote Button */}
            <Link href="/rfq">
              <Button variant="primary" size="md" className="font-semibold shadow-md">
                Request Instant Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu & Cart Triggers */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openDrawer}
              className="relative p-2.5 rounded-lg border border-slate-200 text-navy-950 hover:bg-slate-100"
              aria-label="Open RFQ cart"
            >
              <ClipboardList className="w-5 h-5 text-teal-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-navy-950 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                  isActive ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-navy-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 text-teal-600" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="primary" size="lg" className="w-full justify-center">
                Launch Multi-Step RFQ
              </Button>
            </Link>
            <Link
              href="/samples"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" size="md" className="w-full justify-center">
                Request Lab Formulation Sample Kit
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
