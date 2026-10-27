import { DependencyGraph, GraphEdge, SymbolRecord } from '../core/types';

/**
 * Phase 2: Code Relationship Graph Contracts
 * Owner: Nitish
 */

export interface IGraphService {
  /**
   * Resolves import paths and function call references to build/update the dependency graph.
   */
  resolveGraph(allSymbols: SymbolRecord[], changedFilePaths?: string[]): Promise<DependencyGraph>;

  /**
   * Returns incoming callers and outgoing callees for a specific symbol.
   */
  getCallHierarchy(symbolId: string): Promise<{ callers: GraphEdge[]; callees: GraphEdge[] }>;
}
