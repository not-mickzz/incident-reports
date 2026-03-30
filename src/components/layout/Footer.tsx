export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand row */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-ttpsec.png`} alt="TTPSEC" className="w-6 h-6 rounded object-cover" />
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

        <p className="text-[10px] text-slate-400 italic text-center mt-4">
          Software para el bien común — TTPSEC &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
