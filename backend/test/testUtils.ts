import 'tsconfig-paths/register';
import type { IRiskAssessmentService } from '@domain/ports/IRiskAssessmentService';
import type { Result, DomainError } from '@domain/types';
import { ErrorCode } from '@domain/types';
import { RecommendedAction, ClaimCategory } from '@domain/entities/RiskAssessment';
import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createServer } from '@infrastructure/http/server';

// Mock Risk Assessment Service for testing
export class MockRiskAssessmentServiceForTests implements IRiskAssessmentService {
  private shouldFail: boolean = false;

  private mockResponse?: {
    riskScore: number;
    recommendedAction: RecommendedAction;
    category: ClaimCategory;
    reasoning: string;
  };

  // Configure to simulate failure
  public setFailure(shouldFail: boolean): void {
    this.shouldFail = shouldFail;
  }

  // Configure custom response
  public setMockResponse(response: {
    riskScore: number;
    recommendedAction: RecommendedAction;
    category: ClaimCategory;
    reasoning?: string;
  }): void {
    this.mockResponse = { ...response, reasoning: response.reasoning || 'Test reasoning' };
  }

  // Reset to default state
  public reset(): void {
    this.shouldFail = false;
    this.mockResponse = undefined;
  }

  public async calculateRisk(request: any): Promise<Result<string, DomainError>> {
    // Simulate service failure
    if (this.shouldFail) {
      return {
        error: {
          code: ErrorCode.EXTERNAL_SERVICE_ERROR,
          message: 'OpenAI service unavailable',
        },
      };
    }

    // Use custom response or calculate by amount
    if (this.mockResponse) {
      return {
        data: JSON.stringify(this.mockResponse),
      };
    }

    // Default logic based on claim amount
    const { amount } = request.claimData;
    let riskScore: number;
    let recommendedAction: RecommendedAction;
    const category = ClaimCategory.AUTO; // Default category for tests
    const reasoning = 'Test risk assessment based on claim amount';

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

    // Return JSON string like real service
    return {
      data: JSON.stringify({ riskScore, recommendedAction, category, reasoning }),
    };
  }
}

// Export singleton instance to configure in tests
export const mockRiskService = new MockRiskAssessmentServiceForTests();

export function createTestApp() {
  // Initialize dependencies for testing
  const claimRepository = new ClaimRepositoryMock();

  // Use mock service (can be configured in each test)
  const createClaimUseCase = new CreateClaimUseCase(claimRepository, mockRiskService);
  const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);
  const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);

  return createServer(claimController);
}
