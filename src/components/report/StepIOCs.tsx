'use client';

import { useState } from 'react';
import { Shield, Radar } from 'lucide-react';
import { IOCInput } from '@/components/ioc/IOCInput';
import { IOCTable } from '@/components/ioc/IOCTable';
import { IOAInput } from '@/components/ioc/IOAInput';
import { IOATable } from '@/components/ioc/IOATable';

export function StepIOCs() {
  const [tab, setTab] = useState<'ioc' | 'ioa'>('ioc');

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('ioc')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'ioc'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          IOCs — Indicadores de Compromiso
        </button>
        <button
          onClick={() => setTab('ioa')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'ioa'
              ? 'bg-orange-500 text-white shadow'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Radar className="w-3.5 h-3.5" />
          IOAs — Indicadores de Ataque
        </button>
      </div>

      {tab === 'ioc' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Indicadores de Compromiso (IOCs)</h3>
            <p className="text-xs text-slate-500">
              Artefactos forenses estáticos: IPs, hashes MD5/SHA1/SHA256, dominios, URLs y emails.
              Los IOCs defanged (ej: 192[.]168[.]1[.]1) se refangean automáticamente.
            </p>
          </div>
          <IOCInput />
          <IOCTable />
        </div>
      )}

      {tab === 'ioa' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Indicadores de Ataque (IOAs)</h3>
            <p className="text-xs text-slate-500">
              Patrones de comportamiento malicioso: comandos sospechosos, claves de registro, rutas, Event IDs,
              named pipes, servicios y tareas programadas. Pega logs o líneas de comando para detección automática.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700">
            <strong>¿Qué es un IOA?</strong> A diferencia de los IOCs (evidencia post-compromiso), los IOAs detectan
            el <em>comportamiento</em> del atacante en tiempo real: técnicas de persistencia, evasión, movimiento lateral
            y ejecución. Basado en MITRE ATT&amp;CK TTPs.
          </div>
          <IOAInput />
          <IOATable />
        </div>
      )}
    </div>
  );
}
