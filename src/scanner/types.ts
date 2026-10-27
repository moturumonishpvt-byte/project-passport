import { ICancellationToken, IProgressReporter, ScannedFile, FileInventory } from '../core/types';

/**
 * Phase 1: Repository Scanner Contracts
 * Owner: Ashif
 */

export interface ScannerOptions {
  workspaceRoot: string;
  ignoredPatterns?: string[];
  maxFileSizeBytes?: number;
}

export interface FileChangeEvent {
  type: 'added' | 'modified' | 'deleted';
  filePath: string;
}

export interface IScannerService {
  /**
   * Performs a complete workspace discovery and returns the file inventory.
   */
  scanAll(
    options: ScannerOptions,
    token?: ICancellationToken,
    progress?: IProgressReporter,
  ): Promise<FileInventory>;

  /**
   * Incrementally processes changed files.
   */
  processChanges(changes: FileChangeEvent[], token?: ICancellationToken): Promise<ScannedFile[]>;
}
