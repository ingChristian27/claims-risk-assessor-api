# API Documentation

## Endpoints

### POST `/api/claims`

Create a new insurance claim and receive AI-powered risk assessment.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "description": "string (min: 10 chars, max: 1000 chars)",
  "amount": "number (min: 0, max: 1000000)",
  "incidentDate": "ISO 8601 date string"
}
```

#### Success Response (201 Created)

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

#### Error Response (400 Bad Request)

```json
{
  "error": "Validation error message",
  "code": "VALIDATION_ERROR",
  "details": { /* Joi validation details */ }
}
```

#### Example Request

```bash
curl -X POST https://your-api.amazonaws.com/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Car accident with severe front-end damage",
    "amount": 5000,
    "incidentDate": "2024-01-15T00:00:00.000Z"
  }'
```

#### Example Response

```json
{
  "claimId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user-mock",
  "description": "Car accident with severe front-end damage",
  "amount": 5000,
  "status": "MANUAL_REVIEW",
  "aiRecommendation": "MANUAL_REVIEW",
  "submittedAt": "2024-01-15T10:30:00.000Z",
  "riskAssessment": {
    "riskScore": 65,
    "recommendedAction": "MANUAL_REVIEW",
    "category": "AUTO",
    "reasoning": "Significant claim amount requires detailed review"
  }
}
```

## Validation Rules

| Field | Constraint |
|-------|-----------|
| `description` | Required, 10-1000 characters |
| `amount` | Required, positive number, max $1,000,000 |
| `incidentDate` | Required, valid date, cannot be in the future |

## Status Codes

| Code | Meaning |
|------|---------|
| 201 | Claim created successfully |
| 400 | Validation error (invalid input) |
| 500 | Server error (database or AI service failure) |
| 502 | Bad Gateway (external service unavailable) |

## Rate Limiting

- **Local Development**: 100 requests per 15 minutes per IP
- **Production**: Handled by express-rate-limit in Lambda

**Headers included in response:**
```
ratelimit-limit: 100
ratelimit-remaining: 99
ratelimit-reset: 900
```

