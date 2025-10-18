import 'tsconfig-paths/register';
import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createServer } from '@infrastructure/http/server';

export function createTestApp() {
  // Initialize dependencies for testing
  const claimRepository = new ClaimRepositoryMock();
  const createClaimUseCase = new CreateClaimUseCase(claimRepository);
  const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);
  const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);

  return createServer(claimController);
}
