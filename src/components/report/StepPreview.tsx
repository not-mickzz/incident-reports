'use client';

import { useState } from 'react';
import { Download, Printer, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReportDocument } from './ReportDocument';
import { useReportStore } from '@/store/report-store';
import { generatePDF, printReport } from '@/lib/pdf-generator';
import { saveReportToSupabase } from '@/lib/report-service';
import { useRouter } from 'next/navigation';

export function StepPreview() {
  const { currentReport, saveReport } = useReportStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Generar PDF y obtener Blob
      const pdfBlob = await generatePDF(
        'report-document',
        `reporte-${currentReport.id.slice(0, 8)}.pdf`
      );

      // 2. Guardar en Zustand (localStorage)
      saveReport();

      // 3. Subir a Supabase
      await saveReportToSupabase(currentReport, pdfBlob);

      // 4. Redirigir
      router.push(`/reporte?id=${currentReport.id}`);
    } catch (err) {
      alert('Error al guardar: ' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handlePDF = async () => {
    try {
      await generatePDF(
        'report-document',
        `reporte-${currentReport.id.slice(0, 8)}.pdf`
      );
    } catch (err) {
      alert('Error al generar PDF: ' + (err as Error).message);
    }
  };

  const handlePrint = () => {
    printReport('report-document');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">Preview del Reporte</h3>
          <p className="text-xs text-slate-500">Revisa el reporte antes de exportar</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="secondary" size="sm">
            <Printer className="w-3.5 h-3.5" />
            Imprimir
          </Button>
          <Button onClick={handlePDF} variant="danger" size="sm">
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </Button>
          <Button onClick={handleSave} size="sm" disabled={saving}>
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Guardando...' : 'Guardar Reporte'}
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md">
        <ReportDocument report={currentReport} />
      </div>
    </div>
  );
}