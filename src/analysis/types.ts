import { AnalysisFinding, DependencyGraph } from '../core/types';

/**
 * Phase 4: Static Analysis Rule Contracts
 * Owner: Monish
 */

export interface IAnalysisRule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  evaluate(graph: DependencyGraph): Promise<AnalysisFinding[]>;
}

export interface IAnalysisService {
  registerRule(rule: IAnalysisRule): void;
  runAnalysis(graph: DependencyGraph): Promise<AnalysisFinding[]>;
}
