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

### Backend (Local)
```bash
cd backend
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend (Local)
```bash
cd frontend
npm install
cp .env.example .env
# Update VITE_API_URL if needed (defaults to http://localhost:3000/api)
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

## 📊 Production Deployment

**Frontend**: AWS Amplify  
**URL**: https://main.d1n498i7rx6ywn.amplifyapp.com

**Backend**: AWS Lambda + API Gateway  
**Region**: us-east-1

## 🎓 Learning Highlights

This project demonstrates:
- Hexagonal Architecture in practice
- Domain-Driven Design principles
- Professional error handling patterns
- Test-Driven Development
- AWS serverless deployment
- Modern React patterns

## 📝 License

ISC

## 👨‍💻 Author

Christian Dachiardi

