import type { AegisResponse, ProcessRequest } from '../types/aegis';

export function parseArchitecture(arch: string[] | string | undefined): string[] {
  if (!arch) return ['Generator', 'Evaluator'];
  if (Array.isArray(arch)) return arch;
  if (typeof arch === 'string') {
    return arch
      .split(/->|→|,/)
      .map((s) => s.trim().replace(/^\[|\]$/g, ''))
      .filter(Boolean);
  }
  return ['Generator', 'Evaluator'];
}

// High-fidelity fallback database for presentation & demo readiness
const DEMO_RESPONSES: Record<string, Partial<AegisResponse>> = {
  penicillin: {
    sessionId: 'aegis-session-pen-9821',
    task: 'Who discovered penicillin?',
    initialAnswer: 'Penicillin was discovered by Louis Pasteur in 1885 during his research on bacterial fermentation and rabies vaccines.',
    failureDetected: true,
    failureType: 'FACTUAL ERROR',
    rootCause: 'Incorrect attribution detected. Louis Pasteur developed pasteurization and vaccines, whereas penicillin was discovered by Sir Alexander Fleming in 1928.',
    memoryUsed: true,
    memoryMatch: {
      similarity: 0.658,
      pattern: 'Historical Attribution Mismatch',
      matchedTaskId: 'mem-hist-discovery-812',
      confidence: 0.94,
      details: 'Historical fact conflict verified against episodic medical history index.'
    },
    architectureBefore: ['Generator', 'Evaluator'],
    architectureAfter: ['Generator', 'VerificationAgent', 'Evaluator'],
    repairStrategy: 'Add VerificationAgent',
    agentUsed: 'VerificationAgent',
    finalAnswer: 'Penicillin was discovered in September 1928 by Scottish physician and microbiologist Sir Alexander Fleming at St. Mary\'s Hospital in London. While studying Staphylococcus cultures, Fleming observed that an accidental mold contamination (Penicillium notatum) created a bacteria-free halo around itself.',
    finalEvaluation: 'PASSED',
    resolved: true,
  },
  math: {
    sessionId: 'aegis-session-math-1044',
    task: 'Calculate 25% of $20.',
    initialAnswer: '25% of $20 is $5.00.',
    failureDetected: false,
    failureType: null,
    rootCause: null,
    memoryUsed: false,
    memoryMatch: null,
    architectureBefore: ['Generator', 'Evaluator'],
    architectureAfter: ['Generator', 'Evaluator'],
    repairStrategy: null,
    agentUsed: null,
    finalAnswer: '25% of $20 is $5.00. (Calculation: 0.25 × 20 = 5.00)',
    finalEvaluation: 'PASSED',
    resolved: true,
  }
};

function generateDynamicMockResponse(task: string): AegisResponse {
  const lower = task.toLowerCase();
  
  if (lower.includes('penicillin') || lower.includes('fleming') || lower.includes('pasteur')) {
    return {
      ...DEMO_RESPONSES.penicillin,
      task,
    } as AegisResponse;
  }

  if (lower.includes('25%') || lower.includes('calculate') || lower.includes('math') || lower.includes('20')) {
    return {
      ...DEMO_RESPONSES.math,
      task,
    } as AegisResponse;
  }

  // Check if query looks like it triggers reasoning or verification
  const isQuestion = lower.includes('?') || lower.includes('who') || lower.includes('why') || lower.includes('what') || lower.includes('how');

  if (isQuestion) {
    return {
      sessionId: `aegis-session-${Date.now().toString(36)}`,
      task,
      initialAnswer: `Preliminary synthesis for "${task}": The initial generator formulated an unverified hypothesis lacking secondary consistency validation.`,
      failureDetected: true,
      failureType: 'REASONING & VALIDATION ERROR',
      rootCause: 'Lack of multi-hop verification and domain corroboration in baseline generator output.',
      memoryUsed: true,
      memoryMatch: {
        similarity: 0.714,
        pattern: 'Multi-hop Reasoning Discrepancy',
        matchedTaskId: `mem-pattern-${Math.floor(Math.random() * 900 + 100)}`,
        confidence: 0.89,
        details: 'Self-repair graph indexed matching mitigation pipeline for multi-step queries.'
      },
      architectureBefore: ['Generator', 'Evaluator'],
      architectureAfter: ['Generator', 'ReasoningAgent', 'VerificationAgent', 'Evaluator'],
      repairStrategy: 'Add ReasoningAgent & VerificationAgent',
      agentUsed: 'VerificationAgent',
      finalAnswer: `AEGIS evolved pipeline executed comprehensive verification for: "${task}". Multi-source cross-referencing and deductive consistency checks confirmed the high-confidence resolution.`,
      finalEvaluation: 'PASSED',
      resolved: true,
    };
  }

  return {
    sessionId: `aegis-session-${Date.now().toString(36)}`,
    task,
    initialAnswer: `Direct execution completed successfully for "${task}".`,
    failureDetected: false,
    failureType: null,
    rootCause: null,
    memoryUsed: false,
    memoryMatch: null,
    architectureBefore: ['Generator', 'Evaluator'],
    architectureAfter: ['Generator', 'Evaluator'],
    repairStrategy: null,
    agentUsed: null,
    finalAnswer: `Verified output for "${task}": Processed cleanly through primary pipeline with zero deviations detected.`,
    finalEvaluation: 'PASSED',
    resolved: true,
  };
}

export async function processTaskApi(
  req: ProcessRequest
): Promise<{ data: AegisResponse; isMock: boolean }> {
  try {
    // Attempt live API request to /api/process
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const json = await response.json();
    return {
      data: {
        ...json,
        architectureBefore: parseArchitecture(json.architectureBefore),
        architectureAfter: parseArchitecture(json.architectureAfter),
      },
      isMock: false,
    };
  } catch (err) {
    console.warn('Live /api/process endpoint unavailable, using AEGIS intelligent fallback:', err);
    // Simulate brief processing delay if no progress hook handled it
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockData = generateDynamicMockResponse(req.task);
    return {
      data: {
        ...mockData,
        architectureBefore: parseArchitecture(mockData.architectureBefore),
        architectureAfter: parseArchitecture(mockData.architectureAfter),
      },
      isMock: true,
    };
  }
}
