import { ProjectPassportData } from '../core/types';

/**
 * Phase 3: Project Passport Data Services Contracts
 * Owner: Darshan
 */

export interface IPassportService {
  /**
   * Aggregates repository intelligence into the unified Project Passport data model.
   */
  generatePassport(workspaceRoot: string): Promise<ProjectPassportData>;
}
