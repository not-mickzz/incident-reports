'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge, MitreBadge } from '@/components/ui/Badge';
import { TAXONOMIES, TAXONOMY_CATEGORIES } from '@/data/taxonomies';
import { BIBLIOTECA } from '@/data/biblioteca';
import { SEVERITIES } from '@/data/severity';

export default function BibliotecaPage() {
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

  const hasDetailedEntry = (code: string) => BIBLIOTECA.some((b) => b.code === code);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight mb-3">
          Biblioteca de Incidentes de Seguridad
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          Referencia completa de tipos de incidentes con explicaciones técnicas profundas,
          ejemplos reales (CVEs, breaches), mapeo a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, codigo, técnica MITRE (ej: T1190, SQL injection, phishing)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[250px]"
        >
          <option value="">Todas las categorias ({filtered.length})</option>
          {TAXONOMY_CATEGORIES.map((cat) => (
            <option key={cat.code} value={cat.code}>
              {cat.code} - {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category legend */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Badge variant="red">A - Acceso / Explotación / Inyección</Badge>
        <Badge variant="amber">B - Fuga de Información</Badge>
        <Badge variant="cyan">C - Disponibilidad / Abuso de Recursos</Badge>
        <Badge variant="purple">D - Integridad / Alteración</Badge>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tax) => {
          const severity = SEVERITIES[tax.impact];
          const hasDetail = hasDetailedEntry(tax.code);
          const categoryLetter = tax.code.charAt(0);
          const categoryColor =
            categoryLetter === 'A' ? 'from-red-500 to-red-700'
            : categoryLetter === 'B' ? 'from-amber-500 to-amber-700'
            : categoryLetter === 'C' ? 'from-cyan-500 to-cyan-700'
            : 'from-violet-500 to-violet-700';

          return (
            <Link key={tax.code} href={`/biblioteca/${tax.code}`}>
              <Card hover className="h-full">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColor} flex items-center justify-center text-white font-mono font-black text-[11px] shrink-0`}>
                    {tax.code.split('.').slice(0, 2).join('.')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-blue-700">{tax.code}</span>
                      <Badge
                        variant={
                          tax.impact === 'crítico' ? 'red'
                          : tax.impact === 'alto' ? 'amber'
                          : tax.impact === 'medio' ? 'cyan'
                          : 'emerald'
                        }
                      >
                        {severity.label}
                      </Badge>
                      {hasDetail && (
                        <Badge variant="blue">Detalle completo</Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5 line-clamp-2">
                      {tax.name}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      {tax.mitreTechniques.map((t) => (
                        <MitreBadge key={t} technique={t} />
                      ))}
                    </div>
                    <div className="flex gap-3 text-[10px] text-slate-400">
                      <span className="font-mono">{tax.nistFunction}</span>
                      <span>ISO: {tax.isoControls.split(',')[0]}</span>
                      <span>CIS: {tax.cisControls.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No se encontraron incidentes con esos criterios</p>
        </div>
      )}
    </div>
  );
}
