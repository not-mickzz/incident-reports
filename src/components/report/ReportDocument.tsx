'use client';

import { Badge, MitreBadge } from '@/components/ui/Badge';
import { SEVERITIES } from '@/data/severity';
import { TLP_LEVELS } from '@/data/tlp';
import { IOC_TYPE_LABELS } from '@/lib/ioc-parser';
import { IOA_TYPE_LABELS, IOA_TYPE_COLORS } from '@/lib/ioa-parser';
import { LOGO_BASE64 } from '@/lib/logo';
import { formatDate, formatDateLong } from '@/lib/utils';
import type { Report } from '@/types';

interface Props {
  report: Report;
}

export function ReportDocument({ report }: Props) {
  const severity = SEVERITIES[report.classification.severity];
  const tlp = TLP_LEVELS[report.classification.tlp];

  return (
    <div id="report-document" className="bg-white max-w-4xl mx-auto shadow-md">
      {/* PORTADA PROFESIONAL */}
      <div className="relative overflow-hidden" style={{ minHeight: '340px', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)' }}>
        {/* Geometric background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }} />
          <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px opacity-10" style={{ background: 'linear-gradient(to right, transparent, #60a5fa, transparent)' }} />
        </div>

        {/* Top bar: org logo + TLP */}
        <div className="relative flex items-center justify-between px-10 pt-8 pb-0">
          <div className="flex items-center gap-4">
            <img
              src={report.general.logoUrl || LOGO_BASE64}
              alt="Logo"
              className="h-14 w-auto rounded-2xl shadow-lg ring-1 ring-white/20"
            />
            <div>
              <p className="text-white font-black text-base tracking-tight leading-tight">
                {report.general.organization || 'Reporte de Incidentes'}
              </p>
              <p className="text-blue-300 text-[11px] font-medium uppercase tracking-widest">
                Centro de Respuesta a Incidentes
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className="px-4 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-lg ring-1 ring-white/20"
              style={{ backgroundColor: tlp.bgColor, color: tlp.color }}
            >
              {tlp.label}
            </span>
            <span className="text-blue-400 text-[10px] font-mono">
              ID: {report.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Divider line */}
        <div className="relative mx-10 mt-6 mb-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #3b82f6, #6366f1, transparent)' }} />

        {/* Title block */}
        <div className="relative px-10 pb-4">
          <p className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
            Reporte de Incidente de Seguridad
          </p>
          <h1 className="text-3xl font-black text-white tracking-tight leading-tight mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            {report.general.title || 'Reporte de Incidente'}
          </h1>

          {/* Severity + MITRE chips */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span
              className="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide shadow"
              style={{ backgroundColor: severity.bgColor, color: severity.color, border: `1px solid ${severity.borderColor}` }}
            >
              ● {severity.label}
            </span>
            {report.classification.taxonomy && (
              <>
                <span className="px-3 py-1 rounded-lg bg-indigo-600/80 text-white text-[11px] font-bold ring-1 ring-indigo-400/40">
                  {report.classification.taxonomy.code}
                </span>
                {report.classification.taxonomy.mitreTechniques.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-1 rounded-md bg-white/10 text-blue-200 text-[10px] font-mono ring-1 ring-white/10">
                    {t}
                  </span>
                ))}
              </>
            )}
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Fecha Detección', value: formatDate(report.general.detectionDate) },
              { label: 'Fecha Reporte', value: formatDate(report.general.reportDate) },
              { label: 'Analista', value: report.general.analyst || 'N/A' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl px-4 py-2.5 ring-1 ring-white/10">
                <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-white text-xs font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="relative mt-6 h-1" style={{ background: 'linear-gradient(to right, #2563eb, #6366f1, #8b5cf6)' }} />
      </div>

      <div className="p-8 space-y-8">
        {/* Classification summary */}
        <div className="flex gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-lg text-xs font-bold border"
            style={{ backgroundColor: severity.bgColor, color: severity.color, borderColor: severity.borderColor }}
          >
            Severidad: {severity.label}
          </span>
          {report.classification.taxonomy && (
            <>
              <Badge variant="blue" size="md">{report.classification.taxonomy.code}</Badge>
              {report.classification.taxonomy.mitreTechniques.map((t) => (
                <MitreBadge key={t} technique={t} />
              ))}
              <Badge variant="purple" size="md">{report.classification.nistFunction}</Badge>
            </>
          )}
        </div>

        {/* Executive Summary */}
        {report.executiveSummary && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              1. Resumen Ejecutivo
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.executiveSummary}</p>
          </section>
        )}

        {/* Classification Detail */}
        {report.classification.taxonomy && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              2. Clasificación del Incidente
            </h2>
            <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50 w-40">Taxonomía</td>
                  <td className="px-3 py-2 text-slate-800">
                    {report.classification.taxonomy.code} - {report.classification.taxonomy.name}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">Categoria</td>
                  <td className="px-3 py-2 text-slate-800">{report.classification.taxonomy.areaEffect}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">MITRE ATT&CK</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1 flex-wrap">
                      {report.classification.taxonomy.mitreTechniques.map((t) => (
                        <MitreBadge key={t} technique={t} />
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">NIST-CSF</td>
                  <td className="px-3 py-2 text-slate-800">{report.classification.taxonomy.nistFunction}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">ISO 27002</td>
                  <td className="px-3 py-2 font-mono text-blue-700 font-semibold">{report.classification.taxonomy.isoControls}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">CIS Top 18</td>
                  <td className="px-3 py-2 font-mono text-emerald-700 font-semibold">{report.classification.taxonomy.cisControls}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">Severidad</td>
                  <td className="px-3 py-2">
                    <span style={{ color: severity.color }} className="font-bold">{severity.label}</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-slate-600 bg-slate-50">TLP</td>
                  <td className="px-3 py-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{ backgroundColor: tlp.bgColor, color: tlp.color }}
                    >
                      {tlp.label}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* IOCs */}
        {report.iocs.length > 0 && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              3. Indicadores de Compromiso (IOCs)
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Se identificaron {report.iocs.length} indicador{report.iocs.length !== 1 ? 'es' : ''} de compromiso.
            </p>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="px-3 py-2 font-bold text-[11px]">Tipo</th>
                  <th className="px-3 py-2 font-bold text-[11px]">Valor</th>
                  <th className="px-3 py-2 font-bold text-[11px]">Defanged</th>
                </tr>
              </thead>
              <tbody>
                {report.iocs.map((ioc, idx) => (
                  <tr
                    key={ioc.id}
                    className={`border-t border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    <td className="px-3 py-2 font-bold text-slate-600">{IOC_TYPE_LABELS[ioc.type]}</td>
                    <td className="px-3 py-2 font-mono text-blue-700 font-semibold break-all">{ioc.value}</td>
                    <td className="px-3 py-2 font-mono text-slate-500 break-all">{ioc.defanged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* IOAs */}
        {report.ioas.length > 0 && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-orange-500 pb-1 mb-3">
              4. Indicadores de Ataque (IOAs)
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Se identificaron {report.ioas.length} indicador{report.ioas.length !== 1 ? 'es' : ''} de ataque (comportamiento malicioso).
            </p>
            <table className="w-full text-left text-xs border border-orange-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                  <th className="px-3 py-2 font-bold text-[11px] w-32">Tipo</th>
                  <th className="px-3 py-2 font-bold text-[11px]">Indicador</th>
                  <th className="px-3 py-2 font-bold text-[11px]">Contexto</th>
                </tr>
              </thead>
              <tbody>
                {report.ioas.map((ioa, idx) => (
                  <tr
                    key={ioa.id}
                    className={`border-t border-orange-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}`}
                  >
                    <td className="px-3 py-2 font-bold text-slate-600">{IOA_TYPE_LABELS[ioa.type]}</td>
                    <td className="px-3 py-2 font-mono text-orange-700 font-semibold break-all">{ioa.value}</td>
                    <td className="px-3 py-2 text-slate-600 leading-relaxed">{ioa.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Timeline */}
        {report.timeline.events.length > 0 && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              5. Timeline del Incidente
            </h2>
            <div className="space-y-0">
              {report.timeline.events.map((event, idx) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5" />
                    {idx < report.timeline.events.length - 1 && (
                      <div className="w-0.5 flex-1 bg-blue-200" />
                    )}
                  </div>
                  <div className="pb-3">
                    <p className="text-[11px] font-mono font-semibold text-blue-700">
                      {formatDateLong(event.datetime)}
                    </p>
                    <p className="text-sm text-slate-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Analysis */}
        {report.timeline.technicalAnalysis && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              6. Análisis Técnico
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {report.timeline.technicalAnalysis}
            </p>
          </section>
        )}

        {/* Actions */}
        {(report.actions.containment || report.actions.eradication || report.actions.recovery) && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              7. Acciones de Respuesta
            </h2>
            <div className="space-y-4">
              {report.actions.containment && (
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Contención</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.containment}</p>
                </div>
              )}
              {report.actions.eradication && (
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Erradicación</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.eradication}</p>
                </div>
              )}
              {report.actions.recovery && (
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Recuperación</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.recovery}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {report.actions.recommendations && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              8. Recomendaciones
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.recommendations}</p>
          </section>
        )}

        {/* Recommended Controls from taxonomy */}
        {report.classification.taxonomy?.recommendedControls && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              9. Controles Recomendados (Taxonomía)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {report.classification.taxonomy.recommendedControls}
            </p>
          </section>
        )}

        {/* Lessons Learned */}
        {report.actions.lessonsLearned && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              10. Lecciones Aprendidas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.lessonsLearned}</p>
          </section>
        )}

        {/* Framework mapping */}
        {report.classification.taxonomy && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              11. Mapeo a Frameworks de Seguridad
            </h2>
            <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="px-3 py-2 font-bold text-[11px]">Framework</th>
                  <th className="px-3 py-2 font-bold text-[11px]">Controles / Funciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100 bg-white">
                  <td className="px-3 py-2 font-bold text-indigo-700">MITRE ATT&CK</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1 flex-wrap">
                      {report.classification.taxonomy.mitreTechniques.map((t) => (
                        <MitreBadge key={t} technique={t} />
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50">
                  <td className="px-3 py-2 font-bold text-blue-700">NIST-CSF</td>
                  <td className="px-3 py-2 text-slate-800">{report.classification.taxonomy.nistFunction}</td>
                </tr>
                <tr className="border-t border-slate-100 bg-white">
                  <td className="px-3 py-2 font-bold text-blue-700">ISO 27002</td>
                  <td className="px-3 py-2 font-mono text-blue-700 font-semibold">{report.classification.taxonomy.isoControls}</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50">
                  <td className="px-3 py-2 font-bold text-emerald-700">CIS Top 18</td>
                  <td className="px-3 py-2 font-mono text-emerald-700 font-semibold">{report.classification.taxonomy.cisControls}</td>
                </tr>
                <tr className="border-t border-slate-100 bg-white">
                  <td className="px-3 py-2 font-bold text-violet-700">SCF</td>
                  <td className="px-3 py-2 text-slate-800">{report.classification.taxonomy.scfDomains}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* Footer */}
        <div className="border-t border-slate-200 pt-4 text-center">
          <p className="text-[10px] text-slate-400">
            Reporte generado el {formatDateLong(report.createdAt)}
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            Reporte de Incidentes - mickzz.xyz © 2026 | ID: {report.id.slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
}
