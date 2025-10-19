export enum RecommendedAction {
  APPROVE = 'APPROVE',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  REJECT = 'REJECT',
}

export enum ClaimCategory {
  AUTO = 'AUTO',
  HEALTH = 'HEALTH',
  HOME = 'HOME',
  LIFE = 'LIFE',
  PROPERTY = 'PROPERTY',
  TRAVEL = 'TRAVEL',
  OTHER = 'OTHER',
}

export class RiskAssessment {
  constructor(
    public readonly assessmentId: string,
    public readonly claimId: string,
    public readonly riskScore: number,
    public readonly recommendedAction: RecommendedAction,
    public readonly category: ClaimCategory,
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
