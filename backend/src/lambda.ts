import 'tsconfig-paths/register';
import serverlessExpress from '@vendia/serverless-express';
import type { APIGatewayProxyHandler } from 'aws-lambda';
import dotenv from 'dotenv';
import { createServer } from '@infrastructure/http/server';
import { createDependenciesAWS } from './config/dependencies.aws';

// Load environment variables
dotenv.config();

// Initialize dependencies for AWS (DynamoDB)
const { claimController } = createDependenciesAWS();

// Create Express server
const app = createServer(claimController);

// Export Lambda handler
export const handler: APIGatewayProxyHandler = serverlessExpress({ app });
