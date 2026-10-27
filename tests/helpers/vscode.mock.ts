/**
 * VS Code Namespace Mock for Vitest Integration Tests
 *
 * This mock provides the minimum vscode API surface needed to run
 * extension tests outside the full VS Code Extension Development Host.
 * It is wired via the `resolve.alias` in vitest.config.ts.
 */

import { vi } from 'vitest';

const commandRegistry = new Map<string, (...args: unknown[]) => unknown>();

export const commands = {
  registerCommand: vi.fn((command: string, callback: (...args: unknown[]) => unknown) => {
    commandRegistry.set(command, callback);
    return { dispose: () => commandRegistry.delete(command) };
  }),
  executeCommand: vi.fn(async (command: string, ...args: unknown[]) => {
    const handler = commandRegistry.get(command);
    if (handler) return handler(...args);
    return undefined;
  }),
};

export const window = {
  createOutputChannel: vi.fn(() => ({
    appendLine: vi.fn(),
    show: vi.fn(),
    dispose: vi.fn(),
  })),
  createWebviewPanel: vi.fn(() => ({
    webview: {
      html: '',
      onDidReceiveMessage: vi.fn(() => ({ dispose: vi.fn() })),
      postMessage: vi.fn(),
    },
    reveal: vi.fn(),
    onDidDispose: vi.fn((_cb: () => void) => ({ dispose: vi.fn() })),
    dispose: vi.fn(),
    viewColumn: 1,
  })),
  showInformationMessage: vi.fn(),
  showWarningMessage: vi.fn(),
  showErrorMessage: vi.fn(),
  showTextDocument: vi.fn(),
  activeTextEditor: undefined,
};

export const workspace = {
  workspaceFolders: [
    {
      uri: { fsPath: 'C:/mock/workspace', joinPath: vi.fn() },
      name: 'mock-workspace',
      index: 0,
    },
  ],
  openTextDocument: vi.fn(async () => ({
    uri: { fsPath: 'C:/mock/workspace/src/extension.ts' },
  })),
};

export const Uri = {
  joinPath: vi.fn((_base: unknown, ...segments: string[]) => ({
    fsPath: segments.join('/'),
  })),
  file: vi.fn((p: string) => ({ fsPath: p })),
};

export const ViewColumn = { One: 1, Two: 2, Three: 3 };

export const Position = vi.fn((line: number, character: number) => ({ line, character }));
export const Range = vi.fn((start: unknown, end: unknown) => ({ start, end }));
export const Selection = vi.fn((anchor: unknown, active: unknown) => ({ anchor, active }));
export const TextEditorRevealType = { InCenter: 2 };

export const Disposable = { from: vi.fn() };
