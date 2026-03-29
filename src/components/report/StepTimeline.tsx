'use client';

import { useState } from 'react';
import { Plus, X, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useReportStore } from '@/store/report-store';
import { formatDate, nowISO } from '@/lib/utils';

export function StepTimeline() {
  const { currentReport, addTimelineEvent, removeTimelineEvent, setTechnicalAnalysis } = useReportStore();
  const { timeline } = currentReport;
  const [newDatetime, setNewDatetime] = useState(nowISO());
  const [newDescription, setNewDescription] = useState('');

  const handleAdd = () => {
    if (!newDescription.trim()) return;
    addTimelineEvent({ datetime: newDatetime, description: newDescription.trim() });
    setNewDescription('');
    setNewDatetime(nowISO());
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Timeline y Análisis Técnico</h3>
        <p className="text-xs text-slate-500">Agrega eventos cronológicos del incidente y el análisis técnico</p>
      </div>

      {/* Add event */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <p className="text-xs font-bold text-slate-700">Agregar evento al timeline</p>
        <div className="flex gap-3 items-end">
          <div className="w-56">
            <Input
              type="datetime-local"
              value={newDatetime}
              onChange={(e) => setNewDatetime(e.target.value)}
              label="Fecha/Hora"
              id="event-datetime"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Descripción del evento..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              label="Descripción"
              id="event-desc"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="w-3.5 h-3.5" />
            Agregar
          </Button>
        </div>
      </div>

      {/* Timeline events */}
      {timeline.events.length > 0 && (
        <div className="space-y-0">
          {timeline.events.map((event, idx) => (
            <div key={event.id} className="flex gap-3 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-blue-200 mt-1" />
                {idx < timeline.events.length - 1 && (
                  <div className="w-0.5 flex-1 bg-blue-200" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-blue-700">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatDate(event.datetime)}
                    </p>
                    <p className="text-sm text-slate-700 mt-0.5">{event.description}</p>
                  </div>
                  <button
                    onClick={() => removeTimelineEvent(event.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                  >
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {timeline.events.length === 0 && (
        <div className="text-center py-6 text-xs text-slate-400">
          No hay eventos en el timeline. Agrega el primer evento arriba.
        </div>
      )}

      {/* Technical Analysis */}
      <Textarea
        label="Análisis Técnico"
        id="technical-analysis"
        placeholder="Describe el análisis técnico del incidente: vectores de ataque, artefactos encontrados, comportamiento observado..."
        value={timeline.technicalAnalysis}
        onChange={(e) => setTechnicalAnalysis(e.target.value)}
        className="min-h-[160px]"
      />
    </div>
  );
}
