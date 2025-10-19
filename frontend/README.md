# Claims Risk Assessor - Frontend

React frontend application for insurance claims risk assessment with Material-UI and Atomic Design pattern.

## 🚀 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Form Handling**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Design Pattern**: Atomic Design (elements → blocks → templates → pages)

## 📦 Project Structure

```
src/
├── components/
│   ├── elements/          # Atomic components (Button, Badge, etc.)
│   ├── blocks/            # Composite components (ClaimForm, RiskPanel)
│   └── templates/         # Page layouts (MainLayout)
├── pages/                 # Page components (HomePage)
├── services/              # API client (Axios configuration)
├── theme/                 # Material-UI theme customization
└── types/                 # TypeScript type definitions
```

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
```

Edit `.env` and set your backend URL:
```env
# Backend API URL (defaults to localhost if not set)
VITE_API_URL=http://localhost:3000/api
```

3. **Start development server**
```bash
npm run dev
```

App runs on `http://localhost:5173`

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
```

## 🌍 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | No | `http://localhost:3000/api` |

**Important:** All environment variables exposed to the frontend **must** start with `VITE_` prefix (Vite security requirement).

### Production Example

For AWS Lambda backend:
```env
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/api
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

### Atomic Design Structure

- **Elements** (`components/elements/`): Basic building blocks
  - `Button`, `Badge`, `RiskScoreGauge`

- **Blocks** (`components/blocks/`): Feature-specific components
  - `ClaimForm`, `RiskAssessmentPanel`

- **Templates** (`components/templates/`): Page layouts
  - `MainLayout`

- **Pages** (`pages/`): Complete pages
  - `HomePage`

### Theme Customization

Theme configuration in `src/theme/theme.ts`:
- Color palette
- Typography
- Spacing
- Component overrides

## 📊 Production Deployment

**Frontend**: https://main.d1n498i7rx6ywn.amplifyapp.com

**Backend**: AWS Lambda (us-east-1)

## 📝 License

ISC
