import { Claim, RiskAssessment } from '@domain/entities';

// Port (interface) for Claim Repository
// Infrastructure layer will implement this

export interface IClaimRepository {
  create(claim: Claim): Promise<Claim>;
  findById(id: string): Promise<Claim | null>;
  findAll(): Promise<Claim[]>;
  updateWithRiskAssessment(claimId: string, riskAssessment: RiskAssessment): Promise<void>;
}
