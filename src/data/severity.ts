import type { Severity, SeverityLevel } from '@/types';

export const SEVERITIES: Record<SeverityLevel, Severity> = {
  crítico: {
    level: 'crítico',
    label: 'Crítico',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    score: [0, 25],
  },
  alto: {
    level: 'alto',
    label: 'Alto',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    score: [26, 50],
  },
  medio: {
    level: 'medio',
    label: 'Medio',
    color: '#0891b2',
    bgColor: '#ecfeff',
    borderColor: '#a5f3fc',
    score: [51, 75],
  },
  bajo: {
    level: 'bajo',
    label: 'Bajo',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    score: [76, 100],
  },
};

export const SEVERITY_LIST: SeverityLevel[] = ['crítico', 'alto', 'medio', 'bajo'];
