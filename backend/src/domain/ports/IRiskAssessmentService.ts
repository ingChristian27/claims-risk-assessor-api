import { RecommendedAction, ClaimCategory } from '@domain/entities/RiskAssessment';
import type { Result, DomainError } from '@domain/types';

export interface RiskCalculationResult {
  riskScore: number;
  recommendedAction: RecommendedAction;
  category: ClaimCategory;
  reasoning: string;
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

// Infrastructure service only returns raw JSON string from AI
export interface IRiskAssessmentService {
  calculateRisk(request: RiskAssessmentRequest): Promise<Result<string, DomainError>>;
}
