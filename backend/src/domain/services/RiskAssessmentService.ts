import { Claim } from '@domain/entities/Claim';
import { RiskAssessment, RecommendedAction, ClaimCategory } from '@domain/entities/RiskAssessment';
import type {
  RiskAssessmentRequest,
  RiskCalculationResult,
} from '@domain/ports/IRiskAssessmentService';
import { DomainException } from '@domain/exceptions';
import { ErrorCode } from '@domain/types';

export class RiskAssessmentService {
  public parseAIResponse(jsonResponse: string): RiskCalculationResult {
    try {
      const parsed = JSON.parse(jsonResponse);

      // Validate required fields
      if (typeof parsed.riskScore !== 'number') {
        throw new Error('Invalid riskScore in AI response');
      }
      if (!parsed.recommendedAction) {
        throw new Error('Missing recommendedAction in AI response');
      }
      if (!parsed.category) {
        throw new Error('Missing category in AI response');
      }

      // Clamp risk score between 0-100
      const riskScore = Math.max(0, Math.min(100, parsed.riskScore));

      // Validate enum values
      if (!Object.values(RecommendedAction).includes(parsed.recommendedAction)) {
        throw new Error(`Invalid recommendedAction: ${parsed.recommendedAction}`);
      }
      if (!Object.values(ClaimCategory).includes(parsed.category)) {
        throw new Error(`Invalid category: ${parsed.category}`);
      }

      // Validate recommendedAction matches riskScore (prevent AI hallucination)
      const expectedAction = this.getExpectedAction(riskScore);
      const finalRecommendedAction = expectedAction; // Override AI if inconsistent

      return {
        riskScore,
        recommendedAction: finalRecommendedAction,
        category: parsed.category as ClaimCategory,
        reasoning: parsed.reasoning || 'No reasoning provided',
      };
    } catch (error) {
      throw new DomainException(
        `Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCode.VALIDATION_ERROR,
        { originalResponse: jsonResponse },
      );
    }
  }

  private getExpectedAction(riskScore: number): RecommendedAction {
    if (riskScore <= 30) return RecommendedAction.APPROVE;
    if (riskScore <= 70) return RecommendedAction.MANUAL_REVIEW;
    return RecommendedAction.REJECT;
  }

  public generateRiskAssessmentRequest(claim: Claim): RiskAssessmentRequest {
    const systemMessage = `You are an expert insurance risk assessor. 
Your role is to analyze insurance claims and provide accurate risk assessments.
Always respond in valid JSON format with the exact structure requested.
Base your assessment on industry best practices and fraud detection patterns.`;

    const userPrompt = `Analyze the following insurance claim and provide a risk assessment:

Claim Details:
- Description: ${claim.description}
- Amount: $${claim.amount}
- Submission Date: ${claim.submittedAt.toISOString()}

Respond ONLY in JSON format with this exact structure:
{
  "riskScore": 45,
  "recommendedAction": "APPROVE",
  "category": "AUTO",
  "reasoning": "Brief explanation here"
}

Valid values:
- riskScore: number from 0 to 100
- recommendedAction: APPROVE | MANUAL_REVIEW | REJECT
- category: AUTO | HEALTH | HOME | LIFE | PROPERTY | TRAVEL | OTHER

Risk Assessment Rules:
- riskScore 0-30: Recommend APPROVE (low risk, straightforward claims)
- riskScore 31-70: Recommend MANUAL_REVIEW (medium risk, needs human review)
- riskScore 71-100: Recommend REJECT (high risk, fraud indicators)

Consider these factors:
- Claim amount and reasonableness
- Incident description clarity and plausibility
- Potential fraud patterns (unusual claims, inconsistencies)
- Case complexity and documentation quality
- Historical risk indicators

Categories:
- AUTO: Vehicle-related claims (accidents, repairs, theft)
- HEALTH: Medical and healthcare claims
- HOME: Home insurance claims (damage, theft, liability)
- LIFE: Life insurance claims
- PROPERTY: General property damage or loss
- TRAVEL: Travel insurance claims
- OTHER: Claims that don't fit other categories`;

    return {
      systemMessage,
      userPrompt,
      claimData: {
        description: claim.description,
        amount: claim.amount,
        submissionDate: claim.submittedAt.toISOString(),
      },
    };
  }

  public createAssessment(
    claimId: string,
    riskScore: number,
    recommendedAction: RecommendedAction,
    category: ClaimCategory,
    reasoning: string,
  ): RiskAssessment {
    return new RiskAssessment(
      `assessment-${Date.now()}`,
      claimId,
      riskScore,
      recommendedAction,
      category,
      reasoning,
      new Date(),
    );
  }
}
