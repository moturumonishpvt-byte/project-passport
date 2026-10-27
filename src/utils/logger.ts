/**
 * Safe Diagnostic Logger
 *
 * Provides structured logging for Project Passport without logging sensitive
 * file contents or leaking credentials.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ILogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, error?: unknown): void;
}

export class Logger implements ILogger {
  private readonly prefix: string;

  constructor(prefix = '[Project Passport]') {
    this.prefix = prefix;
  }

  public debug(message: string, ...args: unknown[]): void {
    if (process.env.DEBUG_PASSPORT) {
      console.info(`${this.prefix} [DEBUG] ${message}`, ...args);
    }
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(`${this.prefix} [INFO] ${message}`, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(`${this.prefix} [WARN] ${message}`, ...args);
  }

  public error(message: string, error?: unknown): void {
    const errorDetails = error instanceof Error ? (error.stack ?? error.message) : String(error);
    console.error(`${this.prefix} [ERROR] ${message} - ${errorDetails}`);
  }
}

export const logger = new Logger();
