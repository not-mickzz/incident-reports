'use client';

import { IOCInput } from '@/components/ioc/IOCInput';
import { IOCTable } from '@/components/ioc/IOCTable';

export function StepIOCs() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Indicadores de Compromiso (IOCs)</h3>
        <p className="text-xs text-slate-500">
          Pega IOCs sueltos y se detectaran automáticamente. Soporta IPs, hashes MD5/SHA1/SHA256, dominios, URLs y emails.
          Los IOCs defanged (ej: 192[.]168[.]1[.]1) se refangean automáticamente.
        </p>
      </div>
      <IOCInput />
      <IOCTable />
    </div>
  );
}
