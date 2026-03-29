'use client';

import { useState } from 'react';
import { Radar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { parseIOAs } from '@/lib/ioa-parser';
import { useReportStore } from '@/store/report-store';

export function IOAInput() {
  const [text, setText] = useState('');
  const { addIOAs, clearIOAs, currentReport } = useReportStore();

  const handleParse = () => {
    if (!text.trim()) return;
    const parsed = parseIOAs(text);
    addIOAs(parsed);
    setText('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700">
          Pegar texto con IOAs (logs, comandos, rutas)
        </label>
        <span className="text-[11px] text-slate-400">
          {currentReport.ioas.length} IOA{currentReport.ioas.length !== 1 ? 's' : ''} detectados
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Pega logs, líneas de comando, rutas o descripciones de comportamiento...\n\nEjemplos:\npowershell.exe -enc SQBFAFgA...\nHKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\backdoor\nC:\\Users\\victim\\AppData\\Roaming\\svchost.exe\nEvent ID 4698 - Tarea programada creada\n\\.\\pipe\\meterpreter\nmimikatz.exe sekurlsa::logonpasswords`}
        className="w-full px-4 py-3 text-sm font-mono text-slate-800 bg-white border border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-slate-400
          transition-all resize-y min-h-[160px]"
      />
      <div className="flex gap-2">
        <Button onClick={handleParse} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
          <Radar className="w-3.5 h-3.5" />
          Detectar IOAs
        </Button>
        {currentReport.ioas.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearIOAs} className="text-red-500">
            <Trash2 className="w-3.5 h-3.5" />
            Limpiar todos
          </Button>
        )}
      </div>
    </div>
  );
}
