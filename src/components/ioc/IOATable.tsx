'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useReportStore } from '@/store/report-store';
import { IOA_TYPE_LABELS, IOA_TYPE_COLORS } from '@/lib/ioa-parser';
import type { IOAType } from '@/types';

export function IOATable() {
  const { currentReport, removeIOA } = useReportStore();
  const { ioas } = currentReport;

  if (ioas.length === 0) return null;

  const typeCounts = ioas.reduce<Record<string, number>>((acc, ioa) => {
    acc[ioa.type] = (acc[ioa.type] || 0) + 1;
    return acc;
  }, {});

  const colorMap: Record<string, 'red' | 'amber' | 'blue' | 'purple' | 'slate'> = {
    red: 'red', amber: 'amber', orange: 'amber', blue: 'blue', purple: 'purple', slate: 'slate',
  };

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(typeCounts).map(([type, count]) => {
          const color = IOA_TYPE_COLORS[type as IOAType];
          return (
            <Badge key={type} variant={colorMap[color] || 'slate'}>
              {IOA_TYPE_LABELS[type as IOAType]}: {count}
            </Badge>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-orange-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <th className="px-3 py-3 font-bold text-[11px] w-32">Tipo</th>
              <th className="px-3 py-3 font-bold text-[11px]">Indicador</th>
              <th className="px-3 py-3 font-bold text-[11px]">Contexto</th>
              <th className="px-3 py-3 font-bold text-[11px] w-12"></th>
            </tr>
          </thead>
          <tbody>
            {ioas.map((ioa, idx) => {
              const color = IOA_TYPE_COLORS[ioa.type];
              return (
                <tr
                  key={ioa.id}
                  className={`border-t border-orange-100 hover:bg-orange-50 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'
                  }`}
                >
                  <td className="px-3 py-2.5">
                    <Badge variant={colorMap[color] || 'slate'}>
                      {IOA_TYPE_LABELS[ioa.type]}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-orange-700 font-semibold break-all text-[11px]">
                    {ioa.value}
                  </td>
                  <td className="px-3 py-2.5 text-slate-600 text-[11px] leading-relaxed">
                    {ioa.context}
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      onClick={() => removeIOA(ioa.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Eliminar"
                    >
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
