export type ClaimStatus = 'PENDING' | 'MANUAL_REVIEW' | 'APPROVED' | 'REJECTED';

export type RecommendedAction = 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT';

export type ClaimCategory = 'AUTO' | 'HEALTH' | 'HOME' | 'LIFE' | 'PROPERTY' | 'TRAVEL' | 'OTHER';

export interface Claim {
  claimId: string;
  userId: string;
  description: string;
  amount: number;
  status: ClaimStatus;
  aiRecommendation?: RecommendedAction;
  submittedAt: string;
  riskAssessment?: {
    riskScore: number;
    recommendedAction: RecommendedAction;
    category: ClaimCategory;
    reasoning: string;
  };
}

export interface CreateClaimRequest {
  description: string;
  amount: number;
  incidentDate: string;
}

