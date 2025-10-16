# Claims Risk Assessor - Backend API

Backend API for insurance claims risk assessment system with AI-powered risk evaluation.

## Table of Contents

- [Claims Risk Assessor - Backend API](#claims-risk-assessor---backend-api)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Documentation](#documentation)
    - [📚 API Documentation](#-api-documentation)
    - [📊 Architecture \& Diagrams](#-architecture--diagrams)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Running the Project](#running-the-project)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [AI Risk Assessment Model](#ai-risk-assessment-model)
    - [Risk Factors](#risk-factors)
    - [Decision Thresholds](#decision-thresholds)
  - [Environment Variables](#environment-variables)
  - [Testing](#testing)
  - [License](#license)

---

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: Hexagonal (Ports & Adapters)
- **Database**: PostgreSQL with Sequelize ORM
- **Validation**: Joi
- **API Documentation**: Swagger/OpenAPI

## Documentation

### 📚 API Documentation
**Interactive API Docs (Swagger UI)**: `http://localhost:3000/api-docs`

See [Swagger Setup Guide](./docs/swagger-setup.md) for implementation details.

### 📊 Architecture & Diagrams
- [Architecture Diagram](./docs/architecture-diagram.md) - System architecture and hexagonal design
- [Sequence Diagram](./docs/sequence-diagram.md) - API request/response flows
- [Flow Diagram](./docs/flow-diagram.md) - Risk assessment process flow
- [Data Model](./docs/data-model.md) - Database schema and entities

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Setup

1. **Clone repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
DATABASE_URL=your_database_uri
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

4. **Setup database**
```bash
# Create database
createdb claims_db

# Run migrations
npm run migrate
```

## Running the Project

### Development Mode
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

## AI Risk Assessment Model

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

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DATABASE_URL | PostgreSQL connection string | your_database_uri |
| NODE_ENV | Environment | development \| production |
| ALLOWED_ORIGINS | CORS allowed origins | http://localhost:5173 |
| JWT_SECRET | JWT secret (optional) | your_secret_key |

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- RiskAssessmentService
```

## License

This project is for technical evaluation purposes.
