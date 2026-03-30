import Link from 'next/link';
import {
  FileText, Shield, Radar, BookOpen, FlaskConical,
  CheckCircle, Database, Lock, Globe, Zap, Users
} from 'lucide-react';

const FEATURES = [
  { icon: FileText,  color: 'text-blue-600',    bg: 'bg-blue-50',    title: 'Wizard de 6 pasos',     desc: 'Flujo guiado: datos generales, clasificación, IOCs, IOAs, timeline, acciones y preview.' },
  { icon: Shield,    color: 'text-indigo-600',   bg: 'bg-indigo-50',  title: '40 Taxonomías',          desc: 'Taxonomía de incidentes mapeada a MITRE ATT&CK, NIST-CSF, ISO 27002, CIS Top 18 y SCF.' },
  { icon: Database,  color: 'text-emerald-600',  bg: 'bg-emerald-50', title: 'Auto-detección IOCs',    desc: 'Detecta IPs, hashes MD5/SHA1/SHA256, dominios, URLs y emails con defanging automático.' },
  { icon: Radar,     color: 'text-orange-500',   bg: 'bg-orange-50',  title: 'Detección de IOAs',      desc: 'Identifica comportamientos maliciosos: registry keys, Event IDs, LOLBins, named pipes, mutex.' },
  { icon: Lock,      color: 'text-red-600',      bg: 'bg-red-50',     title: 'TLP v2.0',               desc: 'RED, AMBER+STRICT, AMBER, GREEN y CLEAR para controlar la distribución del reporte.' },
  { icon: Globe,     color: 'text-cyan-600',     bg: 'bg-cyan-50',    title: '100% offline',           desc: 'Todo se procesa en el navegador. Sin servidores, sin envío de datos. Privacidad total.' },
];

const FRAMEWORKS = [
  { name: 'MITRE ATT&CK', color: 'bg-red-100 text-red-700' },
  { name: 'NIST-CSF',     color: 'bg-blue-100 text-blue-700' },
  { name: 'ISO 27002',    color: 'bg-indigo-100 text-indigo-700' },
  { name: 'CIS Top 18',   color: 'bg-emerald-100 text-emerald-700' },
  { name: 'SCF',          color: 'bg-purple-100 text-purple-700' },
  { name: 'TLP v2.0',     color: 'bg-amber-100 text-amber-700' },
];

const STEPS = [
  { n: '01', label: 'Datos Generales', desc: 'Título, fechas, analista y organización' },
  { n: '02', label: 'Clasificación',   desc: 'Taxonomía, severidad y función NIST' },
  { n: '03', label: 'IOCs / IOAs',     desc: 'Indicadores de compromiso y de ataque' },
  { n: '04', label: 'Timeline',        desc: 'Cronología y análisis técnico' },
  { n: '05', label: 'Acciones',        desc: 'Contención, erradicación y recuperación' },
  { n: '06', label: 'Preview & Export',desc: 'Visualización y exportación PDF/HTML' },
];

export default function Home() {
  return (
    <div className="bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)' }}>
        {/* Decorative circles — clipped to prevent overflow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }} />
          <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 py-14 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Generador de Reportes<br />
            <span className="text-blue-400">de Incidentes de Seguridad</span>
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 px-2">
            Plataforma profesional para documentar incidentes de ciberseguridad con
            mapeo automático a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.
            Detección automática de IOCs e IOAs. 100% offline.
          </p>
          {/* CTAs — stacked on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/nuevo"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-black px-7 py-3.5 rounded-2xl text-sm shadow-xl transition-all"
            >
              <FileText className="w-4 h-4" /> Crear Reporte
            </Link>
            <Link
              href="/biblioteca"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl text-sm ring-1 ring-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Biblioteca
            </Link>
            <Link
              href="/metodologia"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl text-sm ring-1 ring-white/20 transition-all"
            >
              <FlaskConical className="w-4 h-4" /> Metodología
            </Link>
          </div>
          <div className="mt-6 h-1 max-w-xs mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #2563eb, #6366f1, #8b5cf6)' }} />
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest w-full text-center sm:w-auto sm:mr-2 mb-1 sm:mb-0">Frameworks integrados</span>
          {FRAMEWORKS.map(f => (
            <span key={f.name} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${f.color}`}>{f.name}</span>
          ))}
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">¿Qué es?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              Documentación profesional de incidentes, sin complejidad
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Diseñada para analistas de ciberseguridad que necesitan generar reportes
              estructurados de forma rápida y estandarizada.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Basada en la taxonomía de incidentes, cubre 40 tipos de incidentes
              mapeados a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.
            </p>
            <div className="space-y-2">
              {['Genera reportes en minutos, no horas', 'Mapeo automático a MITRE ATT&CK', 'Detecta IOCs e IOAs desde logs en bruto', 'Exporta a PDF/HTML listo para entregar'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Features grid: 1 col mobile, 2 col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex gap-3 sm:block">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 sm:mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">{title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-white border-y border-slate-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-8">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">¿Cómo funciona?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Wizard de 6 pasos</h2>
          </div>
          {/* Steps: 1 col mobile, 2 col sm, 3 col md */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {STEPS.map(({ n, label, desc }) => (
              <div key={n} className="flex gap-3 items-start bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <span className="text-xl sm:text-2xl font-black text-blue-200 leading-none w-9 flex-shrink-0">{n}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <div className="text-center mb-8">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">¿Para quién es?</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Diseñado para profesionales de seguridad</h2>
        </div>
        {/* Cards: stacked mobile, 3 col md */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Users,       title: 'Analistas SOC',         desc: 'Documenta incidentes activos con trazabilidad completa y exporta reportes para escalamiento inmediato.' },
            { icon: Shield,      title: 'Equipos de IR',          desc: 'Registra la cadena de custodia, timeline de eventos y acciones de contención/erradicación en un solo lugar.' },
            { icon: FlaskConical, title: 'Docentes y estudiantes', desc: 'Herramienta pedagógica para aprender a clasificar incidentes según taxonomías internacionales estandarizadas.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg flex gap-4 md:block">
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-blue-300 flex-shrink-0 md:mb-4" />
              <div>
                <h3 className="text-sm md:text-base font-black mb-1 md:mb-2">{title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
