export enum RecommendedAction {
  APPROVE = 'APPROVE',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  REJECT = 'REJECT',
}

export class RiskAssessment {
  constructor(
    public readonly assessmentId: string,
    public readonly claimId: string,
    public readonly riskScore: number,
    public readonly recommendedAction: RecommendedAction,
    public readonly assessedAt: Date,
  ) {
    this.validateRiskScore(riskScore);
  }

  private validateRiskScore(score: number): void {
    if (score < 0 || score > 100) {
      throw new Error('Risk score must be between 0 and 100');
    }
  }
}
