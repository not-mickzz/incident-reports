import Link from 'next/link';
import {
  ArrowLeft, ExternalLink, Shield, AlertTriangle, Bug, Eye, Crosshair,
  BookOpen, Zap, Target, Link2, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, MitreBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TAXONOMIES } from '@/data/taxonomies';
import { getLibraryEntry } from '@/data/biblioteca';
import { SEVERITIES } from '@/data/severity';

export function generateStaticParams() {
  return TAXONOMIES.map((t) => ({ code: t.code }));
}

export default async function BibliotecaDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decodedCode = decodeURIComponent(code);
  const taxonomy = TAXONOMIES.find((t) => t.code === decodedCode);
  const library = getLibraryEntry(decodedCode);

  if (!taxonomy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-slate-500 mb-4">Incidente no encontrado: {decodedCode}</p>
        <Link href="/biblioteca">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
          </Button>
        </Link>
      </div>
    );
  }

  const severity = SEVERITIES[taxonomy.impact];
  const categoryLetter = decodedCode.charAt(0);
  const categoryColor =
    categoryLetter === 'A' ? 'from-red-600 to-red-800'
    : categoryLetter === 'B' ? 'from-amber-600 to-amber-800'
    : categoryLetter === 'C' ? 'from-cyan-600 to-cyan-800'
    : 'from-violet-600 to-violet-800';

  const adjacent = getAdjacentCodes(decodedCode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400 mb-6">
        <Link href="/biblioteca" className="hover:text-blue-600 transition-colors">Biblioteca</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-semibold">{decodedCode}</span>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${categoryColor} text-white rounded-2xl p-8 mb-8`}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-white font-mono font-black text-sm shrink-0">
            {decodedCode}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tight mb-2">{taxonomy.name}</h1>
            <p className="text-sm opacity-80 mb-3">{taxonomy.areaEffect}</p>
            <div className="flex gap-2 flex-wrap">
              {taxonomy.mitreTechniques.map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/20 rounded border border-white/30">
                  {t}
                </span>
              ))}
              <span
                className="text-[10px] px-2 py-0.5 rounded font-bold"
                style={{ backgroundColor: severity.bgColor, color: severity.color }}
              >
                {severity.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Framework mapping bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Card className="p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">NIST-CSF</p>
          <p className="text-xs font-bold text-indigo-700">{taxonomy.nistFunction}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ISO 27002</p>
          <p className="text-xs font-mono font-bold text-blue-700">{taxonomy.isoControls}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">CIS Top 18</p>
          <p className="text-xs font-mono font-bold text-emerald-700">{taxonomy.cisControls}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SCF</p>
          <p className="text-xs font-bold text-violet-700">{taxonomy.scfDomains}</p>
        </Card>
      </div>

      {library ? (
        <div className="space-y-8">
          {/* Description */}
          <section>
            <SectionTitle icon={BookOpen} title="Descripción" />
            <p className="text-sm text-slate-600 leading-relaxed">{library.description}</p>
          </section>

          {/* Technical Detail */}
          <section>
            <SectionTitle icon={Zap} title="Detalle Técnico" />
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 leading-relaxed font-mono">{library.technicalDetail}</p>
            </div>
          </section>

          {/* MITRE ATT&CK */}
          <section>
            <SectionTitle icon={Target} title="Técnicas MITRE ATT&CK" />
            <div className="space-y-2">
              {library.mitreTechniques.map((t) => (
                <a
                  key={t.id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MitreBadge technique={t.id} />
                    <span className="text-sm font-semibold text-slate-800">{t.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-500 transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* Attack Flow */}
          <section>
            <SectionTitle icon={Crosshair} title="Flujo de Ataque" />
            <div className="space-y-0">
              {library.attackFlow.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 ${
                      idx === 0 ? 'bg-blue-600'
                      : idx === library.attackFlow.length - 1 ? 'bg-red-600'
                      : 'bg-slate-500'
                    }`}>
                      {idx + 1}
                    </div>
                    {idx < library.attackFlow.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                    )}
                  </div>
                  <div className="pb-4 pt-1">
                    <p className="text-sm text-slate-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real World Examples */}
          <section>
            <SectionTitle icon={AlertTriangle} title="Ejemplos Reales" />
            <div className="space-y-3">
              {library.realWorldExamples.map((ex, idx) => (
                <Card key={idx} className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{ex.name}</h4>
                      <Badge variant="slate">{ex.year}</Badge>
                    </div>
                    <a
                      href={ex.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 shrink-0"
                      title="Ver fuente"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{ex.description}</p>
                  <p className="text-[10px] text-blue-600 font-mono mt-2 truncate">{ex.source}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* CVEs */}
          {library.cves.length > 0 && (
            <section>
              <SectionTitle icon={Bug} title="CVEs Relacionados" />
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="px-4 py-3 font-bold text-[11px] text-left">CVE ID</th>
                      <th className="px-4 py-3 font-bold text-[11px] text-left">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {library.cves.map((cve, idx) => (
                      <tr key={cve.id} className={`border-t border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <td className="px-4 py-2.5">
                          <a
                            href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono font-bold text-red-600 hover:text-red-800 hover:underline"
                          >
                            {cve.id}
                          </a>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{cve.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Indicators */}
          <section>
            <SectionTitle icon={Eye} title="Indicadores de Detección" />
            <div className="space-y-2">
              {library.indicators.map((ind, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">{ind}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Detection Methods */}
          <section>
            <SectionTitle icon={Shield} title="Métodos de Detección" />
            <div className="space-y-2">
              {library.detectionMethods.map((method, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">{method}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section>
            <SectionTitle icon={Zap} title="Impacto" />
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 leading-relaxed">{library.impact}</p>
            </div>
          </section>

          {/* Recommended Controls */}
          <section>
            <SectionTitle icon={Shield} title="Controles Recomendados" />
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 leading-relaxed">{taxonomy.recommendedControls}</p>
            </div>
          </section>

          {/* References */}
          <section>
            <SectionTitle icon={Link2} title="Referencias y Fuentes" />
            <div className="space-y-2">
              {library.references.map((ref, idx) => {
                const typeLabel = ref.type === 'standard' ? 'Estándar' : ref.type === 'tool' ? 'Herramienta' : ref.type === 'paper' ? 'Paper' : ref.type === 'news' ? 'Noticia' : 'Blog';
                const typeColor = ref.type === 'standard' ? 'blue' : ref.type === 'tool' ? 'emerald' : ref.type === 'paper' ? 'purple' : ref.type === 'news' ? 'red' : 'amber';
                return (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Badge variant={typeColor as 'blue' | 'emerald' | 'purple' | 'red' | 'amber'}>{typeLabel}</Badge>
                      <span className="text-xs font-semibold text-slate-800 truncate">{ref.title}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Información de la Taxonomía</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-500">Técnicas MITRE:</span>
                <div className="flex gap-1 flex-wrap mt-1">
                  {taxonomy.mitreTechniques.map((t) => (
                    <a key={t} href={`https://attack.mitre.org/techniques/${t.replace('.', '/')}/`} target="_blank" rel="noopener noreferrer">
                      <MitreBadge technique={t} />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-500">Impacto:</span>
                <p className="mt-1">
                  <Badge variant={taxonomy.impact === 'crítico' ? 'red' : taxonomy.impact === 'alto' ? 'amber' : taxonomy.impact === 'medio' ? 'cyan' : 'emerald'}>
                    {severity.label}
                  </Badge>
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Controles Recomendados</h2>
            <p className="text-sm text-slate-600">{taxonomy.recommendedControls}</p>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
        <Link href="/biblioteca">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Biblioteca
          </Button>
        </Link>
        {adjacent.next && (
          <Link href={`/biblioteca/${adjacent.next}`}>
            <Button variant="primary" size="sm">
              Siguiente: {adjacent.next} <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-4">
      <Icon className="w-5 h-5" />
      {title}
    </h2>
  );
}

function getAdjacentCodes(code: string) {
  const codes = TAXONOMIES.map((t) => t.code);
  const idx = codes.indexOf(code);
  return {
    prev: idx > 0 ? codes[idx - 1] : null,
    next: idx < codes.length - 1 ? codes[idx + 1] : null,
  };
}
