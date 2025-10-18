# Architecture Diagram

## System Architecture

```mermaid
graph TD
    subgraph Client
        User[End User]
        Frontend[Frontend - React]
    end

    subgraph AWS["AWS Cloud"]
        APIGateway[API Gateway]
        Lambda[Lambda Function<br/>Node.js 20]
        DB[(In-Memory Store<br/>Ready for DynamoDB)]
    end

    subgraph External["External Services"]
        AI[OpenAI API]
    end

    User -->|Interacts| Frontend
    Frontend -->|HTTPS| APIGateway
    APIGateway -->|Invokes| Lambda
    Lambda -->|Stores| DB
    Lambda -->|Risk Assessment| AI
    AI -->|Score & Action| Lambda
    Lambda -->|JSON Response| APIGateway
    APIGateway -->|HTTPS| Frontend
    Frontend -->|Displays| User

    %% Styling
    classDef frontend fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px;
    classDef external fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px;

    class Frontend,User frontend;
    class APIGateway,Lambda,DB aws;
    class AI external;
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
│   ├── services/
│   │   └── RiskAssessmentService.ts    # Business rules
│   └── ports/
│       └── IRiskAssessmentService.ts   # Port for AI
│
├── application/         # Use cases (Application Layer)
│   ├── usecases/
│   │   ├── CreateClaimUseCase.ts
│   │   └── GetClaimByIdUseCase.ts
│   ├── ports/
│   │   └── IClaimRepository.ts         # Port for DB
│   └── validators/
│       └── createClaimValidator.ts
│
├── infrastructure/      # External adapters (Infrastructure)
│   ├── repositories/
│   │   ├── ClaimRepositoryMock.ts      # Current: In-Memory
│   │   └── ClaimRepositoryDynamoDB.ts  # Future: DynamoDB
│   ├── services/
│   │   └── OpenAIRiskAssessmentService.ts
│   └── http/
│       └── server.ts
│
└── interfaces/          # API adapters (Interface Layer)
    ├── controllers/
    │   └── ClaimController.ts
    └── routes/
        └── claimRoutes.ts
```

## Component Interaction

```mermaid
graph LR
    A[API Gateway] --> B[Lambda Handler]
    B --> C[ClaimController]
    C --> D[CreateClaimUseCase]
    D --> E[ClaimRepository]
    E --> F[(Database)]
    
    D --> G[RiskAssessmentService]
    G --> H[OpenAI Service]
    H -.Fallback.-> G
    
    G --> D
    D --> C
    C --> B
    B --> I[JSON Response]
    
    style G fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#ffa,stroke:#333,stroke-width:2px
```

## Key Principles

1. **Dependency Inversion**: Core domain depends on nothing, all dependencies point inward
2. **Port & Adapters**: External systems communicate through defined interfaces (ports)
3. **Separation of Concerns**: Each layer has a single responsibility
4. **Testability**: Business logic isolated and easily testable

