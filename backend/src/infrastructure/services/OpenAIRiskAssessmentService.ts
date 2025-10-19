import OpenAI from 'openai';
import { DomainException } from '@domain/exceptions';
import type { Result, DomainError } from '@domain/types';
import { ErrorCode } from '@domain/types';
import type {
  IRiskAssessmentService,
  RiskAssessmentRequest,
} from '@domain/ports/IRiskAssessmentService';

export class OpenAIRiskAssessmentService implements IRiskAssessmentService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  public async calculateRisk(request: RiskAssessmentRequest): Promise<Result<string, DomainError>> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: request.systemMessage,
          },
          {
            role: 'user',
            content: request.userPrompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new DomainException(
          'No response received from OpenAI',
          ErrorCode.EXTERNAL_SERVICE_ERROR,
        );
      }

      // Return raw JSON string - domain will parse it
      return {
        data: response,
      };
    } catch (error) {
      console.error('Error calling OpenAI:', error);

      // If it's already a DomainException, use its code
      if (error instanceof DomainException) {
        return {
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        };
      }

      // Determine error code based on error type
      let errorCode = ErrorCode.EXTERNAL_SERVICE_ERROR;
      if (error instanceof Error) {
        if (error.message.includes('rate limit') || error.message.includes('quota')) {
          errorCode = ErrorCode.RATE_LIMIT_EXCEEDED;
        } else if (error.message.includes('timeout')) {
          errorCode = ErrorCode.TIMEOUT;
        }
      }

      return {
        error: {
          code: errorCode,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          details: error,
        },
      };
    }
  }
}
