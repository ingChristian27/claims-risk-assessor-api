import { Claim } from '@domain/entities/Claim';
import { RiskAssessment, RecommendedAction } from '@domain/entities/RiskAssessment';

interface RiskCalculationResult {
  riskScore: number;
  recommendedAction: RecommendedAction;
}

export class RiskAssessmentService {
  public calculateRisk(claim: Claim): RiskCalculationResult {
    // TODO: Implement real risk calculation algorithm
    // MOCK: Simple calculation based on amount
    const riskScore = claim.amount < 1000 ? 10 : 30;
    const recommendedAction =
      riskScore < 30 ? RecommendedAction.APPROVE : RecommendedAction.MANUAL_REVIEW;

    return { riskScore, recommendedAction };
  }

  public createAssessment(
    claimId: string,
    riskScore: number,
    recommendedAction: RecommendedAction,
  ): RiskAssessment {
    return new RiskAssessment(
      `assessment-${Date.now()}`,
      claimId,
      riskScore,
      recommendedAction,
      new Date(),
    );
  }
}
