import { ICancellationToken, ScannedFile, SymbolRecord } from '../core/types';

/**
 * Phase 2: Tree-sitter Language Parser Contracts
 * Owner: Nitish
 */

export interface ParseResult {
  filePath: string;
  languageId: string;
  symbols: SymbolRecord[];
  hasParseErrors: boolean;
  diagnostics?: string[];
}

export interface IParserService {
  /**
   * Identifies if this parser service supports the given language.
   */
  supportsLanguage(languageId: string): boolean;

  /**
   * Parses the given file and extracts all declared symbols.
   */
  parseFile(file: ScannedFile, content: string, token?: ICancellationToken): Promise<ParseResult>;
}
