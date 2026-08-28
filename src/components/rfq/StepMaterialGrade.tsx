'use client';

import React, { useState } from 'react';
import { useRfq } from '@/context/RfqContext';
import { defaultProducts } from '@/data/defaultProducts';
import { RfqItem } from '@/types';
import {
  FlaskConical,
  Plus,
  Trash2,
  Package,
  Minus,
  AlertCircle,
  Search,
} from 'lucide-react';
import { Button } from '../ui/Button';

export function StepMaterialGrade({ onNext }: { onNext: () => void }) {
  const { items, addItem, removeItem, updateQuantity, updatePackaging, toggleSample } = useRfq();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = () => {
    if (!selectedProductId) return;
    const prod = defaultProducts.find((p) => p.id === selectedProductId);
    if (prod) {
      addItem(prod);
      setSelectedProductId('');
      setError('');
    }
  };

  const handleProceed = () => {
    if (items.length === 0) {
      setError('Please add at least one chemical or solvent to your RFQ docket before proceeding.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-950">
          Step 1: Chemical Selection, Grade & Order Volumes
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Specify your chemical name, required purity monograph, packaging formats (drums/IBCs), and estimated commercial quantities.
        </p>
      </div>

      {/* Add Product Dropdown Selector */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-navy-900 block">
          Add Chemical from South African Inventory:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-navy-950 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="">-- Select a fine chemical, solvent, API or reagent --</option>
            {defaultProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (CAS: {p.casNumber} • {p.grade})
              </option>
            ))}
          </select>
          <Button
            type="button"
            onClick={handleAddProduct}
            disabled={!selectedProductId}
            variant="primary"
            size="md"
            className="w-full sm:w-auto shrink-0 font-bold"
            icon={<Plus className="w-4 h-4" />}
          >
            Add to Docket
          </Button>
        </div>
      </div>

      {/* Configured Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Configured Materials in Inquiry ({items.length})
          </h3>
          <span className="text-[11px] text-teal-700 font-semibold">
            All prices quoted in ZAR (ex VAT)
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 space-y-2">
            <FlaskConical className="w-8 h-8 mx-auto stroke-1" />
            <p className="text-xs">No chemicals currently added. Select a material above or browse our catalog.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm hover:border-teal-400 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      CAS: {item.casNumber}
                    </span>
                    <h4 className="text-sm font-bold text-navy-950 mt-1">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-teal-700 font-medium mt-0.5">
                      Grade: {item.grade} • Target Purity: {item.purity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Packaging and Quantity Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      Required Packaging Format:
                    </label>
                    <input
                      type="text"
                      value={item.packagingFormat}
                      onChange={(e) => updatePackaging(item.productId, e.target.value)}
                      placeholder="e.g. 25L HDPE Drum, 200L Steel Drum, 1000L IBC"
                      className="w-full text-xs font-medium text-navy-950 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      Target Volume / Quantity ({item.unit}):
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, Math.max(1, Number(e.target.value)))}
                          className="w-16 text-center text-xs font-bold text-navy-950 bg-transparent focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600">{item.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Pre-Production Sample Checkbox */}
                <div className="pt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.requestSample}
                      onChange={() => toggleSample(item.productId)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-teal-600" />
                      <span>Include Trial Laboratory Sample Kit (Pre-Production)</span>
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={handleProceed}
          variant="primary"
          size="lg"
          className="font-bold"
        >
          Proceed to Logistics & SAHPRA Gate →
        </Button>
      </div>
    </div>
  );
}
