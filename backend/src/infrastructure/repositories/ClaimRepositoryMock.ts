import { IClaimRepository } from '@application/ports/IClaimRepository';
import { Claim, ClaimStatus, RiskAssessment, RecommendedAction } from '@domain/entities';

// Mock implementation of ClaimRepository
// This will be replaced with real database implementation later

export class ClaimRepositoryMock implements IClaimRepository {
  private claims: Claim[] = [
    // Mock data
    new Claim(
      'claim-001',
      'user-001',
      'Minor door dent repair',
      450.0,
      ClaimStatus.MANUAL_REVIEW,
      new Date('2025-10-10'),
      new Date('2025-10-15'),
      RecommendedAction.APPROVE,
    ),
    new Claim(
      'claim-002',
      'user-002',
      'Windshield replacement needed urgently',
      1200.0,
      ClaimStatus.MANUAL_REVIEW,
      new Date('2025-10-12'),
      new Date('2025-10-16'),
      RecommendedAction.MANUAL_REVIEW,
    ),
  ];

  async create(claim: Claim): Promise<Claim> {
    // Mock: Generate ID and save claim
    const newClaim = new Claim(
      `claim-${Date.now()}`,
      claim.userId,
      claim.description,
      claim.amount,
      claim.status,
      claim.incidentDate,
      new Date(),
    );
    this.claims.push(newClaim);
    return newClaim;
  }

  async findById(id: string): Promise<Claim | null> {
    // Mock: Find claim in memory
    const claim = this.claims.find((c) => c.claimId === id);
    return claim || null;
  }

  async findAll(): Promise<Claim[]> {
    // Mock: Return all claims
    return this.claims;
  }

  async updateWithRiskAssessment(claimId: string, riskAssessment: RiskAssessment): Promise<void> {
    const claim = this.claims.find((c) => c.claimId === claimId);
    if (claim) {
      claim.setAIRecommendation(riskAssessment.recommendedAction);
    }
  }
}
