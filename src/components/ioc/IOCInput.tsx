'use client';

import { useState } from 'react';
import { Scan, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { parseIOCs } from '@/lib/ioc-parser';
import { useReportStore } from '@/store/report-store';

export function IOCInput() {
  const [text, setText] = useState('');
  const { addIOCs, clearIOCs, currentReport } = useReportStore();

  const handleParse = () => {
    if (!text.trim()) return;
    const parsed = parseIOCs(text);
    addIOCs(parsed);
    setText('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700">
          Pegar IOCs (bulk)
        </label>
        <span className="text-[11px] text-slate-400">
          {currentReport.iocs.length} IOC{currentReport.iocs.length !== 1 ? 's' : ''} detectados
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Pega IPs, hashes, dominios, URLs o emails aqui...\n\nEjemplo:\n192.168.1.100\n44d88612fea8a8f36de82e1278abb02f\nmalicious-domain[.]com\nhxxps://evil[.]site/payload\nattacker@mail[.]ru`}
        className="w-full px-4 py-3 text-sm font-mono text-slate-800 bg-white border border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400
          transition-all resize-y min-h-[160px]"
      />
      <div className="flex gap-2">
        <Button onClick={handleParse} size="sm">
          <Scan className="w-3.5 h-3.5" />
          Detectar IOCs
        </Button>
        {currentReport.iocs.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearIOCs} className="text-red-500">
            <Trash2 className="w-3.5 h-3.5" />
            Limpiar todos
          </Button>
        )}
      </div>
    </div>
  );
}
