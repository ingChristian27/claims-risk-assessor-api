# Claims Risk Assessor - Backend API

Backend API for insurance claims risk assessment system with AI-powered risk evaluation.

## 📚 API Documentation

**Interactive API Docs (Swagger UI)**: `http://localhost:3000/api-docs`

See [Swagger Setup Guide](./docs/swagger-setup.md) for implementation details.

## 📊 Architecture & Diagrams
- [Architecture Diagram](./docs/architecture-diagram.md) - System architecture and hexagonal design
- [Sequence Diagram](./docs/sequence-diagram.md) - API request/response flows
- [Data Model](./docs/data-model.md) - Database schema and entities

## 🤖 AI Risk Assessment Model

The risk assessment model evaluates claims based on multiple factors and returns a risk score (0-100) with a recommended action.

**Location**: `src/domain/services/RiskAssessmentService.ts`

### Risk Factors

1. **Claim Amount** - Higher amounts increase risk
2. **High-Risk Keywords** - Detection of fraud-related terms
3. **Medium-Risk Keywords** - Urgency indicators
4. **Description Length** - Too short or too long descriptions

### Decision Thresholds

| Risk Score | Action | Description |
|------------|--------|-------------|
| 0-29 | APPROVE | Automatic approval |
| 30-69 | MANUAL_REVIEW | Requires human review |
| 70-100 | REJECT | Automatic rejection |

For detailed specification, see [AI Model Documentation](../documentation/AI_MODEL_SPECIFICATION.md).

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DATABASE_URL | PostgreSQL connection string | your_database_uri |
| NODE_ENV | Environment | development \| production |
| ALLOWED_ORIGINS | CORS allowed origins | http://localhost:5173 |
| OPENAI_API_KEY | OpenAI API key for AI risk assessment | sk-... |

## 🧪 Advanced Testing

```bash
# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- RiskAssessmentService
```
