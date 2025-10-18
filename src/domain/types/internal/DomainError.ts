import { ErrorCode } from './ErrorCode';

export interface DomainError {
  code: ErrorCode;
  message: string;
  url?: string;
  stack?: object;
  details?: unknown;
}
