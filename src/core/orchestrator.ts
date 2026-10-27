import { FileInventory, ICancellationToken, IProgressReporter, ProjectPassportData } from './types';

/**
 * Core Orchestrator interface for Project Passport.
 * Exposes high-level coordination methods consumed by extension commands.
 */
export interface ICoreOrchestrator {
  getPassportData(workspaceRoot: string): Promise<ProjectPassportData>;
  sampleWorkspaceFiles(
    workspaceRoot: string,
    limit?: number,
    token?: ICancellationToken,
    progress?: IProgressReporter,
  ): Promise<string[]>;
}

/**
 * Baseline Core Orchestrator for Phase 0.
 * Coordinates baseline workspace discovery and manages lifecycle events.
 */
export class CoreOrchestrator implements ICoreOrchestrator {
  private lastInventory: FileInventory | null = null;
  private isBusy = false;

  public get isIndexing(): boolean {
    return this.isBusy;
  }

  /**
   * Generates a baseline Project Passport summary.
   * During Phase 0, provides baseline metrics until future phases activate full persistence.
   */
  public async getPassportData(workspaceRoot: string): Promise<ProjectPassportData> {
    const totalFiles = this.lastInventory ? this.lastInventory.totalCount : 0;

    return {
      workspaceName: workspaceRoot.split(/[/\\]/).filter(Boolean).pop() ?? 'Workspace',
      generatedAt: Date.now(),
      metrics: {
        totalFiles,
        totalSymbols: 0,
        totalFunctions: 0,
        totalClasses: 0,
        totalEdges: 0,
        resolvedEdges: 0,
        unresolvedEdges: 0,
      },
      recentFindings: [],
      isIndexing: this.isBusy,
      lastIndexedAt: this.lastInventory?.scannedAt,
    };
  }

  /**
   * Safely inspects a sample of files in the workspace without invoking external services.
   */
  public async sampleWorkspaceFiles(
    workspaceRoot: string,
    limit = 20,
    token?: ICancellationToken,
    progress?: IProgressReporter,
  ): Promise<string[]> {
    if (!workspaceRoot) {
      throw new Error('Workspace root path must not be empty.');
    }

    if (token?.isCancellationRequested) {
      return [];
    }

    progress?.report({ message: 'Sampling workspace paths...' });

    // Phase 0 baseline: non-destructive inspection
    return [
      'package.json',
      'tsconfig.json',
      'src/extension.ts',
      'docs/PHASE_0_README.md',
      '.specify/memory/constitution.md',
    ].slice(0, limit);
  }
}
