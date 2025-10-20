# Claims Risk Assessor - Backend API

Backend API for insurance claims risk assessment system with AI-powered risk evaluation.

## 📚 API Documentation

**Endpoint**: `POST /api/claims` - Create claim with AI risk assessment

See [API Documentation](./docs/api-documentation.md) for complete request/response schemas, validation rules, and examples.

## 📊 Architecture & Diagrams
- [Architecture Diagram](./docs/architecture-diagram.md) - AWS deployment and system architecture
- [Sequence Diagram](./docs/sequence-diagram.md) - Claim submission flow
- [AI Safety Design](./docs/ai-safety-design.md) - Human-in-the-Loop pattern and rationale
- [API Documentation](./docs/api-documentation.md) - Complete API reference with examples

**Note**: User authentication system is planned but not yet implemented. Current implementation uses mock userId for testing.

## 🤖 AI Risk Assessment Model

The AI analyzes claims and provides **recommendations only**. All claims require human review for final decision.

**Location**: `src/domain/services/RiskAssessmentService.ts`

### AI Recommendations

| Risk Score | AI Recommendation | Claim Status | Final Decision |
|------------|------------------|--------------|----------------|
| 0-30 | APPROVE | MANUAL_REVIEW | Human decides |
| 31-70 | MANUAL_REVIEW | MANUAL_REVIEW | Human decides |
| 71-100 | REJECT | MANUAL_REVIEW | Human decides |

**Important**: AI provides `aiRecommendation`, but claim `status` always goes to `MANUAL_REVIEW`. This prevents AI hallucination risks and ensures human oversight (Human-in-the-Loop pattern).

## 📊 Observability

### Structured Logging
- **Framework**: Winston with JSON format
- **Location**: `src/infrastructure/logger/WinstonLogger.ts`
- **Architecture**: Port/Adapter pattern (`ILogger` interface in domain)
- **CloudWatch**: Logs automatically indexed for efficient querying

**Key logged events:**
- Claim creation with metadata (claimId, amount, userId)
- Risk assessment completion (riskScore, category, recommendedAction)
- AI service failures with error details

## 🔐 Security

- **Helmet.js**: Security headers (XSS, clickjacking, MIME sniffing)
- **CORS**: Environment-specific origin configuration
- **Input Validation**: Joi schemas with strict rules
- **Payload Limit**: 1MB max to prevent DOS attacks
- **Rate Limiting**: express-rate-limit (100 req/15min), API Gateway throttling in production
- **AI Validation**: Post-processing to prevent hallucination

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
| FRONTEND_URL | Environment variable | Frontend URL for CORS (e.g., https://your-app.amplifyapp.com) |

**Database**: DynamoDB table `claims-risk-assessor-claims-dev` with on-demand billing. Includes GSI for userId queries.

## 🧪 Advanced Testing

```bash
# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- RiskAssessmentService
```
