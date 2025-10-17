import { Router } from 'express';
import { ClaimController } from '../controllers/ClaimController';

export function createClaimRoutes(claimController: ClaimController): Router {
  const router = Router();

  router.post('/claims', (req, res) => claimController.create(req, res));
  router.get('/claims/:id', (req, res) => claimController.getById(req, res));

  return router;
}
