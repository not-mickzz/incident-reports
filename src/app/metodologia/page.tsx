import Link from 'next/link';
import {
  BookOpen, Shield, Target, AlertTriangle, CheckCircle2, ChevronRight,
  Layers, GitBranch, Eye, Zap, RefreshCw, FileText, Clock, Lock
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function MetodologiaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">

      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight mb-3">
          Metodología de Respuesta a Incidentes
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Marco metodológico para la clasificación, análisis y respuesta a incidentes de seguridad,
          basado en estándares internacionales y alineado con MITRE ATT&amp;CK, NIST-CSF, ISO 27002 y CIS Top 18.
        </p>
      </div>

      {/* Ciclo de Respuesta */}
      <section>
        <SectionTitle icon={RefreshCw} title="Ciclo de Vida de Respuesta a Incidentes" subtitle="Basado en NIST SP 800-61 Rev. 2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CICLO.map((fase, idx) => (
            <Card key={idx} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${fase.color}`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">{fase.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{fase.nist}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{fase.description}</p>
              <ul className="space-y-1">
                {fase.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Taxonomía */}
      <section>
        <SectionTitle icon={Layers} title="Taxonomía de incidentes" subtitle="40 tipos de incidentes en 4 categorías principales, basado en Profesor Vargas v0.2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {CATEGORIAS.map((cat) => (
            <div key={cat.code} className={`rounded-2xl p-6 border-2 ${cat.borderColor} ${cat.bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${cat.iconColor}`}>
                  {cat.code}
                </div>
                <div>
                  <p className={`text-sm font-black ${cat.textColor}`}>{cat.name}</p>
                  <p className="text-[10px] text-slate-500">{cat.count} tipos de incidentes</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{cat.description}</p>
              <div className="flex flex-wrap gap-1">
                {cat.subcategories.map((sub) => (
                  <span key={sub} className="text-[10px] font-mono px-2 py-0.5 bg-white/60 rounded border border-current/20 text-slate-600">{sub}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/biblioteca" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm">
            <BookOpen className="w-4 h-4" />
            Ver Biblioteca Completa
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Frameworks */}
      <section>
        <SectionTitle icon={Target} title="Frameworks de Seguridad Integrados" subtitle="Cada incidente está mapeado a 4 estándares internacionales" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FRAMEWORKS.map((fw) => (
            <Card key={fw.name} className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${fw.bg}`}>
                  <fw.icon className={`w-6 h-6 ${fw.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-black text-slate-900">{fw.name}</h3>
                    <a href={fw.url} target="_blank" rel="noopener noreferrer" className={`text-[10px] font-bold px-2 py-0.5 rounded ${fw.badgeBg} ${fw.badgeText} hover:opacity-80`}>
                      Ver estándar →
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{fw.fullName}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{fw.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Clasificación de Severidad */}
      <section>
        <SectionTitle icon={AlertTriangle} title="Clasificación de Severidad" subtitle="Cuatro niveles basados en impacto potencial" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SEVERIDADES.map((s) => (
            <div key={s.level} className={`rounded-2xl p-5 border-2 ${s.border} ${s.bg}`}>
              <div className={`text-lg font-black mb-1 ${s.text}`}>{s.label}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{s.description}</p>
              <ul className="space-y-1">
                {s.examples.map((e, i) => (
                  <li key={i} className="text-[10px] text-slate-500">• {e}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TLP */}
      <section>
        <SectionTitle icon={Lock} title="Traffic Light Protocol (TLP)" subtitle="Estándar FIRST para control de diseminación de información" />
        <div className="space-y-3">
          {TLP_INFO.map((tlp) => (
            <div key={tlp.level} className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <div className="shrink-0">
                <span className="px-3 py-1.5 rounded-lg text-xs font-black" style={{ backgroundColor: tlp.bg, color: tlp.color }}>
                  {tlp.level}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900 mb-0.5">{tlp.name}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{tlp.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-3 text-center">
          Fuente: FIRST.org — Forum of Incident Response and Security Teams
        </p>
      </section>

      {/* IOCs */}
      <section>
        <SectionTitle icon={Eye} title="Indicadores de Compromiso (IOCs)" subtitle="Tipos detectados automáticamente por la herramienta" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {IOC_TYPES.map((ioc) => (
            <Card key={ioc.type} className="p-4 text-center">
              <div className="text-2xl mb-2">{ioc.emoji}</div>
              <p className="text-xs font-black text-slate-900 mb-1">{ioc.type}</p>
              <p className="text-[10px] text-slate-500 mb-2">{ioc.description}</p>
              <code className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">{ioc.example}</code>
            </Card>
          ))}
        </div>
      </section>

      {/* Guía de uso */}
      <section>
        <SectionTitle icon={GitBranch} title="Flujo de Trabajo Recomendado" subtitle="Cómo usar TTPSEC para documentar un incidente" />
        <div className="space-y-0">
          {WORKFLOW.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0 ${
                  idx === 0 ? 'bg-blue-600' : idx === WORKFLOW.length - 1 ? 'bg-emerald-600' : 'bg-slate-500'
                }`}>
                  {idx + 1}
                </div>
                {idx < WORKFLOW.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1.5" />}
              </div>
              <div className="pb-5 pt-1 flex-1">
                <p className="text-sm font-bold text-slate-900 mb-0.5">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/nuevo" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm">
            <FileText className="w-4 h-4" />
            Crear Nuevo Reporte
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Referencias */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Referencias Bibliográficas
        </h3>
        <ul className="space-y-2">
          {REFERENCIAS.map((ref, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="text-blue-400 font-bold shrink-0">[{idx + 1}]</span>
              <span>{ref.authors} <em>"{ref.title}"</em>. {ref.publisher}, {ref.year}.{' '}
                {ref.url && (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono">{ref.url}</a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="flex items-center gap-2 text-xl font-black text-blue-900 mb-1">
        <Icon className="w-5 h-5 text-blue-600" />
        {title}
      </h2>
      {subtitle && <p className="text-xs text-slate-400 ml-7">{subtitle}</p>}
    </div>
  );
}

const CICLO = [
  {
    name: 'Preparación',
    nist: 'Preparation',
    color: 'bg-blue-600',
    description: 'Establecer las capacidades de respuesta antes de que ocurra un incidente. Incluye políticas, herramientas y entrenamiento.',
    activities: ['Definir equipo de respuesta (CSIRT)', 'Establecer playbooks por tipo de incidente', 'Configurar herramientas SIEM/EDR', 'Capacitar al personal en procedimientos'],
  },
  {
    name: 'Detección y Análisis',
    nist: 'Detection & Analysis',
    color: 'bg-indigo-600',
    description: 'Identificar y confirmar la ocurrencia de un incidente, determinar su alcance e impacto inicial.',
    activities: ['Monitorear alertas y logs', 'Analizar IOCs detectados', 'Clasificar según taxonomía', 'Determinar severidad y TLP'],
  },
  {
    name: 'Contención',
    nist: 'Containment',
    color: 'bg-amber-600',
    description: 'Limitar el daño del incidente y evitar su propagación a otros sistemas.',
    activities: ['Aislar sistemas afectados', 'Bloquear IOCs en controles', 'Preservar evidencia forense', 'Notificar a partes relevantes'],
  },
  {
    name: 'Erradicación',
    nist: 'Eradication',
    color: 'bg-orange-600',
    description: 'Eliminar la causa raíz del incidente y todos los componentes maliciosos del entorno.',
    activities: ['Eliminar malware o accesos no autorizados', 'Parchear vulnerabilidades explotadas', 'Restablecer credenciales comprometidas', 'Limpiar artefactos maliciosos'],
  },
  {
    name: 'Recuperación',
    nist: 'Recovery',
    color: 'bg-emerald-600',
    description: 'Restaurar los sistemas afectados a operación normal y verificar que el incidente fue resuelto.',
    activities: ['Restaurar desde backups validados', 'Verificar integridad de sistemas', 'Monitoreo intensivo post-incidente', 'Confirmar operación normal'],
  },
  {
    name: 'Lecciones Aprendidas',
    nist: 'Post-Incident Activity',
    color: 'bg-violet-600',
    description: 'Documentar el incidente, evaluar la respuesta y mejorar los controles para prevenir recurrencia.',
    activities: ['Redactar reporte final (este sistema)', 'Identificar brechas en controles', 'Actualizar playbooks y procedimientos', 'Medir KPIs de respuesta'],
  },
];

const CATEGORIAS = [
  {
    code: 'A',
    name: 'Acceso / Explotación / Inyección',
    count: 12,
    description: 'Incidentes donde un actor obtiene acceso no autorizado, explota vulnerabilidades o ejecuta código malicioso en los sistemas de la organización.',
    subcategories: ['Acceso No Autorizado', 'Abuso de Infraestructura', 'Ingeniería Social', 'Ejecución de Código', 'Inyección'],
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'bg-red-600',
    textColor: 'text-red-900',
  },
  {
    code: 'B',
    name: 'Fuga de Información',
    count: 11,
    description: 'Incidentes que resultan en la divulgación no autorizada de datos confidenciales, ya sea por exfiltración activa o exposición accidental.',
    subcategories: ['Fuga de Información Confidencial', 'Filtración de Configuraciones', 'Exposición de Control de Versiones'],
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'bg-amber-600',
    textColor: 'text-amber-900',
  },
  {
    code: 'C',
    name: 'Disponibilidad / Abuso de Recursos',
    count: 10,
    description: 'Incidentes que afectan la disponibilidad de servicios o abusan de los recursos computacionales de la organización.',
    subcategories: ['Denegación de Servicio', 'Destrucción de Datos', 'Abuso de Recursos', 'Cryptojacking'],
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconColor: 'bg-cyan-600',
    textColor: 'text-cyan-900',
  },
  {
    code: 'D',
    name: 'Integridad / Alteración',
    count: 7,
    description: 'Incidentes donde se modifica datos, configuraciones o logs de seguridad de forma no autorizada, comprometiendo la integridad del sistema.',
    subcategories: ['Alteración de Datos', 'Defacement', 'Modificación de Configuraciones', 'Manipulación de Logs'],
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    iconColor: 'bg-violet-600',
    textColor: 'text-violet-900',
  },
];

const FRAMEWORKS = [
  {
    name: 'MITRE ATT&CK',
    fullName: 'Adversarial Tactics, Techniques & Common Knowledge',
    description: 'Base de conocimiento de tácticas y técnicas usadas por adversarios reales. Cada incidente referencia las técnicas específicas (TIDs) utilizadas en el ataque.',
    url: 'https://attack.mitre.org/',
    icon: Target,
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
  },
  {
    name: 'NIST-CSF',
    fullName: 'NIST Cybersecurity Framework v2.0',
    description: 'Marco de 6 funciones (Govern, Identify, Protect, Detect, Respond, Recover) que organiza actividades de ciberseguridad. Indica en qué función del ciclo se ubica cada tipo de incidente.',
    url: 'https://www.nist.gov/cyberframework',
    icon: Shield,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  {
    name: 'ISO/IEC 27002:2022',
    fullName: 'Information Security Controls',
    description: 'Estándar internacional con 93 controles de seguridad organizados en 4 temas. Cada incidente referencia los controles ISO aplicables para su prevención y detección.',
    url: 'https://www.iso.org/standard/75652.html',
    icon: CheckCircle2,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  {
    name: 'CIS Top 18',
    fullName: 'CIS Critical Security Controls v8',
    description: '18 controles críticos priorizados por efectividad real. Los controles CIS son altamente prácticos y accionables, ideales para organizaciones con recursos limitados.',
    url: 'https://www.cisecurity.org/controls',
    icon: Layers,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-700',
  },
];

const SEVERIDADES = [
  {
    level: 'critico',
    label: 'Crítico',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    description: 'Impacto severo e inmediato sobre operaciones, datos o infraestructura crítica.',
    examples: ['RCE exitoso', 'Exfiltración masiva de PII', 'Ransomware activo'],
  },
  {
    level: 'alto',
    label: 'Alto',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    description: 'Impacto significativo con potencial de escalar si no se contiene rápidamente.',
    examples: ['Fuerza bruta exitosa', 'MitM confirmado', 'Keylogger detectado'],
  },
  {
    level: 'medio',
    label: 'Medio',
    bg: 'bg-cyan-50',
    border: 'border-cyan-300',
    text: 'text-cyan-700',
    description: 'Impacto moderado, requiere atención pero no pone en riesgo inmediato la operación.',
    examples: ['Phishing detectado', 'Secretos en repo', 'Cryptojacking'],
  },
  {
    level: 'bajo',
    label: 'Bajo',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    description: 'Impacto menor, puede gestionarse dentro del ciclo normal de operaciones.',
    examples: ['Spam desde infra', 'Defacement menor', 'Abuso de BW'],
  },
];

const TLP_INFO = [
  { level: 'TLP:RED', name: 'Solo para destinatarios', color: '#fff', bg: '#cc0000', description: 'Información de alto riesgo. Solo puede compartirse con los destinatarios específicos nombrados. No reenviar ni publicar bajo ninguna circunstancia.' },
  { level: 'TLP:AMBER+STRICT', name: 'Organización receptora únicamente', color: '#fff', bg: '#ff8c00', description: 'Información sensible que puede compartirse solo dentro de la organización receptora. No distribuir a clientes ni proveedores.' },
  { level: 'TLP:AMBER', name: 'Organización y clientes directos', color: '#333', bg: '#ffbf00', description: 'Puede compartirse con miembros de la organización y clientes o socios directos que necesiten la información para protegerse.' },
  { level: 'TLP:GREEN', name: 'Comunidad de seguridad', color: '#fff', bg: '#33aa00', description: 'Puede compartirse con la comunidad amplia de ciberseguridad (ISACs, CERTs, pares). No publicar en medios abiertos.' },
  { level: 'TLP:CLEAR', name: 'Sin restricción', color: '#333', bg: '#e0e0e0', description: 'Sin restricciones de distribución. Puede publicarse libremente, compartirse en redes sociales o incluirse en reportes públicos.' },
];

const IOC_TYPES = [
  { type: 'Dirección IP', emoji: '🌐', description: 'IPv4 e IPv6, incluyendo formato defanged', example: '192.168.1[.]1' },
  { type: 'Hash', emoji: '#️⃣', description: 'MD5 (32), SHA-1 (40), SHA-256 (64)', example: 'a3f5...d2e1' },
  { type: 'Dominio', emoji: '🔗', description: 'FQDN y subdominios maliciosos', example: 'evil[.]com' },
  { type: 'URL', emoji: '🌍', description: 'URLs de C2, phishing o distribución', example: 'hxxps://...' },
  { type: 'Email', emoji: '📧', description: 'Remitentes maliciosos o víctimas', example: 'attacker@x.com' },
  { type: 'CVE', emoji: '🐛', description: 'Vulnerabilidades explotadas', example: 'CVE-2024-...' },
  { type: 'Ruta / Archivo', emoji: '📁', description: 'Rutas de artefactos maliciosos', example: '/tmp/.hidden' },
  { type: 'Registro', emoji: '🗝️', description: 'Claves de registro Windows', example: 'HKLM\\Run\\...' },
];

const WORKFLOW = [
  { title: 'Detección del incidente', description: 'Identificar que ocurrió un evento anómalo a través de alertas SIEM, reportes de usuarios, o monitoreo activo. Registrar hora de detección.' },
  { title: 'Recopilar IOCs', description: 'Extraer todos los indicadores de compromiso: IPs de origen, hashes de archivos maliciosos, dominios C2, URLs de phishing. Pegarlos directamente en el paso de IOCs del wizard.' },
  { title: 'Clasificar con la taxonomía', description: 'Seleccionar el tipo de incidente en la taxonomía. El sistema auto-completa los mapeos a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.' },
  { title: 'Asignar severidad y TLP', description: 'Determinar el nivel de impacto (Crítico/Alto/Medio/Bajo) y el protocolo TLP según con quién se compartirá el reporte.' },
  { title: 'Documentar el timeline', description: 'Registrar cronológicamente cada evento relevante del incidente con fecha y hora precisas. Agregar el análisis técnico detallado.' },
  { title: 'Documentar acciones de respuesta', description: 'Registrar las acciones de contención, erradicación y recuperación ejecutadas. Incluir lecciones aprendidas y recomendaciones.' },
  { title: 'Generar y distribuir el reporte', description: 'Revisar el preview del reporte, exportar como PDF y distribuir según el nivel TLP asignado. El reporte queda guardado en sesión.' },
];

const REFERENCIAS = [
  { authors: 'NIST.', title: 'Computer Security Incident Handling Guide (SP 800-61 Rev. 2)', publisher: 'National Institute of Standards and Technology', year: '2012', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final' },
  { authors: 'MITRE Corporation.', title: 'MITRE ATT&CK® Framework', publisher: 'MITRE', year: '2024', url: 'https://attack.mitre.org/' },
  { authors: 'ISO/IEC.', title: 'ISO/IEC 27002:2022 — Information Security Controls', publisher: 'International Organization for Standardization', year: '2022', url: 'https://www.iso.org/standard/75652.html' },
  { authors: 'CIS.', title: 'CIS Critical Security Controls v8', publisher: 'Center for Internet Security', year: '2021', url: 'https://www.cisecurity.org/controls/v8' },
  { authors: 'FIRST.', title: 'Traffic Light Protocol (TLP) Standard v2.0', publisher: 'Forum of Incident Response and Security Teams', year: '2022', url: 'https://www.first.org/tlp/' },
  { authors: 'NIST.', title: 'Cybersecurity Framework v2.0', publisher: 'National Institute of Standards and Technology', year: '2024', url: 'https://www.nist.gov/cyberframework' },
  { authors: 'Vargas, S.', title: 'Taxonomía de Incidentes de Seguridad v0.2', publisher: 'TTPSEC SpA', year: '2024', url: undefined },
];
