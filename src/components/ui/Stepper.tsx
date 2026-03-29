'use client';

import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        let buttonClass = 'text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all';
        if (isActive) {
          buttonClass += ' bg-blue-600 text-white';
        } else if (isCompleted) {
          buttonClass += ' bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100';
        } else {
          buttonClass += ' text-slate-400 hover:text-slate-600 hover:bg-slate-100';
        }

        return (
          <button
            key={index}
            className={buttonClass}
            onClick={() => onStepClick?.(index)}
            disabled={!isCompleted && !isActive}
          >
            <span className="inline-flex items-center gap-1">
              {isCompleted && <Check className="w-3 h-3" />}
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
