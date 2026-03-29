import * as XLSX from 'xlsx';
import type { TaxonomyIncident, SeverityLevel } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface ExcelColumn {
  key: string;
  header: string;
  sampleValues: string[];
}

export interface ParsedExcel {
  columns: ExcelColumn[];
  rows: Record<string, string>[];
  sheetName: string;
}

export function parseExcelFile(file: File): Promise<ParsedExcel> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' });

        if (json.length === 0) {
          reject(new Error('El archivo Excel esta vacio'));
          return;
        }

        const headers = Object.keys(json[0]);
        const columns: ExcelColumn[] = headers.map((header) => ({
          key: header,
          header,
          sampleValues: json.slice(0, 3).map((row) => String(row[header] || '')),
        }));

        resolve({ columns, rows: json, sheetName });
      } catch (err) {
        reject(new Error('Error al leer el archivo Excel: ' + (err as Error).message));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(file);
  });
}

function normalizeSeverity(value: string): SeverityLevel {
  const lower = value.toLowerCase().trim();
  if (lower.includes('crit') || lower.includes('criti')) return 'crítico';
  if (lower.includes('alt') || lower.includes('high')) return 'alto';
  if (lower.includes('med') || lower.includes('medium')) return 'medio';
  if (lower.includes('baj') || lower.includes('low')) return 'bajo';
  return 'medio';
}

export interface ColumnMapping {
  code: string;
  name: string;
  category: string;
  mitreTechniques: string;
  nistFunction: string;
  isoControls: string;
  cisControls: string;
  impact: string;
  recommendedControls: string;
}

export function mapExcelToTaxonomies(
  rows: Record<string, string>[],
  mapping: ColumnMapping
): TaxonomyIncident[] {
  return rows
    .filter((row) => row[mapping.code] && row[mapping.name])
    .map((row) => ({
      code: row[mapping.code] || `CUSTOM-${uuidv4().slice(0, 4)}`,
      category: row[mapping.category] || 'Custom',
      areaEffect: row[mapping.category] || 'Custom',
      name: row[mapping.name] || '',
      mitreTechniques: (row[mapping.mitreTechniques] || '')
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean),
      nistFunction: row[mapping.nistFunction] || '',
      isoControls: row[mapping.isoControls] || '',
      cisControls: row[mapping.cisControls] || '',
      scfDomains: '',
      impact: normalizeSeverity(row[mapping.impact] || 'medio'),
      recommendedControls: row[mapping.recommendedControls] || '',
    }));
}
