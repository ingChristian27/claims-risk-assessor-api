import { RiskAssessmentService } from '@domain/services/RiskAssessmentService';
import { RecommendedAction } from '@domain/entities/RiskAssessment';

describe('RiskAssessmentService - AI Validation', () => {
  let service: RiskAssessmentService;

  beforeEach(() => {
    service = new RiskAssessmentService();
  });

  describe('AI Hallucination Prevention', () => {
    it('should override AI when it recommends APPROVE for high risk score', () => {
      const aiResponse = JSON.stringify({
        riskScore: 45,
        recommendedAction: 'APPROVE', // ❌ AI hallucination
        category: 'AUTO',
        reasoning: 'AI incorrectly approved medium risk',
      });

      const result = service.parseAIResponse(aiResponse);

      expect(result.riskScore).toBe(45);
      expect(result.recommendedAction).toBe(RecommendedAction.MANUAL_REVIEW); // ✅ Corrected
    });

    it('should enforce risk thresholds: 0-30 APPROVE, 31-70 MANUAL_REVIEW, 71-100 REJECT', () => {
      const testCases = [
        { score: 15, aiSays: 'REJECT', expected: RecommendedAction.APPROVE },
        { score: 30, aiSays: 'REJECT', expected: RecommendedAction.APPROVE },
        { score: 31, aiSays: 'APPROVE', expected: RecommendedAction.MANUAL_REVIEW },
        { score: 50, aiSays: 'APPROVE', expected: RecommendedAction.MANUAL_REVIEW },
        { score: 70, aiSays: 'REJECT', expected: RecommendedAction.MANUAL_REVIEW },
        { score: 71, aiSays: 'APPROVE', expected: RecommendedAction.REJECT },
        { score: 100, aiSays: 'APPROVE', expected: RecommendedAction.REJECT },
      ];

      testCases.forEach(({ score, aiSays, expected }) => {
        const aiResponse = JSON.stringify({
          riskScore: score,
          recommendedAction: aiSays,
          category: 'AUTO',
          reasoning: 'Test',
        });

        const result = service.parseAIResponse(aiResponse);
        expect(result.recommendedAction).toBe(expected);
      });
    });

    it('should clamp out-of-range risk scores', () => {
      const highResponse = JSON.stringify({
        riskScore: 150,
        recommendedAction: 'REJECT',
        category: 'AUTO',
        reasoning: 'Test',
      });

      const lowResponse = JSON.stringify({
        riskScore: -10,
        recommendedAction: 'APPROVE',
        category: 'AUTO',
        reasoning: 'Test',
      });

      expect(service.parseAIResponse(highResponse).riskScore).toBe(100);
      expect(service.parseAIResponse(lowResponse).riskScore).toBe(0);
    });
  });

  describe('AI Response Validation', () => {
    it('should reject invalid JSON from AI', () => {
      expect(() => service.parseAIResponse('invalid json{')).toThrow('Failed to parse AI response');
    });

    it('should reject missing required fields', () => {
      const missingScore = JSON.stringify({
        recommendedAction: 'APPROVE',
        category: 'AUTO',
      });

      expect(() => service.parseAIResponse(missingScore)).toThrow('Invalid riskScore');
    });

    it('should provide default reasoning if AI forgets it', () => {
      const noReasoning = JSON.stringify({
        riskScore: 25,
        recommendedAction: 'APPROVE',
        category: 'AUTO',
      });

      const result = service.parseAIResponse(noReasoning);
      expect(result.reasoning).toBe('No reasoning provided');
    });
  });
});
