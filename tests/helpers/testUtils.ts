import { ICancellationToken, IProgressReporter } from '../../src/core/types';

export function createMockCancellationToken(cancelled = false): ICancellationToken {
  return {
    isCancellationRequested: cancelled,
    onCancellationRequested: (_listener: () => void) => ({ dispose: () => {} }),
  };
}

export function createMockProgressReporter(): {
  reporter: IProgressReporter;
  reports: Array<{ message?: string; increment?: number; total?: number }>;
} {
  const reports: Array<{ message?: string; increment?: number; total?: number }> = [];
  const reporter: IProgressReporter = {
    report: (p) => {
      reports.push(p);
    },
  };
  return { reporter, reports };
}
