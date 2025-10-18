import { Claim } from '@domain/entities/Claim';
import { RiskAssessment, RecommendedAction } from '@domain/entities/RiskAssessment';
import type {
  RiskAssessmentRequest,
  RiskCalculationResult,
} from '@domain/ports/IRiskAssessmentService';

export class RiskAssessmentService {
  /**
   * Calculates risk using business rules (fallback when external service fails)
   */
  public calculateRiskByBusinessRules(claim: Claim): RiskCalculationResult {
    const { amount } = claim;

    let riskScore: number;
    let recommendedAction: RecommendedAction;

    if (amount < 1000) {
      riskScore = 15;
      recommendedAction = RecommendedAction.APPROVE;
    } else if (amount < 5000) {
      riskScore = 35;
      recommendedAction = RecommendedAction.MANUAL_REVIEW;
    } else {
      riskScore = 75;
      recommendedAction = RecommendedAction.REJECT;
    }

    return { riskScore, recommendedAction };
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
  "riskScore": [number from 0 to 100, where 0 is no risk and 100 is very high risk],
  "recommendedAction": ["APPROVE", "MANUAL_REVIEW", "REJECT"],
  "reasoning": "[brief explanation of the decision]"
}

Consider these factors:
- Claim amount and reasonableness
- Incident description clarity and plausibility
- Potential fraud patterns (unusual claims, inconsistencies)
- Case complexity and documentation quality
- Historical risk indicators`;

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
  ): RiskAssessment {
    return new RiskAssessment(
      `assessment-${Date.now()}`,
      claimId,
      riskScore,
      recommendedAction,
      new Date(),
    );
  }
}
