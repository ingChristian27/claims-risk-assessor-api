import type { IRiskAssessmentService } from '@domain/ports/IRiskAssessmentService';
import type { Result, DomainError } from '@domain/types';

/**
 * Mock Risk Assessment Service for testing (simple, no logic)
 */
export class MockRiskAssessmentService implements IRiskAssessmentService {
  public async calculateRisk(): Promise<Result<string, DomainError>> {
    return {
      data: JSON.stringify({
        riskScore: 45,
        recommendedAction: 'MANUAL_REVIEW',
        category: 'AUTO',
        reasoning: 'Test assessment',
      }),
    };
  }
}
