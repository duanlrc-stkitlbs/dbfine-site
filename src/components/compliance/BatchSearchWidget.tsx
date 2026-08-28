'use client';

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

interface BatchSearchWidgetProps {
  query: string;
  setQuery: (val: string) => void;
  docType: string;
  setDocType: (val: string) => void;
  totalCount: number;
}

export function BatchSearchWidget({
  query,
  setQuery,
  docType,
  setDocType,
  totalCount,
}: BatchSearchWidgetProps) {
  const docTypes = [
    { id: 'ALL', label: 'All Documents' },
    { id: 'COA', label: 'Certificates of Analysis (COA)' },
    { id: 'SDS', label: 'SANS 10234 Safety Data Sheets (SDS)' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-cleanroom space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Batch Identifier (e.g. DBF-IPA-2608A), CAS No (67-63-0), or Chemical..."
            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-navy-950 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Count */}
        <span className="text-xs font-mono font-bold text-slate-500 shrink-0">
          {totalCount} {totalCount === 1 ? 'Record Found' : 'Records Found'}
        </span>
      </div>

      {/* Doc type pills */}
      <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
        {docTypes.map((dt) => (
          <button
            key={dt.id}
            onClick={() => setDocType(dt.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              docType === dt.id
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {dt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
