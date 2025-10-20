# Claims Risk Assessor - Backend API

Backend API for insurance claims risk assessment system with AI-powered risk evaluation.

## 📚 API Documentation

### POST `/api/claims`

Create a new insurance claim and receive AI-powered risk assessment.

**Request Body:**
```json
{
  "description": "string (min: 10 chars, max: 1000 chars)",
  "amount": "number (min: 0, max: 1000000)",
  "incidentDate": "ISO 8601 date string"
}
```

**Success Response (201 Created):**
```json
{
  "claimId": "uuid",
  "userId": "string",
  "description": "string",
  "amount": "number",
  "status": "MANUAL_REVIEW",
  "aiRecommendation": "APPROVE | MANUAL_REVIEW | REJECT",
  "submittedAt": "ISO 8601 datetime",
  "riskAssessment": {
    "riskScore": "number (0-100)",
    "recommendedAction": "APPROVE | MANUAL_REVIEW | REJECT",
    "category": "AUTO | HEALTH | HOME | PROPERTY | OTHER",
    "reasoning": "string"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation error message",
  "code": "VALIDATION_ERROR",
  "details": { /* Joi validation details */ }
}
```

**Example Request:**
```bash
curl -X POST https://your-api.amazonaws.com/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Car accident with severe front-end damage",
    "amount": 5000,
    "incidentDate": "2024-01-15T00:00:00.000Z"
  }'
```

## 📊 Architecture & Diagrams
- [Architecture Diagram](./docs/architecture-diagram.md) - System architecture and hexagonal design
- [Sequence Diagram](./docs/sequence-diagram.md) - API request/response flows
- [Data Model](./docs/data-model.md) - Database schema and entities
- [DynamoDB Schema](./docs/dynamodb-schema.md) - DynamoDB table structure
- [AI Safety Design](./docs/ai-safety-design.md) - Human-in-the-Loop pattern and rationale

## 🤖 AI Risk Assessment Model

The AI analyzes claims and provides **recommendations only**. All claims require human review for final decision.

**Location**: `src/domain/services/RiskAssessmentService.ts`

### AI Recommendations

| Risk Score | AI Recommendation | Claim Status | Final Decision |
|------------|------------------|--------------|----------------|
| 0-30 | APPROVE | MANUAL_REVIEW | Human decides |
| 31-70 | MANUAL_REVIEW | MANUAL_REVIEW | Human decides |
| 71-100 | REJECT | MANUAL_REVIEW | Human decides |

**Important**: AI provides `aiRecommendation`, but claim `status` always goes to `MANUAL_REVIEW`. This prevents AI hallucination risks and ensures human oversight.

See [AI Safety Design](./docs/ai-safety-design.md) for detailed rationale.

## 🔐 Security

### Implemented Protections
- **Helmet.js**: Security headers (XSS, clickjacking, MIME sniffing)
- **CORS**: Environment-specific origin configuration
- **Input Validation**: Joi schemas with strict rules
- **Payload Limit**: 1MB max to prevent DOS attacks
- **AI Validation**: Post-processing to prevent hallucination

### Rate Limiting
- **Local Development**: express-rate-limit (100 req/15min per IP)
- **AWS Production**: API Gateway throttling (100 req/sec, 200 burst)
- **OpenAI API**: Handled by OpenAI SDK with automatic retry

## 🔐 Environment Variables

### For Local Development

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| PORT | Server port | No | - |
| OPENAI_API_KEY | OpenAI API key for AI risk assessment | Yes | sk-... |
| FRONTEND_URL | Frontend URL for CORS | No (default: *) | http://localhost:5173 |

Create `.env` file in backend directory:
```bash
cp .env.example .env
```

### For AWS Lambda Deployment

Configured in `serverless.yml`:

| Variable | Source | Description |
|----------|--------|-------------|
| NODE_ENV | Serverless config | Environment stage (dev/prod) |
| OPENAI_API_KEY | Environment variable | Set during deployment |
| CLAIMS_TABLE | Serverless config | DynamoDB table name (auto-generated) |

**Database**: DynamoDB with on-demand billing (see [DynamoDB Schema](./docs/dynamodb-schema.md)).

## 🧪 Advanced Testing

```bash
# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- RiskAssessmentService
```
