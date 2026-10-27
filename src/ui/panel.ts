import * as vscode from 'vscode';
import { ProjectPassportData } from '../core/types';
import { logger } from '../utils/logger';

/**
 * Project Passport Webview Panel
 * Provides local visualization for Phase 0 baseline and beyond.
 */
export class PassportPanel {
  public static currentPanel: PassportPanel | undefined;
  public static readonly viewType = 'projectPassport.panel';

  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(
    extensionUri: vscode.Uri,
    initialData: ProjectPassportData,
  ): PassportPanel {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (PassportPanel.currentPanel) {
      PassportPanel.currentPanel._panel.reveal(column);
      PassportPanel.currentPanel.update(initialData);
      return PassportPanel.currentPanel;
    }

    const panel = vscode.window.createWebviewPanel(
      PassportPanel.viewType,
      'Project Passport',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [extensionUri],
      },
    );

    PassportPanel.currentPanel = new PassportPanel(panel, extensionUri, initialData);
    return PassportPanel.currentPanel;
  }

  private constructor(
    panel: vscode.WebviewPanel,
    _extensionUri: vscode.Uri,
    initialData: ProjectPassportData,
  ) {
    this._panel = panel;

    this.update(initialData);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.type) {
          case 'openFile':
            if (message.filePath) {
              await this._handleOpenFile(message.filePath, message.line ?? 1);
            }
            break;
          case 'ready':
            logger.debug('Webview ready message received.');
            break;
        }
      },
      null,
      this._disposables,
    );
  }

  public update(data: ProjectPassportData): void {
    this._panel.webview.html = this._getHtmlForWebview(data);
  }

  private async _handleOpenFile(relativePath: string, line: number): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showWarningMessage('No workspace open to locate the file.');
      return;
    }

    try {
      const targetUri = vscode.Uri.joinPath(workspaceFolders[0].uri, relativePath);
      const doc = await vscode.workspace.openTextDocument(targetUri);
      const editor = await vscode.window.showTextDocument(doc);
      const targetLine = Math.max(0, line - 1);
      const position = new vscode.Position(targetLine, 0);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.InCenter,
      );
    } catch (err) {
      logger.error(`Unable to open file: ${relativePath}`, err);
      vscode.window.showErrorMessage(`Unable to open file: ${relativePath}`);
    }
  }

  private _getHtmlForWebview(data: ProjectPassportData): string {
    const nonce = this._getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Passport</title>
  <style>
    body {
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif);
      color: var(--vscode-foreground);
      background-color: var(--vscode-editor-background);
      padding: 24px;
      line-height: 1.5;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--vscode-foreground);
      margin-bottom: 4px;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      font-size: 0.75rem;
      border-radius: 12px;
      background-color: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      margin-bottom: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .card {
      background-color: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-widget-border, #333);
      border-radius: 6px;
      padding: 16px;
    }
    .card-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .card-value {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--vscode-widget-border, #333);
      padding-bottom: 6px;
    }
    .file-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .file-item {
      padding: 8px 12px;
      background: var(--vscode-editorWidget-background);
      margin-bottom: 6px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .file-link {
      color: var(--vscode-textLink-foreground);
      cursor: pointer;
      text-decoration: underline;
    }
    .privacy-notice {
      margin-top: 32px;
      padding: 12px 16px;
      border-radius: 6px;
      background-color: var(--vscode-inputValidation-infoBackground, #1e3a5f);
      border: 1px solid var(--vscode-inputValidation-infoBorder, #3b82f6);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <h1>Project Passport</h1>
  <div class="badge">Phase 0 Starter Baseline</div>

  <div class="grid">
    <div class="card">
      <div class="card-title">Workspace</div>
      <div class="card-value" style="font-size: 1.1rem;">${this._escapeHtml(data.workspaceName)}</div>
    </div>
    <div class="card">
      <div class="card-title">Files Tracked</div>
      <div class="card-value">${data.metrics.totalFiles}</div>
    </div>
    <div class="card">
      <div class="card-title">Symbols</div>
      <div class="card-value">${data.metrics.totalSymbols}</div>
    </div>
    <div class="card">
      <div class="card-title">Analysis Mode</div>
      <div class="card-value" style="font-size: 1.1rem;">Local-First</div>
    </div>
  </div>

  <div class="section-title">Baseline Workspace Exploration</div>
  <p>Click any baseline file to open it in your editor:</p>
  <ul class="file-list">
    <li class="file-item">
      <span><code>package.json</code></span>
      <span class="file-link" onclick="openFile('package.json', 1)">Open</span>
    </li>
    <li class="file-item">
      <span><code>docs/PHASE_0_README.md</code></span>
      <span class="file-link" onclick="openFile('docs/PHASE_0_README.md', 1)">Open</span>
    </li>
    <li class="file-item">
      <span><code>.specify/memory/constitution.md</code></span>
      <span class="file-link" onclick="openFile('.specify/memory/constitution.md', 1)">Open</span>
    </li>
  </ul>

  <div class="privacy-notice">
    <strong>🛡️ Local-First Privacy Guarantee:</strong>
    Project Passport runs 100% locally on your machine. No source code or tokens are ever uploaded. Zero AI coding-agent credits consumed.
  </div>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    function openFile(filePath, line) {
      vscode.postMessage({ type: 'openFile', filePath, line });
    }
    vscode.postMessage({ type: 'ready' });
  </script>
</body>
</html>`;
  }

  private _escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private _getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public dispose(): void {
    PassportPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
