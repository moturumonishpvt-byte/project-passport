import { describe, it, expect, vi } from 'vitest';
import { Logger } from '../../src/utils/logger';

describe('Logger Utility', () => {
  it('should log info messages with configured prefix', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const customLogger = new Logger('[TestPrefix]');

    customLogger.info('Hello world');
    expect(spy).toHaveBeenCalledWith('[TestPrefix] [INFO] Hello world');
    spy.mockRestore();
  });

  it('should log warn messages with configured prefix', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const customLogger = new Logger('[TestPrefix]');

    customLogger.warn('Warning test');
    expect(spy).toHaveBeenCalledWith('[TestPrefix] [WARN] Warning test');
    spy.mockRestore();
  });

  it('should format Error objects in error logs safely', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const customLogger = new Logger('[TestPrefix]');
    const testErr = new Error('Database locked');

    customLogger.error('Failed to write', testErr);
    expect(spy).toHaveBeenCalled();
    const loggedStr = spy.mock.calls[0][0];
    expect(loggedStr).toContain('Database locked');
    spy.mockRestore();
  });
});
