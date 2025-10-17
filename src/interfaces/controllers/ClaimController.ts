import { Request, Response } from 'express';
import { CreateClaimUseCase } from '@application/usecases/claim/CreateClaimUseCase';
import { GetClaimByIdUseCase } from '@application/usecases/claim/GetClaimByIdUseCase';

export class ClaimController {
  constructor(
    private createClaimUseCase: CreateClaimUseCase,
    private getClaimByIdUseCase: GetClaimByIdUseCase,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // TODO: Add request validation
      const claimResponse = await this.createClaimUseCase.execute(req.body);
      return res.status(201).json(claimResponse);
    } catch (error) {
      // TODO: Proper error handling
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const claimResponse = await this.getClaimByIdUseCase.execute(id);

      if (!claimResponse) {
        return res.status(404).json({ error: 'Claim not found' });
      }

      return res.status(200).json(claimResponse);
    } catch (error) {
      // TODO: Proper error handling
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
