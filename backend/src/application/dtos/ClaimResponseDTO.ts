export interface ClaimResponseDTO {
  claimId: string;
  userId: string;
  description: string;
  amount: number;
  status: string;
  aiRecommendation?: string;
  submittedAt: Date;
  riskAssessment?: {
    riskScore: number;
    recommendedAction: string;
    category: string;
  };
}
