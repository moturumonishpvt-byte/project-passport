import * as vscode from 'vscode';
import { CoreOrchestrator } from '../core/orchestrator';
import { PassportPanel } from '../ui/panel';
import { logger } from '../utils/logger';

/**
 * Command: project-passport.showPassport
 * Displays the Project Passport overview panel.
 */
export async function registerShowPassportCommand(
  context: vscode.ExtensionContext,
  orchestrator: CoreOrchestrator,
): Promise<vscode.Disposable> {
  return vscode.commands.registerCommand('project-passport.showPassport', async () => {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      const workspaceRoot =
        workspaceFolders && workspaceFolders.length > 0 ? workspaceFolders[0].uri.fsPath : '';

      const passportData = await orchestrator.getPassportData(workspaceRoot);
      PassportPanel.createOrShow(context.extensionUri, passportData);
    } catch (err) {
      logger.error('Failed to open Project Passport panel', err);
      vscode.window.showErrorMessage('Unable to open Project Passport panel.');
    }
  });
}

/**
 * Command: project-passport.scanWorkspace
 * Performs a safe Phase 0 baseline workspace sample.
 */
export async function registerScanWorkspaceCommand(
  _context: vscode.ExtensionContext,
  orchestrator: CoreOrchestrator,
  outputChannel: vscode.OutputChannel,
): Promise<vscode.Disposable> {
  return vscode.commands.registerCommand('project-passport.scanWorkspace', async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showWarningMessage('Project Passport: No active workspace folder to scan.');
      return;
    }

    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    outputChannel.show(true);
    outputChannel.appendLine(`[Project Passport] Sampling workspace: ${workspaceRoot}`);

    try {
      const sampledFiles = await orchestrator.sampleWorkspaceFiles(workspaceRoot, 20);
      outputChannel.appendLine(
        `[Project Passport] Discovered ${sampledFiles.length} sample files:`,
      );
      for (const file of sampledFiles) {
        outputChannel.appendLine(`  - ${file}`);
      }
      outputChannel.appendLine('[Project Passport] Phase 0 baseline inspection complete.');
      vscode.window.showInformationMessage(
        `Project Passport: Discovered ${sampledFiles.length} files in baseline sample.`,
      );
    } catch (err) {
      logger.error('Failed to sample workspace files', err);
      vscode.window.showErrorMessage('Project Passport: Failed to sample workspace.');
    }
  });
}
