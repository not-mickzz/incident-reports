import { LOGO_BASE64 } from '@/lib/logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand row */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src={LOGO_BASE64} alt="TTPSEC" className="w-6 h-6 rounded object-cover" />
          <span className="text-sm font-black text-blue-900 tracking-tight">TTPSEC</span>
        </div>
        <p className="text-xs text-slate-500 mb-1 text-center">
          Generador de Reportes de Incidentes de Seguridad
        </p>
        <p className="text-[10px] text-slate-400 font-mono text-center mt-1 mb-4">
          Taxonomía Profesor Vargas v0.2 | MITRE ATT&CK | NIST-CSF | ISO 27002 | CIS Top 18
        </p>

        {/* Disclaimer */}
        <div className="border-t border-slate-100 pt-4 max-w-3xl mx-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center mb-1.5">
            Aviso Legal
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed text-center">
            Esta herramienta es de uso exclusivamente educativo y profesional. Toda la información
            se procesa localmente en el navegador del usuario; no se transmiten datos a servidores
            externos ni se almacena información sensible fuera del dispositivo. Los reportes
            generados son de responsabilidad del analista que los emite. TTPSEC no se hace
            responsable del uso indebido de esta herramienta ni de las decisiones tomadas basadas
            en los reportes generados. El uso de esta herramienta implica la aceptación de estos
            términos. MITRE ATT&CK® es marca registrada de The MITRE Corporation.
          </p>
        </div>

        {/* MIT License */}
        <div className="border-t border-slate-100 pt-4 mt-4 max-w-3xl mx-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center mb-1.5">
            MIT License
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed text-center whitespace-pre-line">
            {`Copyright (c) ${new Date().getFullYear()} TTPSEC\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
          </p>
        </div>

        {/* LinkedIn recommendation */}
        <div className="border-t border-slate-200 pt-4 mt-2 text-center">
          <p className="text-xs text-slate-400 mb-2">Si esta herramienta te fue útil, puedes recomendar al autor:</p>
          <a
            href="https://www.linkedin.com/in/profesorsvargasy/details/recommendations/edit/write?profileFormEntryPoint=Detail"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Recomendar en LinkedIn
          </a>
        </div>

        <p className="text-[10px] text-slate-400 italic text-center mt-4">
          Software para el bien común — TTPSEC &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
