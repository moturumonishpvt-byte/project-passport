import { ScannedFile, SymbolRecord, GraphEdge } from '../core/types';

/**
 * Phase 1 & 2: Local SQLite Persistence Contracts
 * Owners: Ashif (Files & DB lifecycle), Nitish (Symbols & Edges)
 */

export interface IFileRepository {
  upsertFile(file: ScannedFile): Promise<void>;
  upsertBatch(files: ScannedFile[]): Promise<void>;
  getFileByPath(filePath: string): Promise<ScannedFile | null>;
  deleteFile(filePath: string): Promise<void>;
  getAllFiles(): Promise<ScannedFile[]>;
}

export interface ISymbolRepository {
  saveSymbols(filePath: string, symbols: SymbolRecord[]): Promise<void>;
  getSymbolsForFile(filePath: string): Promise<SymbolRecord[]>;
  getAllSymbols(): Promise<SymbolRecord[]>;
  deleteSymbolsForFile(filePath: string): Promise<void>;
}

export interface IGraphRepository {
  saveEdges(filePath: string, edges: GraphEdge[]): Promise<void>;
  getEdgesForSymbol(symbolId: string): Promise<{ incoming: GraphEdge[]; outgoing: GraphEdge[] }>;
  getAllEdges(): Promise<GraphEdge[]>;
  deleteEdgesForFile(filePath: string): Promise<void>;
}

export interface IStorageService {
  readonly files: IFileRepository;
  readonly symbols: ISymbolRepository;
  readonly graph: IGraphRepository;

  initialize(databasePath: string): Promise<void>;
  close(): Promise<void>;
  runInTransaction<T>(fn: () => Promise<T>): Promise<T>;
}
