import winston from 'winston';
import type { ILogger } from '@domain/ports/ILogger';

/**
 * Winston Logger Adapter (Hexagonal Architecture)
 * Infrastructure implementation of ILogger port
 */
export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(), // JSON for CloudWatch Insights
      ),
      defaultMeta: {
        service: 'claims-risk-assessor',
        environment: process.env.NODE_ENV || 'development',
      },
      transports: [new winston.transports.Console()],
    });
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }
}
