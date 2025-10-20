# Claims Risk Assessor - Frontend

React + TypeScript frontend with Material-UI, Atomic Design, and professional architecture patterns.

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) + Icons
- **Form Handling**: React Hook Form + Yup validation
- **HTTP Client**: Axios with interceptors
- **State Management**: Custom hooks (useApiMutation)
- **Design Pattern**: Atomic Design + Container/Presentational
- **Path Aliases**: Clean imports (@hooks, @blocks, @components)

## 📦 Project Structure

```
src/
├── components/
│   ├── elements/          # Atomic: Button, Badge, CategoryChip, RiskScoreGauge
│   ├── blocks/            # Composite: ClaimForm, RiskAssessmentPanel, EmptyState
│   └── templates/         # Layouts: MainLayout
├── pages/                 # Pages: HomePage (Container pattern)
├── hooks/                 # Custom hooks: useApiMutation
├── services/              # API client with Axios interceptors
├── utils/                 # Utilities: formatCurrency
├── theme/                 # Material-UI theme
└── types/                 # TypeScript definitions
```

## ✨ Key Features

### Architecture Patterns
- **Container/Presentational**: Logic separation for testability
- **Custom Hooks**: `useApiMutation` - generic API mutation hook (React Query pattern)
- **Path Aliases**: Clean imports (`@hooks`, `@blocks`, `@components`)
- **Atomic Design**: Scalable component hierarchy

### User Experience
- **Loading States**: Skeleton loaders during API calls
- **Error Handling**: Axios interceptors with user-friendly messages
- **Responsive Design**: Mobile-first layout
- **Category Icons**: Visual claim type identification (Auto 🚗, Health 🏥, etc.)
- **Form Validation**: Real-time validation with Yup schema

### Performance
- **React.memo**: Selective memoization on CategoryChip and Badge
- **Code Splitting**: Vite automatic optimizations
- **Lazy Loading**: Future-ready architecture

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend URL
```

3. **Start development server**
```bash
npm run dev
```

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Run tests (Vitest)
npm test

# Run tests in watch mode
npm run test:watch
```

## 🧪 Testing

**Framework**: Vitest + React Testing Library

**Test Coverage**: 16 tests across 4 files
- ✅ `currency.test.ts` - Utility functions
- ✅ `useApiMutation.test.ts` - Custom hooks
- ✅ `Badge.test.tsx` - UI components
- ✅ `HomePage.test.tsx` - Integration tests (form → backend → results)

```bash
# Run all tests
npm test

# Watch mode for TDD
npm run test:watch
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |

**Important:** All environment variables must start with `VITE_` prefix (Vite requirement).

### Examples

**Local development:**
```env
VITE_API_URL=http://localhost:PORT/api
```

**Production (AWS Lambda):**
```env
VITE_API_URL=https://your-api-gateway-url.amazonaws.com/api
```

## ☁️ AWS Amplify Deployment

### Build Configuration

Use this `amplify.yml` in the monorepo root:

```yaml
version: 1
applications:
  - appRoot: frontend
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
```

### Environment Variables in Amplify

Add in AWS Amplify Console → Environment variables:

- **Key**: `VITE_API_URL`
- **Value**: `https://your-api-gateway-url.amazonaws.com/api`

**Note:** Redeploy after adding/changing environment variables (they're injected at build time).

## 🎨 Design System

**Atomic Design Hierarchy:**
- **Elements**: `Button`, `Badge`, `CategoryChip`, `RiskScoreGauge`
- **Blocks**: `ClaimForm`, `RiskAssessmentPanel`, `EmptyState`
- **Templates**: `MainLayout`
- **Pages**: `HomePage`

**Theme**: Custom Material-UI theme in `src/theme/theme.ts`

## 🏗️ Architecture Highlights

### Path Aliases
```typescript
import { useApiMutation } from '@hooks/useApiMutation';
import { ClaimForm } from '@blocks/ClaimForm/ClaimForm';
import { formatCurrency } from '@utils/currency';
```

### Custom Hooks
```typescript
// useApiMutation - Generic mutation hook (React Query pattern)
const { mutate, isLoading, error, data } = useApiMutation(createClaim);
```

### Axios Interceptors
- Request logging (dev only)
- Centralized error handling
- User-friendly error messages
- 30s timeout

## 📝 License

ISC
