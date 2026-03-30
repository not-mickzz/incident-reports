'use client';

import { useEffect } from 'react';
import { LOGO_BASE64 } from '@/lib/logo';

export function FaviconInject() {
  useEffect(() => {
    const existing = document.querySelector("link[rel~='icon']");
    if (existing) {
      (existing as HTMLLinkElement).href = LOGO_BASE64;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = LOGO_BASE64;
      document.head.appendChild(link);
    }
  }, []);

  return null;
}
