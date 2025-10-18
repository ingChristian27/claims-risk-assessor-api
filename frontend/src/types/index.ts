export type ClaimStatus = 'PENDING' | 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT';

export type RecommendedAction = 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT';

export interface Claim {
  claimId: string;
  userId: string;
  description: string;
  amount: number;
  status: ClaimStatus;
  submittedAt: string;
  riskAssessment?: {
    riskScore: number;
    recommendedAction: RecommendedAction;
  };
}

export interface CreateClaimRequest {
  description: string;
  amount: number;
  incidentDate: string;
}

