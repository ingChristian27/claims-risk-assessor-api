import { ClaimRepositoryDynamoDB } from '@infrastructure/repositories/ClaimRepositoryDynamoDB';
import { OpenAIRiskAssessmentService } from '@infrastructure/services/OpenAIRiskAssessmentService';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { IClaimRepository } from '@application/ports/IClaimRepository';

/**
 * Dependency injection configuration for AWS Lambda
 */
export function createDependenciesAWS() {
  // Initialize DynamoDB repository
  const claimRepository: IClaimRepository = new ClaimRepositoryDynamoDB();

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
