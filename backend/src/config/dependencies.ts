import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { OpenAIRiskAssessmentService } from '@infrastructure/services/OpenAIRiskAssessmentService';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';

/**
 * Dependency injection configuration
 * Currently using Mock repository (ready for DynamoDB implementation)
 */
export function createDependencies() {
  // Initialize repository (using Mock for now)
  const claimRepository = new ClaimRepositoryMock();

  // Initialize services
  const riskAssessmentService = new OpenAIRiskAssessmentService();

  // Inject into use cases
  const createClaimUseCase = new CreateClaimUseCase(claimRepository, riskAssessmentService);
  const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);

  // Inject into controllers
  const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);

  return {
    claimController,
    claimRepository,
    riskAssessmentService,
  };
}
