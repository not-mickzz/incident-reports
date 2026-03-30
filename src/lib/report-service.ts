import { supabase } from './supabase';
import type { Report } from '@/types';

export async function saveReportToSupabase(
  report: Report,
  pdfBlob: Blob
): Promise<{ pdfPath: string }> {
  // 1. Subir PDF al bucket privado
  const pdfPath = `${report.id}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('pdfs')
    .upload(pdfPath, pdfBlob, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) throw new Error('Error subiendo PDF: ' + uploadError.message);

  // 2. Guardar metadatos en la tabla reports
  const { error: insertError } = await supabase
    .from('reports')
    .upsert({
      id: report.id,
      created_at: report.createdAt,
      data: report,
      pdf_path: pdfPath,
    });

  if (insertError) throw new Error('Error guardando reporte: ' + insertError.message);

  return { pdfPath };
}

export async function getPDFSignedUrl(pdfPath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('pdfs')
    .createSignedUrl(pdfPath, 60 * 60); // 1 hora de validez

  if (error || !data) throw new Error('Error generando URL firmada: ' + error?.message);

  return data.signedUrl;
}