import { ProjectPassportData } from '../core/types';

/**
 * Phase 3: IDE User Interface Contracts
 * Owner: Darshan
 */

export type WebviewMessage =
  | { type: 'ready' }
  | { type: 'refresh' }
  | { type: 'search'; query: string }
  | { type: 'openFile'; filePath: string; line: number; column?: number };

export type WebviewResponse =
  { type: 'stateUpdate'; data: ProjectPassportData } | { type: 'error'; message: string };

export interface IUiService {
  showPassportPanel(): void;
  updateData(data: ProjectPassportData): void;
}
