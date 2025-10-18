import express, { Express } from 'express';
import cors from 'cors';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createClaimRoutes } from '@interfaces/routes/claimRoutes';

export function createServer(claimController: ClaimController): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api', createClaimRoutes(claimController));

  return app;
}
