import { RecommendedAction } from './RiskAssessment';

export enum ClaimStatus {
  PENDING = 'PENDING',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class Claim {
  constructor(
    public readonly claimId: string,
    public readonly userId: string,
    public readonly description: string,
    public readonly amount: number,
    public status: ClaimStatus,
    public readonly incidentDate: Date,
    public readonly submittedAt: Date = new Date(),
    public aiRecommendation?: RecommendedAction,
  ) {}

  public setAIRecommendation(recommendation: RecommendedAction): void {
    this.aiRecommendation = recommendation;
    // Always set to MANUAL_REVIEW after AI assessment
    // Human review required due to AI hallucination risk
    this.status = ClaimStatus.MANUAL_REVIEW;
  }

  public approveByHuman(): void {
    this.status = ClaimStatus.APPROVED;
  }

  public rejectByHuman(): void {
    this.status = ClaimStatus.REJECTED;
  }
}
