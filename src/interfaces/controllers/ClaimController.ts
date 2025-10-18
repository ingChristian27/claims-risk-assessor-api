import { Request, Response } from 'express';
import { DomainException } from '@domain/exceptions';
import { ErrorCode, HttpStatus } from '@domain/types';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';

export class ClaimController {
  constructor(
    private createClaimUseCase: CreateClaimUseCase,
    private getClaimByIdUseCase: GetClaimByIdUseCase,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const claimResponse = await this.createClaimUseCase.execute(req.body);
      return res.status(HttpStatus.CREATED).json(claimResponse);
    } catch (error) {
      if (error instanceof DomainException) {
        const statusCode = this.getHttpStatusFromErrorCode(error.code);
        return res.status(statusCode).json({
          error: error.message,
          code: error.code,
          details: error.details,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
      });
    }
  }

  private getHttpStatusFromErrorCode(errorCode: ErrorCode): number {
    const errorCodeMapping: Record<ErrorCode, number> = {
      [ErrorCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
      [ErrorCode.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [ErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
      [ErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
      [ErrorCode.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
      [ErrorCode.CONFLICT]: HttpStatus.CONFLICT,
      [ErrorCode.RATE_LIMIT_EXCEEDED]: HttpStatus.TOO_MANY_REQUESTS,
      [ErrorCode.EXTERNAL_SERVICE_ERROR]: HttpStatus.BAD_GATEWAY,
      [ErrorCode.DATABASE_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
      [ErrorCode.TIMEOUT]: HttpStatus.GATEWAY_TIMEOUT,
      [ErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    return errorCodeMapping[errorCode] || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const claimResponse = await this.getClaimByIdUseCase.execute(id);

      if (!claimResponse) {
        return res.status(404).json({ error: 'Claim not found' });
      }

      return res.status(200).json(claimResponse);
    } catch (error) {
      // TODO: Proper error handling
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
