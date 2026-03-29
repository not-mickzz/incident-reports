export type IOCType = 'ipv4' | 'ipv6' | 'md5' | 'sha1' | 'sha256' | 'domain' | 'url' | 'email';

export interface IOC {
  id: string;
  type: IOCType;
  value: string;
  defanged: string;
}

export type SeverityLevel = 'crítico' | 'alto' | 'medio' | 'bajo';

export interface Severity {
  level: SeverityLevel;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  score: [number, number];
}

export type TLPLevel = 'RED' | 'AMBER+STRICT' | 'AMBER' | 'GREEN' | 'CLEAR';

export interface TLP {
  level: TLPLevel;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface TaxonomyIncident {
  code: string;
  category: string;
  areaEffect: string;
  name: string;
  mitreTechniques: string[];
  nistFunction: string;
  isoControls: string;
  cisControls: string;
  scfDomains: string;
  impact: SeverityLevel;
  recommendedControls: string;
}

export interface TimelineEvent {
  id: string;
  datetime: string;
  description: string;
}

export interface Report {
  id: string;
  createdAt: string;
  general: {
    title: string;
    detectionDate: string;
    reportDate: string;
    analyst: string;
    organization: string;
    logoUrl: string | null;
  };
  classification: {
    taxonomy: TaxonomyIncident | null;
    severity: SeverityLevel;
    tlp: TLPLevel;
    nistFunction: string;
  };
  iocs: IOC[];
  timeline: {
    events: TimelineEvent[];
    technicalAnalysis: string;
  };
  actions: {
    containment: string;
    eradication: string;
    recovery: string;
    lessonsLearned: string;
    recommendations: string;
  };
  executiveSummary: string;
}
