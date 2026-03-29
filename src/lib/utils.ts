import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date: string | Date, fmt: string = 'dd/MM/yyyy HH:mm'): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, fmt, { locale: es });
}

export function formatDateLong(date: string | Date): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, "EEEE d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
}

export function nowISO(): string {
  return new Date().toISOString().slice(0, 16);
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
