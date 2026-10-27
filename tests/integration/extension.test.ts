import { describe, it, expect } from 'vitest';
import * as vscode from 'vscode';
import { activate, deactivate } from '../../src/extension';

/**
 * Integration tests for Extension Activation.
 * vscode is resolved from tests/helpers/vscode.mock.ts via vitest.config.ts alias.
 */
describe('Extension Activation & Commands Integration', () => {
  it('should activate extension and register commands cleanly', async () => {
    const mockContext = {
      subscriptions: [] as Array<{ dispose: () => void }>,
      extensionUri: { fsPath: 'C:/project-passport' } as unknown as vscode.Uri,
    } as unknown as vscode.ExtensionContext;

    await activate(mockContext);

    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'project-passport.showPassport',
      expect.any(Function),
    );
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'project-passport.scanWorkspace',
      expect.any(Function),
    );

    deactivate();
  });
});
