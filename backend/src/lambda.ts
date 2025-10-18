import 'tsconfig-paths/register';
import serverlessExpress from '@vendia/serverless-express';
import type { APIGatewayProxyHandler } from 'aws-lambda';
import dotenv from 'dotenv';
import { createServer } from '@infrastructure/http/server';
import { createDependencies } from './config/dependencies';

// Load environment variables
dotenv.config();

// Initialize dependencies (automatically selects Mock or DynamoDB)
const { claimController } = createDependencies();

// Create Express server
const app = createServer(claimController);

// Export Lambda handler
export const handler: APIGatewayProxyHandler = serverlessExpress({ app });
