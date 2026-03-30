'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export async function generatePDF(
  elementId: string,
  filename: string = 'reporte-incidente.pdf'
): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Elemento no encontrado: ' + elementId);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = pdfWidth / imgWidth;

  // Altura de una página en píxeles del canvas
  const pageHeightPx = pdfHeight / ratio;

  // Obtener posiciones Y de cada <section> en píxeles del canvas
  const elementRect = element.getBoundingClientRect();
  const sections = element.querySelectorAll<HTMLElement>('section');
  const sectionOffsets = Array.from(sections).map((s) => {
    const rect = s.getBoundingClientRect();
    return (rect.top - elementRect.top) * 2; // *2 por scale:2
  });

  // Calcular cortes de página inteligentes
  const pageBreaks: number[] = [];
  let pageStart = 0;

  while (pageStart < imgHeight) {
    let pageEnd = pageStart + pageHeightPx;

    if (pageEnd >= imgHeight) break;

    // Buscar la sección más cercana antes del corte
    const nextBreak = sectionOffsets.find(
      (offset) => offset > pageStart + pageHeightPx * 0.5 && offset < pageEnd
    );

    if (nextBreak !== undefined) {
      pageEnd = nextBreak;
    }

    pageBreaks.push(pageEnd);
    pageStart = pageEnd;
  }

  // Generar páginas del PDF
  let currentY = 0;
  const breaks = [...pageBreaks, imgHeight];

  for (let i = 0; i < breaks.length; i++) {
    const sliceStart = currentY;
    const sliceEnd = breaks[i];
    const sliceHeight = sliceEnd - sliceStart;

    // Crear canvas recortado para esta página
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = imgWidth;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext('2d')!;
    ctx.drawImage(canvas, 0, sliceStart, imgWidth, sliceHeight, 0, 0, imgWidth, sliceHeight);

    const pageImg = pageCanvas.toDataURL('image/png');
    const scaledSliceHeight = sliceHeight * ratio;

    if (i > 0) pdf.addPage();
    pdf.addImage(pageImg, 'PNG', 0, 0, pdfWidth, scaledSliceHeight);

    currentY = sliceEnd;
  }

  pdf.save(filename);
  return pdf.output('blob');
}

export function printReport(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const style = printWindow.document.createElement('style');
  style.textContent = `
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
  `;

  const body = printWindow.document.createElement('div');
  body.innerHTML = element.innerHTML;

  printWindow.document.head.appendChild(style);
  printWindow.document.body.appendChild(body);
  printWindow.document.title = 'Reporte de Incidente';

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}