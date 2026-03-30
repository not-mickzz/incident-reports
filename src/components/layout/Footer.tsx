import { APP_VERSION, APP_DATE } from '@/lib/version';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand row */}
        <p className="text-xs text-slate-500 mb-1 text-center">
          Generador de Reportes de Incidentes de Seguridad
        </p>
        <p className="text-[10px] text-slate-400 font-mono text-center mt-1 mb-4">
          MITRE ATT&CK | NIST-CSF | ISO 27002 | CIS Top 18
        </p>

        <p className="text-[10px] text-slate-400 italic text-center mt-4">
          Reporte de Incidentes - mickzz.xyz &copy; {new Date().getFullYear()}
          <span className="mx-2">·</span>
          <span className="font-mono">v{APP_VERSION}</span>
          <span className="mx-2">·</span>
          {APP_DATE}
        </p>
      </div>
    </footer>
  );
}
