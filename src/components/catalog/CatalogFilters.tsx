'use client';

import React from 'react';
import { ProductCategory, ChemicalGrade } from '@/types';
import { Search, Filter, X, LayoutGrid, List } from 'lucide-react';

interface CatalogFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  grade: string;
  setGrade: (val: string) => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  totalCount: number;
}

export function CatalogFilters({
  search,
  setSearch,
  category,
  setCategory,
  grade,
  setGrade,
  viewMode,
  setViewMode,
  inStockOnly,
  setInStockOnly,
  totalCount,
}: CatalogFiltersProps) {
  const categories = [
    { id: 'all', label: 'All Sectors' },
    { id: 'fine-chemicals', label: 'Fine Chemicals' },
    { id: 'solvents', label: 'Specialty Solvents' },
    { id: 'api', label: 'Pharma APIs' },
    { id: 'reagents', label: 'Lab Reagents' },
  ];

  const grades: { id: string; label: string }[] = [
    { id: 'all', label: 'All Grades' },
    { id: 'USP/BP/EP', label: 'USP / BP / EP' },
    { id: 'HPLC', label: 'HPLC Grade' },
    { id: 'LC-MS', label: 'LC-MS Grade' },
    { id: 'AR (Analytical Reagent)', label: 'AR Grade' },
  ];

  const hasActiveFilters = search || category !== 'all' || grade !== 'all' || inStockOnly;

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setGrade('all');
    setInStockOnly(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-cleanroom space-y-4 mb-8">
      {/* Top row: Search input & View switchers */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 24+ chemicals by Name, CAS (e.g. 67-63-0), Molecular formula..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-navy-950 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Switcher & Result count */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs font-bold text-slate-500 font-mono">
            {totalCount} {totalCount === 1 ? 'Product Found' : 'Products Found'}
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-navy-950'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-navy-950'
              }`}
              title="Specification Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat.id
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grade Selector & Checkboxes */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
            Purity Grade:
          </span>
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => setGrade(g.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                grade === g.id
                  ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none font-medium">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
            />
            <span>Gauteng Stock Only</span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
