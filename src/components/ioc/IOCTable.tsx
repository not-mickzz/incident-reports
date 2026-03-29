'use client';

import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { useReportStore } from '@/store/report-store';
import { IOC_TYPE_LABELS, IOC_TYPE_COLORS } from '@/lib/ioc-parser';
import type { IOCType } from '@/types';

export function IOCTable() {
  const { currentReport, removeIOC } = useReportStore();
  const { iocs } = currentReport;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (iocs.length === 0) return null;

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const typeCounts = iocs.reduce<Record<string, number>>((acc, ioc) => {
    acc[ioc.type] = (acc[ioc.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(typeCounts).map(([type, count]) => (
          <Badge key={type} variant={IOC_TYPE_COLORS[type as IOCType] as 'blue' | 'purple' | 'cyan' | 'amber' | 'emerald'}>
            {IOC_TYPE_LABELS[type as IOCType]}: {count}
          </Badge>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <th className="px-3 py-3 font-bold text-[11px]">Tipo</th>
              <th className="px-3 py-3 font-bold text-[11px]">Valor Original</th>
              <th className="px-3 py-3 font-bold text-[11px]">Defanged</th>
              <th className="px-3 py-3 font-bold text-[11px] w-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {iocs.map((ioc, idx) => (
              <tr
                key={ioc.id}
                className={`border-t border-slate-100 hover:bg-blue-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="px-3 py-2.5">
                  <Badge variant={IOC_TYPE_COLORS[ioc.type] as 'blue' | 'purple' | 'cyan' | 'amber' | 'emerald'}>
                    {IOC_TYPE_LABELS[ioc.type]}
                  </Badge>
                </td>
                <td className="px-3 py-2.5 font-mono text-blue-700 font-semibold break-all">
                  {ioc.value}
                </td>
                <td className="px-3 py-2.5 font-mono text-slate-500 break-all">
                  {ioc.defanged}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(ioc.defanged, ioc.id)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                      title="Copiar defanged"
                    >
                      {copiedId === ioc.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => removeIOC(ioc.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Eliminar"
                    >
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
