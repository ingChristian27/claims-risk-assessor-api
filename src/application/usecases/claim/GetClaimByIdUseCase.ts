import { ClaimResponseDTO } from '../../dtos/ClaimResponseDTO';
import { IClaimRepository } from '../../ports/IClaimRepository';

export class GetClaimByIdUseCase {
  constructor(private claimRepository: IClaimRepository) {}

  async execute(id: string): Promise<ClaimResponseDTO | null> {
    const claim = await this.claimRepository.findById(id);

    if (!claim) {
      return null;
    }

    // TODO: Get risk assessment from repository
    return {
      claimId: claim.claimId,
      userId: claim.userId,
      description: claim.description,
      amount: claim.amount,
      status: claim.status,
      submittedAt: claim.submittedAt,
    };
  }
}
