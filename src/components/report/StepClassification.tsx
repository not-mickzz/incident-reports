'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { Badge, MitreBadge } from '@/components/ui/Badge';
import { useReportStore } from '@/store/report-store';
import { TAXONOMIES, TAXONOMY_CATEGORIES } from '@/data/taxonomies';
import { SEVERITY_LIST, SEVERITIES } from '@/data/severity';
import { TLP_LIST, TLP_LEVELS } from '@/data/tlp';

export function StepClassification() {
  const { currentReport, setTaxonomy, setSeverity, setTLP } = useReportStore();
  const { classification } = currentReport;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filtered = TAXONOMIES.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.mitreTechniques.some((m) => m.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Clasificación del Incidente</h3>
        <p className="text-xs text-slate-500">Selecciona la taxonomía, severidad y TLP</p>
      </div>

      {/* Taxonomy selector */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700">Taxonomía del Incidente</label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, codigo o técnica MITRE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorias</option>
            {TAXONOMY_CATEGORIES.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.code} - {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
          {filtered.map((tax) => {
            const isSelected = classification.taxonomy?.code === tax.code;
            return (
              <button
                key={tax.code}
                onClick={() => setTaxonomy(tax)}
                className={`w-full text-left px-4 py-3 transition-all hover:bg-blue-50 ${
                  isSelected ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-700">{tax.code}</span>
                  <span className="text-sm font-semibold text-slate-800">{tax.name}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {tax.mitreTechniques.map((t) => (
                    <MitreBadge key={t} technique={t} />
                  ))}
                  <Badge
                    variant={
                      tax.impact === 'crítico' ? 'red'
                      : tax.impact === 'alto' ? 'amber'
                      : tax.impact === 'medio' ? 'cyan'
                      : 'emerald'
                    }
                  >
                    {SEVERITIES[tax.impact].label}
                  </Badge>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-slate-400">
              No se encontraron taxonomías
            </div>
          )}
        </div>
      </div>

      {/* Selected taxonomy detail */}
      {classification.taxonomy && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-blue-800">Taxonomía seleccionada:</p>
          <p className="text-sm font-bold text-slate-900">
            {classification.taxonomy.code} - {classification.taxonomy.name}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-bold text-slate-600">NIST-CSF:</span>{' '}
              <span className="text-slate-800">{classification.taxonomy.nistFunction}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">ISO 27002:</span>{' '}
              <span className="text-slate-800">{classification.taxonomy.isoControls}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">CIS Top 18:</span>{' '}
              <span className="text-slate-800">{classification.taxonomy.cisControls}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">SCF:</span>{' '}
              <span className="text-slate-800">{classification.taxonomy.scfDomains}</span>
            </div>
          </div>
        </div>
      )}

      {/* Severity and TLP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Severidad"
          id="severity"
          value={classification.severity}
          onChange={(e) => setSeverity(e.target.value as typeof classification.severity)}
          options={SEVERITY_LIST.map((s) => ({
            value: s,
            label: SEVERITIES[s].label,
          }))}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-700">Traffic Light Protocol (TLP)</label>
          <div className="flex gap-2 flex-wrap">
            {TLP_LIST.map((level) => {
              const tlp = TLP_LEVELS[level];
              const isSelected = classification.tlp === level;
              return (
                <button
                  key={level}
                  onClick={() => setTLP(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                    isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : 'border-slate-200'
                  }`}
                  style={{
                    backgroundColor: tlp.bgColor,
                    color: tlp.color,
                    borderColor: isSelected ? tlp.bgColor : undefined,
                  }}
                >
                  {tlp.label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {TLP_LEVELS[classification.tlp].description}
          </p>
        </div>
      </div>
    </div>
  );
}
