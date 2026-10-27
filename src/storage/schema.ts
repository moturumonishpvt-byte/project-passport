/**
 * Phase 1 Scaffold: SQLite Database Schema Definitions
 * Owner: Ashif (Implementation deferred to Phase 1, TSK-P1-004)
 *
 * Defines the DDL statements for the local SQLite index.
 */

export const SQLITE_SCHEMA_VERSION = 1;

export const CREATE_FILES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS files (
  path TEXT PRIMARY KEY,
  hash TEXT NOT NULL,
  size INTEGER NOT NULL,
  last_modified INTEGER NOT NULL,
  language_id TEXT
);
`;

export const CREATE_SYMBOLS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS symbols (
  id TEXT PRIMARY KEY,
  file_path TEXT NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  parent_symbol_id TEXT,
  FOREIGN KEY (file_path) REFERENCES files(path) ON DELETE CASCADE
);
`;

export const CREATE_EDGES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS graph_edges (
  id TEXT PRIMARY KEY,
  source_file TEXT NOT NULL,
  source_symbol TEXT,
  target_file TEXT NOT NULL,
  target_symbol TEXT,
  kind TEXT NOT NULL,
  FOREIGN KEY (source_file) REFERENCES files(path) ON DELETE CASCADE
);
`;

export const ALL_TABLE_SCHEMAS = [
  CREATE_FILES_TABLE_SQL,
  CREATE_SYMBOLS_TABLE_SQL,
  CREATE_EDGES_TABLE_SQL,
];
