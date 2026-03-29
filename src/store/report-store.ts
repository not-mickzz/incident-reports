'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Report, IOC, IOA, TaxonomyIncident, SeverityLevel, TLPLevel, TimelineEvent } from '@/types';
import { generateId, nowISO } from '@/lib/utils';

function createEmptyReport(): Report {
  return {
    id: generateId(),
    createdAt: nowISO(),
    general: {
      title: '',
      detectionDate: nowISO(),
      reportDate: nowISO(),
      analyst: '',
      organization: '',
      logoUrl: null,
    },
    classification: {
      taxonomy: null,
      severity: 'medio',
      tlp: 'AMBER',
      nistFunction: '',
    },
    iocs: [],
    ioas: [],
    timeline: {
      events: [],
      technicalAnalysis: '',
    },
    actions: {
      containment: '',
      eradication: '',
      recovery: '',
      lessonsLearned: '',
      recommendations: '',
    },
    executiveSummary: '',
  };
}

interface ReportState {
  reports: Report[];
  currentReport: Report;
  currentStep: number;

  // Navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // General
  updateGeneral: (data: Partial<Report['general']>) => void;

  // Classification
  setTaxonomy: (taxonomy: TaxonomyIncident) => void;
  setSeverity: (severity: SeverityLevel) => void;
  setTLP: (tlp: TLPLevel) => void;
  setNistFunction: (fn: string) => void;

  // IOCs
  setIOCs: (iocs: IOC[]) => void;
  addIOCs: (iocs: IOC[]) => void;
  removeIOC: (id: string) => void;
  clearIOCs: () => void;

  // IOAs
  addIOAs: (ioas: IOA[]) => void;
  removeIOA: (id: string) => void;
  clearIOAs: () => void;

  // Timeline
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  removeTimelineEvent: (id: string) => void;
  setTechnicalAnalysis: (text: string) => void;

  // Actions
  updateActions: (data: Partial<Report['actions']>) => void;

  // Executive Summary
  setExecutiveSummary: (text: string) => void;

  // Report management
  saveReport: () => void;
  loadReport: (id: string) => void;
  deleteReport: (id: string) => void;
  newReport: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      reports: [],
      currentReport: createEmptyReport(),
      currentStep: 0,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      updateGeneral: (data) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            general: { ...s.currentReport.general, ...data },
          },
        })),

      setTaxonomy: (taxonomy) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            classification: {
              ...s.currentReport.classification,
              taxonomy,
              severity: taxonomy.impact,
              nistFunction: taxonomy.nistFunction,
            },
          },
        })),

      setSeverity: (severity) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            classification: { ...s.currentReport.classification, severity },
          },
        })),

      setTLP: (tlp) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            classification: { ...s.currentReport.classification, tlp },
          },
        })),

      setNistFunction: (fn) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            classification: { ...s.currentReport.classification, nistFunction: fn },
          },
        })),

      setIOCs: (iocs) =>
        set((s) => ({
          currentReport: { ...s.currentReport, iocs },
        })),

      addIOCs: (iocs) =>
        set((s) => {
          const existingValues = new Set(s.currentReport.iocs.map((i) => i.value.toLowerCase()));
          const newIOCs = iocs.filter((i) => !existingValues.has(i.value.toLowerCase()));
          return {
            currentReport: {
              ...s.currentReport,
              iocs: [...s.currentReport.iocs, ...newIOCs],
            },
          };
        }),

      removeIOC: (id) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            iocs: s.currentReport.iocs.filter((i) => i.id !== id),
          },
        })),

      clearIOCs: () =>
        set((s) => ({
          currentReport: { ...s.currentReport, iocs: [] },
        })),

      addIOAs: (ioas) =>
        set((s) => {
          const existingValues = new Set(s.currentReport.ioas.map((i) => i.value.toLowerCase()));
          const newIOAs = ioas.filter((i) => !existingValues.has(i.value.toLowerCase()));
          return {
            currentReport: {
              ...s.currentReport,
              ioas: [...s.currentReport.ioas, ...newIOAs],
            },
          };
        }),

      removeIOA: (id) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            ioas: s.currentReport.ioas.filter((i) => i.id !== id),
          },
        })),

      clearIOAs: () =>
        set((s) => ({
          currentReport: { ...s.currentReport, ioas: [] },
        })),

      addTimelineEvent: (event) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            timeline: {
              ...s.currentReport.timeline,
              events: [
                ...s.currentReport.timeline.events,
                { ...event, id: generateId() },
              ].sort((a, b) => a.datetime.localeCompare(b.datetime)),
            },
          },
        })),

      removeTimelineEvent: (id) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            timeline: {
              ...s.currentReport.timeline,
              events: s.currentReport.timeline.events.filter((e) => e.id !== id),
            },
          },
        })),

      setTechnicalAnalysis: (text) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            timeline: { ...s.currentReport.timeline, technicalAnalysis: text },
          },
        })),

      updateActions: (data) =>
        set((s) => ({
          currentReport: {
            ...s.currentReport,
            actions: { ...s.currentReport.actions, ...data },
          },
        })),

      setExecutiveSummary: (text) =>
        set((s) => ({
          currentReport: { ...s.currentReport, executiveSummary: text },
        })),

      saveReport: () => {
        const { currentReport, reports } = get();
        const existingIndex = reports.findIndex((r) => r.id === currentReport.id);
        const updated =
          existingIndex >= 0
            ? reports.map((r, i) => (i === existingIndex ? currentReport : r))
            : [currentReport, ...reports];
        set({ reports: updated });
      },

      loadReport: (id) => {
        const report = get().reports.find((r) => r.id === id);
        if (report) set({ currentReport: { ...report }, currentStep: 0 });
      },

      deleteReport: (id) =>
        set((s) => ({
          reports: s.reports.filter((r) => r.id !== id),
        })),

      newReport: () =>
        set({ currentReport: createEmptyReport(), currentStep: 0 }),
    }),
    {
      name: 'incidentes-reports',
      partialize: (state) => ({ reports: state.reports }),
    }
  )
);
