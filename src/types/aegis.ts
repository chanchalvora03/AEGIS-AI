export interface ProcessRequest {
  task: string;
}

export interface MemoryMatchData {
  similarity?: number;
  matchedTaskId?: string;
  pattern?: string;
  solution?: string;
  confidence?: number;
  details?: Record<string, unknown> | string;
  [key: string]: unknown;
}

export interface AegisResponse {
  sessionId?: string;
  task: string;
  initialAnswer: string;
  failureDetected: boolean;
  failureType?: string | null;
  rootCause?: string | null;
  memoryUsed: boolean;
  memoryMatch?: MemoryMatchData | string | null;
  architectureBefore: string[] | string;
  architectureAfter: string[] | string;
  repairStrategy?: string | null;
  agentUsed?: string | null;
  finalAnswer: string;
  finalEvaluation: {
  	failureDetected: boolean;
  	failureType: string;
  	rootCause?: string | null;
  } | string;
  resolved: boolean;
}

export type ProcessingStageId =
  | 'GENERATOR'
  | 'EVALUATOR'
  | 'FAILURE_DETECTED'
  | 'CLASSIFY'
  | 'MEMORY'
  | 'ADAPT'
  | 'REPAIR'
  | 'VERIFY';

export interface PipelineStageInfo {
  id: ProcessingStageId;
  label: string;
  description: string;
  iconName: string;
}
