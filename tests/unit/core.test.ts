import { describe, it, expect } from 'vitest';
import { CoreOrchestrator } from '../../src/core/orchestrator';
import { createMockCancellationToken, createMockProgressReporter } from '../helpers/testUtils';

describe('CoreOrchestrator (Phase 0 Baseline)', () => {
  it('should initialize and report idle state', () => {
    const orchestrator = new CoreOrchestrator();
    expect(orchestrator.isIndexing).toBe(false);
  });

  it('should return baseline passport data for a workspace root', async () => {
    const orchestrator = new CoreOrchestrator();
    const data = await orchestrator.getPassportData('C:/projects/my-app');

    expect(data.workspaceName).toBe('my-app');
    expect(data.metrics.totalFiles).toBe(0);
    expect(data.isIndexing).toBe(false);
    expect(data.recentFindings).toEqual([]);
    expect(typeof data.generatedAt).toBe('number');
  });

  it('should sample workspace files safely', async () => {
    const orchestrator = new CoreOrchestrator();
    const { reporter, reports } = createMockProgressReporter();
    const token = createMockCancellationToken(false);

    const files = await orchestrator.sampleWorkspaceFiles('C:/projects/my-app', 5, token, reporter);

    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain('package.json');
    expect(reports.length).toBeGreaterThan(0);
  });

  it('should respect cancellation token during file sampling', async () => {
    const orchestrator = new CoreOrchestrator();
    const cancelledToken = createMockCancellationToken(true);

    const files = await orchestrator.sampleWorkspaceFiles('C:/projects/my-app', 5, cancelledToken);
    expect(files).toEqual([]);
  });

  it('should throw an error if workspace root is empty', async () => {
    const orchestrator = new CoreOrchestrator();
    await expect(orchestrator.sampleWorkspaceFiles('')).rejects.toThrow(
      'Workspace root path must not be empty.',
    );
  });
});
