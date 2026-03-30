import Link from 'next/link';
import {
  FileText, Shield, Radar, BookOpen, FlaskConical,
  CheckCircle, Database, Lock, Globe, Zap, Users
} from 'lucide-react';
import { LOGO_BASE64 } from '@/lib/logo';

const FEATURES = [
  {
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Wizard de 6 pasos',
    desc: 'Flujo guiado para construir reportes completos: datos generales, clasificación, IOCs, IOAs, timeline, acciones y preview.',
  },
  {
    icon: Shield,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    title: '42 Taxonomías',
    desc: 'Taxonomía Profesor Vargas v0.2 con categorías A–D, mapeo a MITRE ATT&CK, NIST-CSF, ISO 27002, CIS Top 18 y SCF.',
  },
  {
    icon: Database,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Auto-detección IOCs',
    desc: 'Pega texto suelto y detecta automáticamente IPs, hashes MD5/SHA1/SHA256, dominios, URLs y emails con defanging.',
  },
  {
    icon: Radar,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Detección de IOAs',
    desc: 'Analiza logs y comandos para identificar comportamientos maliciosos: registry keys, Event IDs, LOLBins, named pipes, mutex.',
  },
  {
    icon: Lock,
    color: 'text-red-600',
    bg: 'bg-red-50',
    title: 'TLP v2.0',
    desc: 'Clasificación Traffic Light Protocol: RED, AMBER+STRICT, AMBER, GREEN y CLEAR para controlar la distribución del reporte.',
  },
  {
    icon: Globe,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    title: '100% offline',
    desc: 'Todo se procesa en el navegador. Sin servidores, sin base de datos, sin envío de datos externos. Privacidad total.',
  },
];

const FRAMEWORKS = [
  { name: 'MITRE ATT&CK', color: 'bg-red-100 text-red-700' },
  { name: 'NIST-CSF', color: 'bg-blue-100 text-blue-700' },
  { name: 'ISO 27002', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'CIS Top 18', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'SCF', color: 'bg-purple-100 text-purple-700' },
  { name: 'TLP v2.0', color: 'bg-amber-100 text-amber-700' },
];

const STEPS = [
  { n: '01', label: 'Datos Generales', desc: 'Título, fechas, analista y organización' },
  { n: '02', label: 'Clasificación', desc: 'Taxonomía, severidad y función NIST' },
  { n: '03', label: 'IOCs / IOAs', desc: 'Indicadores de compromiso y de ataque' },
  { n: '04', label: 'Timeline', desc: 'Cronología y análisis técnico' },
  { n: '05', label: 'Acciones', desc: 'Contención, erradicación y recuperación' },
  { n: '06', label: 'Preview & Export', desc: 'Visualización y exportación PDF/HTML' },
];

export default function Home() {
  return (
    <div className="bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }} />
          <div className="absolute bottom-0 -left-16 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <img src={LOGO_BASE64} alt="TTPSEC" className="w-20 h-20 rounded-3xl mx-auto mb-6 shadow-2xl ring-2 ring-white/20" />
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full mb-5 ring-1 ring-white/20">
            <Zap className="w-3 h-3" /> Taxonomía Profesor Vargas v0.2
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Generador de Reportes<br />
            <span className="text-blue-400">de Incidentes de Seguridad</span>
          </h1>
          <p className="text-blue-200 text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Plataforma profesional para documentar incidentes de ciberseguridad con
            mapeo automático a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.
            Detección automática de IOCs e IOAs. 100% offline.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/nuevo"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-black px-7 py-3 rounded-2xl text-sm shadow-xl transition-all hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" /> Crear Reporte
            </Link>
            <Link
              href="/biblioteca"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-2xl text-sm ring-1 ring-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Biblioteca de Incidentes
            </Link>
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-2xl text-sm ring-1 ring-white/20 transition-all"
            >
              <FlaskConical className="w-4 h-4" /> Metodología
            </Link>
          </div>
          <div className="mt-4 h-1 max-w-xs mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #2563eb, #6366f1, #8b5cf6)' }} />
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest mr-2">Frameworks integrados</span>
          {FRAMEWORKS.map(f => (
            <span key={f.name} className={`px-3 py-1 rounded-lg text-xs font-bold ${f.color}`}>{f.name}</span>
          ))}
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">¿Qué es?</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-5">
              Documentación profesional de incidentes, sin complejidad
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Esta herramienta está diseñada para analistas de ciberseguridad que necesitan generar reportes
              estructurados de incidentes de seguridad de forma rápida y estandarizada.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Basada en la <strong className="text-slate-800">Taxonomía Profesor Vargas v0.2</strong>, cubre 42 tipos de incidentes
              en cuatro categorías: Acceso/Explotación, Fuga de Información, Disponibilidad e Integridad,
              mapeados a los principales frameworks internacionales.
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
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">¿Cómo funciona?</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Wizard de 6 pasos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STEPS.map(({ n, label, desc }) => (
              <div key={n} className="flex gap-4 items-start bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <span className="text-2xl font-black text-blue-200 leading-none w-10 flex-shrink-0">{n}</span>
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
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">¿Para quién es?</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Diseñado para profesionales de seguridad</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Analistas SOC', desc: 'Documenta incidentes activos con trazabilidad completa y exporta reportes para escalamiento inmediato.' },
            { icon: Shield, title: 'Equipos de IR', desc: 'Registra la cadena de custodia, timeline de eventos y acciones de contención/erradicación en un solo lugar.' },
            { icon: FlaskConical, title: 'Docentes y estudiantes', desc: 'Herramienta pedagógica para aprender a clasificar incidentes según taxonomías internacionales estandarizadas.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg">
              <Icon className="w-8 h-8 text-blue-300 mb-4" />
              <h3 className="text-base font-black mb-2">{title}</h3>
              <p className="text-sm text-blue-200 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Listo para comenzar</h2>
          <p className="text-blue-200 text-sm mb-8">Sin registro, sin instalación. Abre el wizard y genera tu primer reporte en minutos.</p>
          <Link
            href="/nuevo"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-black px-8 py-3.5 rounded-2xl text-sm shadow-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" /> Crear mi primer reporte
          </Link>
        </div>
      </section>

    </div>
  );
}
