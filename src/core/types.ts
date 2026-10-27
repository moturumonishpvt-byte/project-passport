/**
 * Project Passport — Core System Types & Interfaces
 *
 * These contracts establish the stable inter-module boundaries across:
 * - Scanner (Phase 1 — Ashif)
 * - Parser & Graph (Phase 2 — Nitish)
 * - UI & Passport (Phase 3 — Darshan)
 * - Analysis & Integration (Phase 4 — Monish)
 */

/**
 * Standard cancellation token abstraction, decoupled from IDE-specific APIs.
 */
export interface ICancellationToken {
  readonly isCancellationRequested: boolean;
  onCancellationRequested(listener: () => void): { dispose(): void };
}

/**
 * Progress reporter for background indexing or parsing tasks.
 */
export interface IProgressReporter {
  report(progress: { message?: string; increment?: number; total?: number }): void;
}

/**
 * 1-indexed source code location range.
 */
export interface SourceLocation {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

/**
 * Metadata and fingerprint for a discovered source file.
 */
export interface ScannedFile {
  /** Workspace-relative file path (forward slashes) */
  relativePath: string;
  /** Absolute filesystem path */
  absolutePath: string;
  /** SHA-256 content hash in hexadecimal format */
  contentHash: string;
  /** File size in bytes */
  sizeBytes: number;
  /** Detected language identifier (e.g., 'typescript', 'javascript', 'python') */
  languageId: string;
  /** Epoch timestamp of last disk modification */
  lastModifiedMs: number;
}

/**
 * Complete inventory of files discovered in the workspace.
 */
export interface FileInventory {
  workspaceRoot: string;
  scannedAt: number;
  files: Map<string, ScannedFile>;
  totalCount: number;
  totalSizeBytes: number;
}

/**
 * Code symbol representation extracted by syntax parser.
 */
export type SymbolKind =
  'function' | 'method' | 'class' | 'interface' | 'type' | 'variable' | 'import' | 'export';

export interface SymbolRecord {
  /** Unique deterministic identifier: `${filePath}#${name}:${startLine}` */
  id: string;
  /** File path relative to workspace root */
  filePath: string;
  /** Symbol name */
  name: string;
  /** Symbol classification */
  kind: SymbolKind;
  /** Exact source location range */
  location: SourceLocation;
  /** Parent symbol ID if nested inside a class/namespace */
  parentId?: string;
  /** Export visibility */
  isExported: boolean;
}

/**
 * Directional relationship edge between code elements.
 */
export type EdgeType = 'imports' | 'calls' | 'extends' | 'implements';

export type ResolutionStatus = 'resolved' | 'unresolved' | 'ambiguous';

export interface GraphEdge {
  id: string;
  sourceSymbolId: string;
  /** Target symbol ID if resolved within the repository */
  targetSymbolId?: string;
  /** Target identifier name (e.g. imported symbol or invoked function name) */
  targetName: string;
  /** Edge relationship classification */
  edgeType: EdgeType;
  /** Resolution status */
  status: ResolutionStatus;
  /** Source file location where relationship is defined */
  sourceLocation: SourceLocation;
}

export interface GraphNode {
  id: string;
  symbol: SymbolRecord;
  incomingEdgeIds: string[];
  outgoingEdgeIds: string[];
}

export interface DependencyGraph {
  nodes: Map<string, GraphNode>;
  edges: Map<string, GraphEdge>;
  unresolvedCount: number;
  createdAt: number;
}

/**
 * Static analysis finding produced by architectural rules.
 */
export type FindingSeverity = 'info' | 'warning' | 'critical';

export interface AnalysisFinding {
  id: string;
  ruleId: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  filePath: string;
  location: SourceLocation;
  evidence?: Record<string, unknown>;
}

/**
 * Aggregated Project Passport metrics and document payload.
 */
export interface ProjectPassportData {
  workspaceName: string;
  generatedAt: number;
  metrics: {
    totalFiles: number;
    totalSymbols: number;
    totalFunctions: number;
    totalClasses: number;
    totalEdges: number;
    resolvedEdges: number;
    unresolvedEdges: number;
  };
  recentFindings: AnalysisFinding[];
  isIndexing: boolean;
  lastIndexedAt?: number;
}
