import type { IOC, IOCType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const IOC_PATTERNS: { type: IOCType; pattern: RegExp }[] = [
  { type: 'sha256', pattern: /\b[a-fA-F0-9]{64}\b/g },
  { type: 'sha1', pattern: /\b[a-fA-F0-9]{40}\b/g },
  { type: 'md5', pattern: /\b[a-fA-F0-9]{32}\b/g },
  { type: 'ipv6', pattern: /(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}/g },
  { type: 'url', pattern: /https?:\/\/[^\s<>"']+/gi },
  { type: 'email', pattern: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g },
  { type: 'ipv4', pattern: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g },
  { type: 'domain', pattern: /\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:com|net|org|io|ai|cl|gov|edu|mil|info|biz|co|uk|de|fr|ru|cn|br|ar|mx|es|it|nl|se|no|fi|dk|pt|pl|cz|sk|hu|ro|bg|hr|si|ua|by|kz|jp|kr|in|au|nz|za|ke|ng|eg|sa|ae|il|tr|xyz|top|online|site|tech|dev|app)\b/gi },
];

export function defangIOC(value: string, type: IOCType): string {
  switch (type) {
    case 'ipv4':
    case 'ipv6':
      return value.replace(/\./g, '[.]');
    case 'domain':
      return value.replace(/\./g, '[.]');
    case 'url':
      return value.replace(/^http/i, 'hxxp').replace(/\./g, '[.]');
    case 'email':
      return value.replace('@', '[@]').replace(/\./g, '[.]');
    default:
      return value;
  }
}

export function parseIOCs(text: string): IOC[] {
  const found: IOC[] = [];
  const seenValues = new Set<string>();

  // Refang common defanged inputs first
  const cleaned = text
    .replace(/\[\.\]/g, '.')
    .replace(/hxxp/gi, 'http')
    .replace(/\[@\]/g, '@');

  for (const { type, pattern } of IOC_PATTERNS) {
    const matches = cleaned.matchAll(pattern);
    for (const match of matches) {
      const value = match[0].toLowerCase();
      if (seenValues.has(value)) continue;

      // Skip false positives: hex strings that could be parts of larger strings
      if ((type === 'md5' || type === 'sha1') && seenValues.has(value.slice(0, 64))) continue;

      seenValues.add(value);
      found.push({
        id: uuidv4(),
        type,
        value: match[0],
        defanged: defangIOC(match[0], type),
      });
    }
  }

  return found;
}

export const IOC_TYPE_LABELS: Record<IOCType, string> = {
  ipv4: 'IPv4',
  ipv6: 'IPv6',
  md5: 'MD5',
  sha1: 'SHA-1',
  sha256: 'SHA-256',
  domain: 'Dominio',
  url: 'URL',
  email: 'Email',
};

export const IOC_TYPE_COLORS: Record<IOCType, string> = {
  ipv4: 'blue',
  ipv6: 'blue',
  md5: 'purple',
  sha1: 'purple',
  sha256: 'purple',
  domain: 'cyan',
  url: 'amber',
  email: 'emerald',
};
