import { randomUUID } from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { IClaimRepository } from '@application/ports/IClaimRepository';
import { Claim, ClaimStatus, RiskAssessment } from '@domain/entities';

export class ClaimRepositoryDynamoDB implements IClaimRepository {
  private docClient: DynamoDBDocumentClient;

  private tableName: string;

  constructor() {
    if (!process.env.CLAIMS_TABLE) {
      throw new Error('CLAIMS_TABLE environment variable is required');
    }

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });

    this.docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });

    this.tableName = process.env.CLAIMS_TABLE;
  }

  async create(claim: Claim): Promise<Claim> {
    // Generate unique claim ID with UUID
    const claimId = randomUUID();

    const item: any = {
      claimId,
      userId: claim.userId,
      description: claim.description,
      amount: claim.amount,
      status: claim.status,
      incidentDate: claim.incidentDate.toISOString(),
      submittedAt: claim.submittedAt.toISOString(),
    };

    if (claim.aiRecommendation) {
      item.aiRecommendation = claim.aiRecommendation;
    }

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
      }),
    );

    // Return new claim with generated ID
    return new Claim(
      claimId,
      claim.userId,
      claim.description,
      claim.amount,
      claim.status,
      claim.incidentDate,
      claim.submittedAt,
      claim.aiRecommendation,
    );
  }

  async findById(id: string): Promise<Claim | null> {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { claimId: id },
      }),
    );

    if (!result.Item) {
      return null;
    }

    return this.mapToClaim(result.Item);
  }

  async findAll(): Promise<Claim[]> {
    // TODO:
    // For now, simple scan (not recommended for production with large datasets)
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
      }),
    );

    if (!result.Items) {
      return [];
    }

    return result.Items.map((item) => this.mapToClaim(item));
  }

  async updateWithRiskAssessment(claimId: string, riskAssessment: RiskAssessment): Promise<void> {
    await this.docClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { claimId },
        UpdateExpression:
          'SET riskAssessment = :riskAssessment, #status = :status, aiRecommendation = :aiRecommendation',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':riskAssessment': {
            assessmentId: riskAssessment.assessmentId,
            riskScore: riskAssessment.riskScore,
            recommendedAction: riskAssessment.recommendedAction,
            category: riskAssessment.category,
            assessedAt: riskAssessment.assessedAt.toISOString(),
          },
          ':status': ClaimStatus.MANUAL_REVIEW,
          ':aiRecommendation': riskAssessment.recommendedAction,
        },
      }),
    );
  }

  private mapToClaim(item: any): Claim {
    return new Claim(
      item.claimId,
      item.userId,
      item.description,
      item.amount,
      item.status as ClaimStatus,
      new Date(item.incidentDate),
      new Date(item.submittedAt),
      item.aiRecommendation,
    );
  }
}
