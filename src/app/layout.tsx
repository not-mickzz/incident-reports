import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Generador de Reportes de Incidentes de Seguridad',
  description:
    'Genera reportes profesionales de incidentes de seguridad a partir de IOCs y taxonomías estandarizadas. Mapeo a MITRE ATT&CK, NIST-CSF, ISO 27002 y CIS Top 18.',
  metadataBase: new URL('https://reportes.mickzz.xyz'),
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
  authors: [{ name: 'mickzz' }],
  openGraph: {
    title: 'Generador de Reportes de Incidentes',
    description:
      'Genera reportes profesionales de incidentes de seguridad con taxonomía Profesor Vargas v0.2.',
    url: 'https://www.ttpsec.cl',
    siteName: 'TTPSEC',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Generador de Reportes de Incidentes',
    description: 'Genera reportes profesionales de incidentes de seguridad con IOCs y taxonomías.',
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
