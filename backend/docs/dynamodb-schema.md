# DynamoDB Schema

## Claims Table

**Table Name:** `claims-risk-assessor-claims-{stage}`

### Primary Key
- **Partition Key (PK):** `claimId` (String) - UUID del claim

### Global Secondary Index (GSI)
- **GSI Name:** `UserIdIndex`
- **Partition Key:** `userId` (String)
- **Sort Key:** `submittedAt` (String - ISO 8601)
- **Projection:** ALL

### Attributes

```typescript
{
  // Keys
  claimId: string;           // PK - "claim-1729382400000"
  userId: string;            // GSI PK - "user-mock" (por ahora)
  submittedAt: string;       // GSI SK - "2025-10-19T10:30:00.000Z"
  
  // Claim data
  description: string;
  amount: number;
  status: string;            // PENDING | MANUAL_REVIEW | APPROVED | REJECTED
  aiRecommendation: string;  // APPROVE | MANUAL_REVIEW | REJECT (AI suggestion)
  incidentDate: string;      // "2025-10-15T00:00:00.000Z"
  
  // Risk Assessment (embedded)
  riskAssessment: {
    assessmentId: string;
    riskScore: number;       // 0-100
    recommendedAction: string; // APPROVE | MANUAL_REVIEW | REJECT
    category: string;        // AUTO | HEALTH | HOME | LIFE | PROPERTY | TRAVEL | OTHER
    assessedAt: string;      // "2025-10-19T10:30:05.000Z"
  }
}
```

### Example Item

```json
{
  "claimId": "claim-1729382400123",
  "userId": "user-mock",
  "submittedAt": "2025-10-19T10:30:00.000Z",
  "description": "Car accident on highway, front bumper damage",
  "amount": 2500.00,
  "status": "MANUAL_REVIEW",
  "aiRecommendation": "APPROVE",
  "incidentDate": "2025-10-15T00:00:00.000Z",
  "riskAssessment": {
    "assessmentId": "assessment-1729382405678",
    "riskScore": 45,
    "recommendedAction": "APPROVE",
    "category": "AUTO",
    "assessedAt": "2025-10-19T10:30:05.000Z"
  }
}
```

### Access Patterns

1. **Get claim by ID**
   - Query: `GetItem` on `claimId`
   - Use case: Ver detalle de un claim específico

2. **List all claims by user** (futuro)
   - Query: GSI `UserIdIndex` where `userId = X`
   - Sort by: `submittedAt` DESC
   - Use case: Dashboard del usuario

### Capacity

- **Billing Mode:** PAY_PER_REQUEST (On-Demand)
- **Cost:** ~$0 en Free Tier (25 GB + 25 RCU/WCU)
- **Auto-scaling:** Automático

### Deployment

```bash
# Deploy table to AWS
cd backend
npm run deploy:dev

# Table will be created: claims-risk-assessor-claims-dev
```

### Local Development

Para desarrollo local, el código usa `ClaimRepositoryMock` (in-memory).
Para usar DynamoDB local:

```bash
# Install DynamoDB Local
npm install -D serverless-dynamodb-local

# Start DynamoDB Local
serverless dynamodb start
```
