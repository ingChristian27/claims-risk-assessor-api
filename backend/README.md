# Claims Risk Assessor - Backend API

Backend API for insurance claims risk assessment system with AI-powered risk evaluation.

## 📚 API Documentation

**Interactive API Docs (Swagger UI)**: Available at `/api-docs` endpoint

See [Swagger Setup Guide](./docs/swagger-setup.md) for implementation details.

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

## 🔐 Environment Variables

### For Local Development

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| PORT | Server port | No (default: 3000) | 3000 |
| OPENAI_API_KEY | OpenAI API key for AI risk assessment | Yes | sk-... |

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
