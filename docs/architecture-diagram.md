# Architecture Diagram

## System Architecture

```mermaid
graph TD
    subgraph Client
        Frontend[Frontend Application - Web Browser]
    end

    subgraph Server
        Backend[Backend API - Node.js Express]
        Database[(Database: PostgreSQL)]
    end

    subgraph EndUser
        User[End User]
    end

    User -->|Requests| Frontend
    Frontend -->|API Calls| Backend
    Backend -->|Database Queries| Database
    Database -->|Results| Backend
    Backend -->|Returns Data| Frontend
    Frontend -->|Displays Info| User

    %% Styling
    classDef frontend fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef backend fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px;
    classDef database fill:#FFE6CC,stroke:#D79B00,stroke-width:2px;

    class Frontend frontend;
    class Backend backend;
    class Database database;
```

## Hexagonal Architecture (Ports & Adapters)

### Layer Structure

```
src/
├── domain/              # Business logic & entities (Core)
│   ├── entities/
│   │   ├── Claim.ts
│   │   ├── User.ts
│   │   └── RiskAssessment.ts
│   ├── value-objects/
│   └── services/
│       └── RiskAssessmentService.ts    # AI Logic
│
├── application/         # Use cases (Application Layer)
│   └── usecases/
│       ├── CreateClaimUseCase.ts
│       ├── GetClaimUseCase.ts
│       └── ListClaimsUseCase.ts
│
├── infrastructure/      # External adapters (Infrastructure)
│   ├── database/
│   │   ├── models/
│   │   └── repositories/
│   └── config/
│       └── database.config.ts
│
└── interfaces/          # API adapters (Interface Layer)
    ├── controllers/
    │   └── ClaimController.ts
    ├── routes/
    │   └── claimRoutes.ts
    └── middleware/
        ├── errorHandler.ts
        └── validator.ts
```

## Component Interaction

```mermaid
graph LR
    A[HTTP Request] --> B[Routes]
    B --> C[Controller]
    C --> D[Use Case]
    D --> E[Domain Service]
    E --> F[Repository]
    F --> G[Database]
    
    G --> F
    F --> E
    E --> D
    D --> C
    C --> H[HTTP Response]
    
    style E fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
```

## Key Principles

1. **Dependency Inversion**: Core domain depends on nothing, all dependencies point inward
2. **Port & Adapters**: External systems communicate through defined interfaces (ports)
3. **Separation of Concerns**: Each layer has a single responsibility
4. **Testability**: Business logic isolated and easily testable

