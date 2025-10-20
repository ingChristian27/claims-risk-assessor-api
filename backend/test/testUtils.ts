import 'tsconfig-paths/register';
import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createServer } from '@infrastructure/http/server';
import { MockLogger } from './mocks/MockLogger';
import { MockRiskAssessmentService } from './mocks/MockRiskAssessmentService';

export function createTestApp() {
  const claimRepository = new ClaimRepositoryMock();
  const logger = new MockLogger();
  const riskAssessmentService = new MockRiskAssessmentService();

  const createClaimUseCase = new CreateClaimUseCase(claimRepository, riskAssessmentService, logger);
  const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);
  const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);

  return createServer(claimController);
}
