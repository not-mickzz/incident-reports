'use client';

import { Input } from '@/components/ui/Input';
import { useReportStore } from '@/store/report-store';

export function StepGeneral() {
  const { currentReport, updateGeneral } = useReportStore();
  const { general } = currentReport;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Datos Generales</h3>
        <p className="text-xs text-slate-500">Información básica del incidente y del analista</p>
      </div>

      <Input
        label="Titulo del Incidente"
        id="title"
        placeholder="Ej: Inyección SQL en portal de clientes"
        value={general.title}
        onChange={(e) => updateGeneral({ title: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fecha/Hora de Detección"
          id="detectionDate"
          type="datetime-local"
          value={general.detectionDate}
          onChange={(e) => updateGeneral({ detectionDate: e.target.value })}
        />
        <Input
          label="Fecha/Hora del Reporte"
          id="reportDate"
          type="datetime-local"
          value={general.reportDate}
          onChange={(e) => updateGeneral({ reportDate: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Analista"
          id="analyst"
          placeholder="Nombre del analista responsable"
          value={general.analyst}
          onChange={(e) => updateGeneral({ analyst: e.target.value })}
        />
        <Input
          label="Organización"
          id="organization"
          placeholder="Nombre de la organización"
          value={general.organization}
          onChange={(e) => updateGeneral({ organization: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700 block mb-1.5">Logo (opcional)</label>
        <input
          type="file"
          accept="image/*"
          className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => {
                updateGeneral({ logoUrl: ev.target?.result as string });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {general.logoUrl && (
          <div className="mt-2 flex items-center gap-2">
            <img src={general.logoUrl} alt="Logo" className="h-10 w-auto" />
            <button
              onClick={() => updateGeneral({ logoUrl: null })}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
