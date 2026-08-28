import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { defaultProducts } from '@/data/defaultProducts';
import { defaultComplianceDocs } from '@/data/defaultComplianceDocs';
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  FileCheck2,
  Package,
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/catalog/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return defaultProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = defaultProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const matchingDocs = defaultComplianceDocs.filter(
    (d) => d.productId === product.id || d.casNumber === product.casNumber
  );

  const relatedProducts = defaultProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-10 lg:py-14 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chemical Catalog</span>
          </Link>
        </div>

        {/* Product Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-cleanroom mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Info & Monographs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  CAS: {product.casNumber}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {product.grade}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  Assay: {product.purity}
                </span>
                {product.sahpraRegulated && (
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>{product.sahpraSchedule || 'SAHPRA Section 22C Regulated'}</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight font-sans">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                  Pharmacopeial & Technical Monograph
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {product.molecularFormula && (
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Formula</span>
                      <span className="font-bold font-mono text-navy-950">{product.molecularFormula}</span>
                    </div>
                  )}
                  {product.molecularWeight && (
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Mol Weight</span>
                      <span className="font-bold font-mono text-navy-950">{product.molecularWeight}</span>
                    </div>
                  )}
                  {product.assay && (
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Specific Assay</span>
                      <span className="font-bold font-mono text-teal-700">{product.assay}</span>
                    </div>
                  )}
                  {product.appearance && (
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-3">
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Appearance</span>
                      <span className="font-medium text-slate-800">{product.appearance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Applications */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Industrial & Pharmaceutical Applications:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Packaging, Logistics & Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Packaging Options Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <Package className="w-4 h-4 text-teal-600" />
                    <span>Packaging Formats</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 font-bold">
                    MOQ: {product.minOrderQty} {product.unit}
                  </span>
                </div>

                <div className="space-y-2">
                  {product.packagingOptions.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {pkg.size} {pkg.unit}
                        </span>
                        <span className="font-medium text-navy-950">{pkg.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">UN Sealed</span>
                    </div>
                  ))}
                </div>

                {/* Logistics Signals */}
                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>24–48h Dispatch from Johannesburg Central Hub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Local South African Safety Stock Guaranteed</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col gap-2.5">
                  <Link href={`/rfq?chemical=${encodeURIComponent(product.name)}&cas=${encodeURIComponent(product.casNumber)}`}>
                    <Button variant="primary" size="lg" className="w-full justify-center font-bold">
                      Request Formal Quote (RFQ)
                    </Button>
                  </Link>
                  <Link href={`/samples?chemical=${encodeURIComponent(product.name)}&cas=${encodeURIComponent(product.casNumber)}`}>
                    <Button variant="outline" size="md" className="w-full justify-center font-bold">
                      Request Pre-Production Lab Sample Kit
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Compliance Dossiers Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-teal-600" />
                  <span>Batch Compliance Documents</span>
                </h3>
                {matchingDocs.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Batch COAs and SANS 10234 SDS are generated automatically for this consignment upon dispatch.
                  </p>
                ) : (
                  matchingDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-navy-950 block">{doc.docType}: {doc.batchNumber}</span>
                        <span className="text-[11px] text-slate-500 font-mono">Issued {doc.issueDate}</span>
                      </div>
                      <Link href={`/compliance?batch=${encodeURIComponent(doc.batchNumber)}`}>
                        <Button variant="outline" size="sm" className="text-[11px] py-1 px-2.5 font-bold">
                          <Download className="w-3 h-3 mr-1" />
                          <span>PDF</span>
                        </Button>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy-950">
              Related Chemicals in this Sector
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
