'use client';

import { useEffect } from 'react';
import { Wizard } from '@/components/report/Wizard';
import { useReportStore } from '@/store/report-store';

export default function NuevoReporte() {
  const { newReport } = useReportStore();

  useEffect(() => {
    newReport();
  }, [newReport]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Wizard />
    </div>
  );
}
