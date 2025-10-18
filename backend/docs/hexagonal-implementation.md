# Hexagonal Architecture Implementation

## Current Structure

```
src/
├── application/                # Application Layer
│   ├── ports/                  # Interfaces (Contracts)
│   │   └── IClaimRepository.ts
│   └── usecases/               # Use Cases (Business Logic)
│       └── claim/
│           ├── CreateClaimUseCase.ts
│           └── GetClaimByIdUseCase.ts
│
├── infrastructure/             # Infrastructure Layer
│   └── repositories/           # Port Implementations
│       └── ClaimRepositoryMock.ts
│
└── interfaces/                 # Interface Layer (API)
    ├── controllers/
    │   └── ClaimController.ts
    └── routes/
        └── claimRoutes.ts
```

## Data Flow

```
HTTP Request
    ↓
Routes (Dependency Injection)
    ↓
Controller
    ↓
UseCase
    ↓
Port (Interface)
    ↓
Repository (Implementation)
    ↓
Response flows back
```

## Components

### 1. Ports (Interfaces)
**Location**: `src/application/ports/`

Defines contracts that infrastructure must implement.

- `IClaimRepository.ts` - Repository interface

### 2. Use Cases
**Location**: `src/application/usecases/claim/`

Contains business logic, depends only on ports (interfaces).

- `CreateClaimUseCase.ts` - Create claim logic
- `GetClaimByIdUseCase.ts` - Get claim logic

### 3. Repositories
**Location**: `src/infrastructure/repositories/`

Implements port interfaces, handles external dependencies.

- `ClaimRepositoryMock.ts` - Mock implementation (to be replaced with real database)

### 4. Controllers
**Location**: `src/interfaces/controllers/`

Orchestrates use cases, handles HTTP requests/responses.

- `ClaimController.ts` - Claim endpoints controller

### 5. Routes
**Location**: `src/interfaces/routes/`

Defines API endpoints, performs dependency injection.

- `claimRoutes.ts` - Claim routes with DI setup

## Dependency Injection

Currently using manual DI in routes:

```typescript
// In claimRoutes.ts
const claimRepository = new ClaimRepositoryMock();
const createClaimUseCase = new CreateClaimUseCase(claimRepository);
const getClaimByIdUseCase = new GetClaimByIdUseCase(claimRepository);
const claimController = new ClaimController(createClaimUseCase, getClaimByIdUseCase);
```

Future: Consider using DI container (e.g., TSyringe, InversifyJS)

## Benefits

- **Testability**: Easy to mock repositories and test use cases
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to swap implementations (mock → real DB)
- **Independence**: Business logic doesn't depend on external frameworks

## Next Steps

1. Implement domain entities
2. Replace ClaimRepositoryMock with real database implementation
3. Add business logic to use cases
4. Create DI container for cleaner dependency management

