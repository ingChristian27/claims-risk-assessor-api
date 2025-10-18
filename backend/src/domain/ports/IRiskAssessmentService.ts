import { RecommendedAction } from '@domain/entities/RiskAssessment';
import type { Result, DomainError } from '@domain/types';

export interface RiskCalculationResult {
  riskScore: number;
  recommendedAction: RecommendedAction;
}

export interface RiskAssessmentRequest {
  systemMessage: string;
  userPrompt: string;
  claimData: {
    description: string;
    amount: number;
    submissionDate: string;
  };
}

export interface IRiskAssessmentService {
  calculateRisk(
    request: RiskAssessmentRequest,
  ): Promise<Result<RiskCalculationResult, DomainError>>;
}
