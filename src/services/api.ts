import type { AegisResponse, ProcessRequest } from '../types/aegis';

export function parseArchitecture(
  arch: string[] | string | undefined
): string[] {
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

export async function processTaskApi(
  req: ProcessRequest
): Promise<{ data: AegisResponse; isMock: boolean }> {
  const response = await fetch('/api/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error(`Backend returned status ${response.status}`);
  }

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return {
    data: {
      ...json,
      architectureBefore: parseArchitecture(json.architectureBefore),
      architectureAfter: parseArchitecture(json.architectureAfter),
    },
    isMock: false,
  };
}