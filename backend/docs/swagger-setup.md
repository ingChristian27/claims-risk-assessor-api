# Swagger Setup Guide

> **Status**: 🚧 Under Construction - To be implemented during development phase

## Overview

This project uses **Swagger/OpenAPI 3.0** for interactive API documentation.

Once implemented, the API documentation will be available at:

**URL**: `http://localhost:3000/api-docs`

## Dependencies Installed

```json
{
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
}
```

## Basic Configuration

The Swagger setup will include:

1. **Configuration File**: `src/config/swagger.ts`
   - OpenAPI 3.0 specification
   - API title, version, description
   - Server URLs

2. **Server Integration**: `src/server.ts`
   - Mount Swagger UI at `/api-docs`
   - Serve interactive documentation

3. **Endpoint Documentation**: JSDoc comments in route files
   - Request/response schemas
   - HTTP methods and paths
   - Status codes and examples

## Features

When implemented, Swagger UI will provide:

- ✅ Interactive API documentation
- ✅ Try-it-out functionality to test endpoints
- ✅ Request/response examples
- ✅ Schema definitions
- ✅ Automatic validation

## API Endpoints to Document

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/claims` | Create new claim |
| GET | `/api/claims/:id` | Get claim by ID |
| GET | `/api/claims` | List all claims |
| GET | `/api/claims/:id/assessment` | Get risk assessment |

## Implementation Notes

- Document each endpoint using `@swagger` JSDoc comments
- Define reusable schemas in `components/schemas`
- Include request/response examples
- Specify HTTP status codes (200, 201, 400, 404, 500)
- Add validation constraints

---

**Note**: Detailed implementation will be added during the development phase.

