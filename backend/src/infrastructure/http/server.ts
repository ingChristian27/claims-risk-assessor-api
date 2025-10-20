import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ClaimController } from '@interfaces/controllers/ClaimController';
import { createClaimRoutes } from '@interfaces/routes/claimRoutes';

export function createServer(claimController: ClaimController): Express {
  const app = express();

  // Trust proxy to get correct IP from API Gateway
  app.set('trust proxy', true);

  // Security: Helmet.js - Sets security headers
  app.use(helmet());

  // Security: CORS - Configure allowed origins
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  // Body parser
  app.use(express.json({ limit: '1mb' })); // Prevent large payloads

  // Security: Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    skip: (req) => !req.ip, // Skip if IP is not available
    validate: { trustProxy: false }, // Disable validation for AWS Lambda/API Gateway
  });
  app.use('/api', limiter);

  // Routes
  app.use('/api', createClaimRoutes(claimController));

  return app;
}
