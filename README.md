# Claims Risk Assessor

AI-powered insurance claims risk assessment system with real-time evaluation using OpenAI GPT.

## 🏗️ Architecture

Full-stack application with hexagonal architecture (Ports & Adapters) and Domain-Driven Design. Built as a **monorepo** to accelerate development and maintain type consistency across frontend and backend.

## 📦 Project Structure

```
claims-risk-assessor/
├── backend/          # Node.js + TypeScript + Express API
│   ├── src/
│   │   ├── domain/           # Business logic & entities
│   │   ├── application/      # Use cases & DTOs
│   │   ├── infrastructure/   # External services (OpenAI, repositories)
│   │   └── interfaces/       # Controllers & routes
│   ├── test/
│   ├── serverless.yml        # AWS Lambda configuration
│   └── README.md
└── frontend/         # React + TypeScript + Material-UI
    ├── src/
    │   ├── components/       # Atomic Design (elements, blocks, templates)
    │   ├── services/         # API client
    │   └── theme/            # Material-UI theme
    └── README.md
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: Hexagonal (Ports & Adapters) + DDD
- **AI**: OpenAI GPT-3.5
- **Validation**: Joi
- **Testing**: Jest (15 tests)
- **Deployment**: AWS Lambda + Serverless Framework

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Build Tool**: Vite
- **Form Handling**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Design**: Atomic Design pattern

## 📚 Documentation

- [Backend README](./backend/README.md) - API documentation, architecture, setup
- [Frontend README](./frontend/README.md) - Components, theme, deployment

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL to your backend URL
npm run dev
```

App runs on `http://localhost:5173`

## ☁️ AWS Deployment

### Backend (Lambda)
```bash
cd backend
npm run deploy:dev
```

Deploys to AWS Lambda + API Gateway

### Frontend (Amplify)
1. Push to GitHub
2. Connect AWS Amplify to repo
3. Configure build settings:
   - **App root directory**: `frontend`
   - Use the provided `amplify.yml` configuration
4. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-api-id.execute-api.us-east-1.amazonaws.com/api`
5. Deploy automatically

## 🧪 Testing

```bash
cd backend
npm test
```

## 🎓 Key Features

### Backend
- **Hexagonal Architecture**: Clean separation of domain, application, and infrastructure
- **Domain-Driven Design**: Rich domain entities with business logic
- **AI Safety**: Human-in-the-Loop pattern prevents AI hallucination risks
- **DynamoDB Integration**: Serverless persistence with GSI for queries
- **Error Handling**: Centralized domain exceptions with error codes
- **TypeScript**: Strict type safety across the stack

### Frontend
- **Custom Hooks**: Generic `useApiMutation` (React Query pattern)
- **Path Aliases**: Clean imports (`@hooks`, `@blocks`, `@components`)
- **Container/Presentational**: Separation of logic and UI
- **Axios Interceptors**: Centralized HTTP error handling
- **Atomic Design**: Scalable component hierarchy
- **Performance**: Selective React.memo optimization

### DevOps
- **Monorepo**: Single repository for frontend and backend
- **Serverless Framework**: Infrastructure as Code
- **AWS Lambda**: Auto-scaling, pay-per-use
- **AWS Amplify**: CI/CD for frontend
- **Environment Management**: Secure configuration handling

