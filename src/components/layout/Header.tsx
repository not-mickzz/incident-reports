'use client';

import Link from 'next/link';
import { FileText, BookOpen, FlaskConical, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div>
            <h1 className="text-base font-black text-blue-900 tracking-tight leading-none">Reporte de Incidentes</h1>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Generador de Reportes de Incidentes de Seguridad</p>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <Link
            href="/metodologia"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-2.5 py-2 sm:px-3.5 rounded-xl text-xs transition-all"
            title="Metodología"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Metodología</span>
          </Link>
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-2.5 py-2 sm:px-3.5 rounded-xl text-xs transition-all"
            title="Biblioteca"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Biblioteca</span>
          </Link>
          <Link
            href="/nuevo"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 sm:px-4 rounded-xl text-xs shadow-sm transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Nuevo</span>
            <span className="hidden sm:inline"> Reporte</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-semibold px-2.5 py-2 sm:px-3.5 rounded-xl text-xs transition-all"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}