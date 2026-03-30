'use client';

import Link from 'next/link';
import { FileText, BookOpen, FlaskConical } from 'lucide-react';
import { LOGO_BASE64 } from '@/lib/logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO_BASE64} alt="TTPSEC" className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <h1 className="text-lg font-black text-blue-900 tracking-tight">TTPSEC</h1>
            <p className="text-[11px] text-slate-500 font-medium">Generador de Reportes de Incidentes</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/metodologia"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-4 py-2 rounded-xl text-xs transition-all"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Metodología
          </Link>
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-4 py-2 rounded-xl text-xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Biblioteca
          </Link>
          <Link
            href="/nuevo"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Nuevo Reporte
          </Link>
        </div>
      </div>
    </header>
  );
}
