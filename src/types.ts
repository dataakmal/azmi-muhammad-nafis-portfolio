export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  title: string;
  company?: string;
  category: 'analytics' | 'dashboard' | 'nlp-ml' | 'survey';
  tools: string[];
  description: string;
  impact: string;
  metric?: string;
  metricLabel?: string;
}

export interface Skill {
  name: string;
  level: number; // percentage (e.g. 90)
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Achievement {
  id: string;
  title: string;
  issuedBy: string;
  description: string;
  label?: string;
}

export interface Certificate {
  title: string;
  owner: string;
  credentialUrl?: string;
}
