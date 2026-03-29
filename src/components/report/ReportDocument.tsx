'use client';

import { Badge, MitreBadge } from '@/components/ui/Badge';
import { SEVERITIES } from '@/data/severity';
import { TLP_LEVELS } from '@/data/tlp';
import { IOC_TYPE_LABELS } from '@/lib/ioc-parser';
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
      {/* Cover / Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src={report.general.logoUrl || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-ttpsec.png`}
              alt="Logo"
              className="h-12 w-auto rounded-lg"
            />
            <div>
              <p className="text-xs font-semibold text-blue-200">{report.general.organization || 'Organización'}</p>
              <p className="text-[10px] text-blue-300">Reporte de Incidente de Seguridad</p>
            </div>
          </div>
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ backgroundColor: tlp.bgColor, color: tlp.color }}
          >
            {tlp.label}
          </span>
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-2">
          {report.general.title || 'Reporte de Incidente'}
        </h1>
        <div className="flex gap-6 text-xs text-blue-200">
          <span>Detección: {formatDate(report.general.detectionDate)}</span>
          <span>Reporte: {formatDate(report.general.reportDate)}</span>
          <span>Analista: {report.general.analyst || 'N/A'}</span>
        </div>
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

        {/* Timeline */}
        {report.timeline.events.length > 0 && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              4. Timeline del Incidente
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
              5. Análisis Técnico
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
              6. Acciones de Respuesta
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
              7. Recomendaciónes
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.recommendations}</p>
          </section>
        )}

        {/* Recommended Controls from taxonomy */}
        {report.classification.taxonomy?.recommendedControls && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              8. Controles Recomendados (Taxonomía)
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
              9. Lecciones Aprendidas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{report.actions.lessonsLearned}</p>
          </section>
        )}

        {/* Framework mapping */}
        {report.classification.taxonomy && (
          <section>
            <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-600 pb-1 mb-3">
              10. Mapeo a Frameworks de Seguridad
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
            Reporte generado el {formatDateLong(report.createdAt)} | TTPSEC - Software para el bien común
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            Taxonomía Profesor Vargas v0.2 | ID: {report.id.slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
}
