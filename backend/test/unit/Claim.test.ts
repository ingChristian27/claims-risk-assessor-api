import { Claim, ClaimStatus } from '@domain/entities/Claim';
import { RecommendedAction } from '@domain/entities/RiskAssessment';

describe('Claim Entity - Human-in-the-Loop Pattern', () => {
  describe('AI Recommendation Safety', () => {
    it('should NEVER auto-approve: AI says APPROVE but status goes to MANUAL_REVIEW', () => {
      const claim = new Claim(
        'claim-123',
        'user-456',
        'Low risk claim',
        500,
        ClaimStatus.PENDING,
        new Date(),
      );

      claim.setAIRecommendation(RecommendedAction.APPROVE);

      expect(claim.aiRecommendation).toBe(RecommendedAction.APPROVE); // AI suggests
      expect(claim.status).toBe(ClaimStatus.MANUAL_REVIEW); // But needs human review
    });

    it('should NEVER auto-reject: AI says REJECT but status goes to MANUAL_REVIEW', () => {
      const claim = new Claim(
        'claim-123',
        'user-456',
        'High risk claim',
        50000,
        ClaimStatus.PENDING,
        new Date(),
      );

      claim.setAIRecommendation(RecommendedAction.REJECT);

      expect(claim.aiRecommendation).toBe(RecommendedAction.REJECT); // AI suggests
      expect(claim.status).toBe(ClaimStatus.MANUAL_REVIEW); // But needs human review
    });

    it('should preserve AI recommendation for audit trail', () => {
      const claim = new Claim(
        'claim-123',
        'user-456',
        'Test claim',
        1000,
        ClaimStatus.PENDING,
        new Date(),
      );

      claim.setAIRecommendation(RecommendedAction.APPROVE);
      claim.rejectByHuman(); // Human disagrees with AI

      // Audit trail: Know AI said APPROVE but human REJECTED
      expect(claim.aiRecommendation).toBe(RecommendedAction.APPROVE);
      expect(claim.status).toBe(ClaimStatus.REJECTED);
    });
  });

  describe('Human Decision Methods', () => {
    it('should allow human to approve claim', () => {
      const claim = new Claim(
        'claim-123',
        'user-456',
        'Test',
        1000,
        ClaimStatus.MANUAL_REVIEW,
        new Date(),
      );

      claim.approveByHuman();

      expect(claim.status).toBe(ClaimStatus.APPROVED);
    });

    it('should allow human to reject claim', () => {
      const claim = new Claim(
        'claim-123',
        'user-456',
        'Test',
        1000,
        ClaimStatus.MANUAL_REVIEW,
        new Date(),
      );

      claim.rejectByHuman();

      expect(claim.status).toBe(ClaimStatus.REJECTED);
    });
  });
});
