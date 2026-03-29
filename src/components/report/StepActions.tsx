'use client';

import { Textarea } from '@/components/ui/Textarea';
import { useReportStore } from '@/store/report-store';

export function StepActions() {
  const { currentReport, updateActions, setExecutiveSummary } = useReportStore();
  const { actions, executiveSummary } = currentReport;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Acciones y Recomendaciónes</h3>
        <p className="text-xs text-slate-500">Documenta las acciones de respuesta al incidente</p>
      </div>

      <Textarea
        label="Resumen Ejecutivo"
        id="executive-summary"
        placeholder="Resumen breve del incidente para audiencia no técnica (directivos, gerencia)..."
        value={executiveSummary}
        onChange={(e) => setExecutiveSummary(e.target.value)}
        className="min-h-[100px]"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Textarea
          label="Contención"
          id="containment"
          placeholder="Acciones inmediatas para detener el incidente..."
          value={actions.containment}
          onChange={(e) => updateActions({ containment: e.target.value })}
          className="min-h-[120px]"
        />
        <Textarea
          label="Erradicación"
          id="eradication"
          placeholder="Acciones para eliminar la causa raíz..."
          value={actions.eradication}
          onChange={(e) => updateActions({ eradication: e.target.value })}
          className="min-h-[120px]"
        />
        <Textarea
          label="Recuperación"
          id="recovery"
          placeholder="Pasos para restaurar operaciónes normales..."
          value={actions.recovery}
          onChange={(e) => updateActions({ recovery: e.target.value })}
          className="min-h-[120px]"
        />
      </div>

      <Textarea
        label="Lecciones Aprendidas"
        id="lessons"
        placeholder="¿Qué se puede mejorar para prevenir incidentes similares..."
        value={actions.lessonsLearned}
        onChange={(e) => updateActions({ lessonsLearned: e.target.value })}
      />

      <Textarea
        label="Recomendaciónes"
        id="recommendations"
        placeholder="Recomendaciónes específicas de seguridad para la organización..."
        value={actions.recommendations}
        onChange={(e) => updateActions({ recommendations: e.target.value })}
      />
    </div>
  );
}
