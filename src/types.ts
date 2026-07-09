/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OrbState =
  | 'idle'
  | 'listening'
  | 'processing'
  | 'thinking'
  | 'speaking'
  | 'completed'
  | 'error'
  | 'disconnected'
  | 'loading'
  | 'synchronizing'
  | 'connecting';

export type ActiveTab =
  | 'workspace'
  | 'dashboard'
  | 'research'
  | 'drafting'
  | 'compare'
  | 'knowledge-graph'
  | 'history'
  | 'settings'
  | 'admin';

export interface LegalCitation {
  act: string;
  section: string;
  title: string;
  relevance: string;
  type: 'BNS' | 'BNSS' | 'BSA' | 'IPC' | 'CrPC' | 'IEA';
}

export interface CaseLaw {
  title: string;
  citation: string;
  year: number;
  court: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  citations?: LegalCitation[];
  cases?: CaseLaw[];
  confidence?: number; // 0-100
  thinkingTime?: number; // in seconds
  draftTemplate?: string;
}

export interface ResearchPlanStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed';
  sourcesFound: number;
}

export interface EvidenceTimelineEvent {
  date: string;
  title: string;
  description: string;
  factType: 'undisputed' | 'disputed' | 'critical';
  source: string;
}

export interface DeepResearchSession {
  goal: string;
  planner: ResearchPlanStep[];
  timeline: EvidenceTimelineEvent[];
  acts: LegalCitation[];
  judgments: CaseLaw[];
  reportMarkdown?: string;
  status: 'idle' | 'planning' | 'gathering' | 'analyzing' | 'done';
}

export interface DraftDocument {
  id: string;
  title: string;
  type: 'notice' | 'complaint' | 'petition' | 'agreement';
  content: string;
  lastUpdated: Date;
  meta: {
    parties: string;
    jurisdiction: string;
    applicableActs: string;
  };
}

export interface CompareResult {
  title: string;
  oldAct: string;
  oldSection: string;
  newAct: string;
  newSection: string;
  similarities: string;
  differences: string;
  implication: string;
  punishmentChange: string;
}
