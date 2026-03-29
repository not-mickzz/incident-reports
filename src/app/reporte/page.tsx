'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReportDocument } from '@/components/report/ReportDocument';
import { useReportStore } from '@/store/report-store';
import { generatePDF, printReport } from '@/lib/pdf-generator';

function ReporteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reports } = useReportStore();
  const id = searchParams.get('id');
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-slate-500 mb-4">Reporte no encontrado</p>
        <Button variant="secondary" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Button>
      </div>
    );
  }

  const handlePDF = async () => {
    try {
      await generatePDF('report-document', `reporte-${report.id.slice(0, 8)}.pdf`);
    } catch (err) {
      alert('Error al generar PDF: ' + (err as Error).message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="secondary" size="sm" onClick={() => router.push('/')}>
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => printReport('report-document')} variant="secondary" size="sm">
            <Printer className="w-3.5 h-3.5" />
            Imprimir
          </Button>
          <Button onClick={handlePDF} variant="danger" size="sm">
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md">
        <ReportDocument report={report} />
      </div>
    </div>
  );
}

export default function ReportePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-slate-400">Cargando reporte...</div>}>
      <ReporteContent />
    </Suspense>
  );
}
