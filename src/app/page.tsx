'use client';

import Link from 'next/link';
import { FileText, Shield, Database, Clock, Trash2, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useReportStore } from '@/store/report-store';
import { SEVERITIES } from '@/data/severity';
import { formatDate } from '@/lib/utils';

export default function Dashboard() {
  const { reports, deleteReport } = useReportStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight mb-3">
          Generador de Reportes de Incidentes
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Crea reportes profesionales de incidentes de seguridad con IOCs, taxonomías MITRE ATT&CK,
          mapeo a NIST-CSF, ISO 27002 y CIS Top 18.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/nuevo">
          <Card hover className="text-center h-full">
            <div className="text-3xl mb-3">
              <FileText className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-sm">Nuevo Reporte</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Wizard guiado de 6 pasos para crear un reporte completo de incidente de seguridad
            </p>
          </Card>
        </Link>

        <Card className="text-center">
          <div className="text-3xl mb-3">
            <Shield className="w-8 h-8 text-indigo-600 mx-auto" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1.5 text-sm">42 Taxonomías</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Taxonomía Profesor Vargas v0.2 con mapeo completo a MITRE ATT&CK, NIST-CSF, ISO y CIS
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-3">
            <Database className="w-8 h-8 text-emerald-600 mx-auto" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1.5 text-sm">Auto-Detección IOCs</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pega IOCs sueltos y se detectan automáticamente: IPs, hashes, dominios, URLs, emails
          </p>
        </Card>
      </div>

      {/* Reports List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Reportes Generados
          </h2>
          <span className="text-xs text-slate-400">
            {reports.length} reporte{reports.length !== 1 ? 's' : ''} en sesión
          </span>
        </div>

        {reports.length === 0 ? (
          <Card className="text-center py-12">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No hay reportes generados aun</p>
            <p className="text-xs text-slate-400 mt-1">Crea tu primer reporte con el wizard de 6 pasos</p>
            <Link href="/nuevo" className="inline-block mt-4">
              <Button variant="primary" size="md">Crear Reporte</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => {
              const severity = SEVERITIES[report.classification.severity];
              return (
                <Card key={report.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {report.general.title || 'Sin titulo'}
                      </h3>
                      <Badge
                        variant={
                          severity.level === 'crítico' ? 'red'
                          : severity.level === 'alto' ? 'amber'
                          : severity.level === 'medio' ? 'cyan'
                          : 'emerald'
                        }
                      >
                        {severity.label}
                      </Badge>
                      {report.classification.taxonomy && (
                        <Badge variant="slate">{report.classification.taxonomy.code}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {formatDate(report.createdAt)} | {report.iocs.length} IOCs |{' '}
                      {report.general.analyst || 'Sin analista'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/reporte/${report.id}`}>
                      <Button variant="secondary" size="sm">
                        <Eye className="w-3.5 h-3.5" />
                        Ver
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReport(report.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5">
        <p className="text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-2">
          Herramienta educativa y profesional
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          Esta herramienta genera reportes de incidentes de seguridad en formato profesional.
          Todos los datos se procesan localmente en el navegador. No se almacena información en servidores externos.
          Los reportes se guardan temporalmente en localStorage del navegador.
        </p>
      </div>
    </div>
  );
}
