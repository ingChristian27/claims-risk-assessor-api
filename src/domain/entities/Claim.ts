export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVE = 'APPROVE',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  REJECT = 'REJECT',
}

export class Claim {
  constructor(
    public readonly claimId: string,
    public readonly userId: string,
    public readonly description: string,
    public readonly amount: number,
    public status: ClaimStatus,
    public readonly submittedAt: Date,
  ) {}

  public updateStatus(newStatus: ClaimStatus): void {
    this.status = newStatus;
  }
}
