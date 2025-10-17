import 'tsconfig-paths/register';
import dotenv from 'dotenv';
import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createServer } from '@infrastructure/http/server';

dotenv.config();

async function main() {
  // Initialize adapters/repositories
  const claimRepository = new ClaimRepositoryMock();

  // Inject repositories into use cases
  const createClaimUseCase = new CreateClaimUseCase(claimRepository);
  const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);

  // Inject use cases into controllers
  const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);

  // Create and start server
  const app = createServer(claimController);
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
