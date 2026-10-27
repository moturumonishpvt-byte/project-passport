import * as vscode from 'vscode';
import { CoreOrchestrator } from './core/orchestrator';
import { registerShowPassportCommand, registerScanWorkspaceCommand } from './commands/showPassport';
import { logger } from './utils/logger';

let orchestrator: CoreOrchestrator;
let outputChannel: vscode.OutputChannel;

/**
 * Extension activation entry point called by the IDE.
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  logger.info('Activating Project Passport extension (Phase 0 Prototype Baseline)...');

  orchestrator = new CoreOrchestrator();
  outputChannel = vscode.window.createOutputChannel('Project Passport');
  context.subscriptions.push(outputChannel);

  // Register commands
  const showPassportCmd = await registerShowPassportCommand(context, orchestrator);
  const scanWorkspaceCmd = await registerScanWorkspaceCommand(context, orchestrator, outputChannel);

  context.subscriptions.push(showPassportCmd);
  context.subscriptions.push(scanWorkspaceCmd);

  logger.info('Project Passport activated successfully.');
}

/**
 * Extension deactivation cleanup hook.
 */
export function deactivate(): void {
  logger.info('Deactivating Project Passport.');
  if (outputChannel) {
    outputChannel.dispose();
  }
}
