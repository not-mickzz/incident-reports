import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'TTPSEC - Generador de Reportes de Incidentes de Seguridad',
  description:
    'Genera reportes profesionales de incidentes de seguridad a partir de IOCs y taxonomías estandarizadas. Mapeo a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.',
  metadataBase: new URL('https://www.ttpsec.cl'),
  keywords: [
    'incidentes de seguridad',
    'ciberseguridad',
    'MITRE ATT&CK',
    'IOC',
    'reporte de incidente',
    'NIST-CSF',
    'ISO 27002',
    'CIS Top 18',
    'TTPSEC',
  ],
  authors: [{ name: 'TTPSEC' }],
  openGraph: {
    title: 'TTPSEC - Generador de Reportes de Incidentes',
    description:
      'Genera reportes profesionales de incidentes de seguridad con taxonomía Profesor Vargas v0.2.',
    url: 'https://www.ttpsec.cl',
    siteName: 'TTPSEC',
    images: [
      {
        url: '/logo-ttpsec.png',
        width: 1280,
        height: 1305,
        alt: 'TTPSEC Logo',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'TTPSEC - Generador de Reportes de Incidentes',
    description: 'Genera reportes profesionales de incidentes de seguridad con IOCs y taxonomías.',
    images: ['/logo-ttpsec.png'],
  },
  icons: {
    icon: '/logo-ttpsec.png',
    apple: '/logo-ttpsec.png',
  },
  other: {
    'theme-color': '#1e40af',
    referrer: 'no-referrer',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
