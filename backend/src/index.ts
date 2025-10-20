import 'tsconfig-paths/register';
import dotenv from 'dotenv';
import { ClaimRepositoryMock } from '@infrastructure/repositories/ClaimRepositoryMock';
import { OpenAIRiskAssessmentService } from '@infrastructure/services/OpenAIRiskAssessmentService';
import { WinstonLogger } from '@infrastructure/logger/WinstonLogger';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createServer } from '@infrastructure/http/server';

dotenv.config();

async function main() {
  // Initialize adapters/repositories
  const claimRepository = new ClaimRepositoryMock();
  const riskAssessmentService = new OpenAIRiskAssessmentService();
  const logger = new WinstonLogger();

  // Inject repositories and services into use cases
  const createClaimUseCase = new CreateClaimUseCase(claimRepository, riskAssessmentService, logger);
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
