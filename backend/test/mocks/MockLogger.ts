import type { ILogger } from '@domain/ports/ILogger';

/**
 * Mock Logger for testing (silent by default)
 */
export class MockLogger implements ILogger {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(_message: string, _meta?: Record<string, unknown>): void {
    // Silent in tests
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(_message: string, _meta?: Record<string, unknown>): void {
    // Silent in tests
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(_message: string, _meta?: Record<string, unknown>): void {
    // Silent in tests
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(_message: string, _meta?: Record<string, unknown>): void {
    // Silent in tests
  }
}
