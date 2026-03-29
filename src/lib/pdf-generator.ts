'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(elementId: string, filename: string = 'reporte-incidente.pdf') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Elemento no encontrado: ' + elementId);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = pdfWidth / imgWidth;
  const scaledHeight = imgHeight * ratio;

  let heightLeft = scaledHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = -(scaledHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
}

export function printReport(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Reporte de Incidente</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #1e293b; background: white; padding: 20mm; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #e2e8f0; padding: 6px 8px; text-align: left; font-size: 10pt; }
        th { background: #1e40af; color: white; font-weight: bold; }
        h1 { font-size: 18pt; color: #1e3a8a; margin-bottom: 8px; }
        h2 { font-size: 14pt; color: #1e3a8a; margin: 16px 0 8px; border-bottom: 2px solid #2563eb; padding-bottom: 4px; }
        h3 { font-size: 12pt; color: #334155; margin: 12px 0 6px; }
        p { margin-bottom: 8px; line-height: 1.5; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 9pt; font-weight: bold; }
        @media print { body { padding: 15mm; } }
      </style>
    </head>
    <body>${element.innerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}
