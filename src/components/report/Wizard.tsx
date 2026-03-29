'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/ui/Stepper';
import { useReportStore } from '@/store/report-store';
import { StepGeneral } from './StepGeneral';
import { StepClassification } from './StepClassification';
import { StepIOCs } from './StepIOCs';
import { StepTimeline } from './StepTimeline';
import { StepActions } from './StepActions';
import { StepPreview } from './StepPreview';

const STEPS = [
  { label: 'General', description: 'Datos básicos' },
  { label: 'Clasificación', description: 'Taxonomía y severidad' },
  { label: 'IOCs', description: 'Indicadores de compromiso' },
  { label: 'Timeline', description: 'Cronología y análisis' },
  { label: 'Acciones', description: 'Respuesta y recomendaciónes' },
  { label: 'Preview', description: 'Revision y exportación' },
];

export function Wizard() {
  const { currentStep, setStep, nextStep, prevStep } = useReportStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepGeneral />;
      case 1: return <StepClassification />;
      case 2: return <StepIOCs />;
      case 3: return <StepTimeline />;
      case 4: return <StepActions />;
      case 5: return <StepPreview />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setStep} />
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-400">
          Paso {currentStep + 1} de {STEPS.length}: {STEPS[currentStep].description}
        </p>
      </div>

      {/* Step content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          size="md"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>
        {currentStep < STEPS.length - 1 && (
          <Button
            variant="primary"
            size="md"
            onClick={nextStep}
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
