import request from 'supertest';
import { RecommendedAction } from '@domain/entities/RiskAssessment';
import { createTestApp, mockRiskService } from '../testUtils';

const app = createTestApp();

describe('POST /api/claims - Create Claim with Risk Assessment', () => {
  // Reset mock before each test
  beforeEach(() => {
    mockRiskService.reset();
  });

  describe('Success Cases - Domain Business Rules', () => {
    it('should create claim with low risk for small amounts (< $1000)', async () => {
      const claimData = {
        description: 'Small scratch repair on vehicle door',
        amount: 500.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('claimId');
      expect(response.body).toHaveProperty('description', claimData.description);
      expect(response.body).toHaveProperty('amount', claimData.amount);
      expect(response.body.riskAssessment.riskScore).toBe(15);
      expect(response.body.riskAssessment.recommendedAction).toBe('APPROVE');
      expect(response.body.status).toBe('APPROVE');
    });

    it('should create claim with medium risk for moderate amounts ($1000-$5000)', async () => {
      const claimData = {
        description: 'Bumper replacement needed after parking incident',
        amount: 2500.0,
        incidentDate: new Date('2025-10-14'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(35);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should create claim with high risk for large amounts (> $5000)', async () => {
      const claimData = {
        description: 'Major collision repair with extensive damage to front end',
        amount: 8000.0,
        incidentDate: new Date('2025-10-13'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(75);
      expect(response.body.riskAssessment.recommendedAction).toBe('REJECT');
      expect(response.body.status).toBe('REJECT');
    });
  });

  describe('Success Cases - OpenAI Service', () => {
    it('should use OpenAI response when service succeeds', async () => {
      // Configure mock to simulate OpenAI response
      mockRiskService.setMockResponse({
        riskScore: 42,
        recommendedAction: RecommendedAction.MANUAL_REVIEW,
      });

      const claimData = {
        description: 'Suspicious claim pattern detected in documentation',
        amount: 1500.0,
        incidentDate: new Date('2025-10-12'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(42);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should handle AI approval with low risk score', async () => {
      mockRiskService.setMockResponse({
        riskScore: 5,
        recommendedAction: RecommendedAction.APPROVE,
      });

      const claimData = {
        description: 'Legitimate small claim for minor damages',
        amount: 200.0,
        incidentDate: new Date('2025-10-16'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(5);
      expect(response.body.riskAssessment.recommendedAction).toBe('APPROVE');
    });
  });

  describe('Failure Cases - OpenAI Service Fallback', () => {
    it('should use domain business rules when OpenAI fails', async () => {
      // Configure mock to fail
      mockRiskService.setFailure(true);

      const claimData = {
        description: 'Normal claim for vehicle repair',
        amount: 1200.0, // Between $1000-$5000 → domain rule: 35, MANUAL_REVIEW
        incidentDate: new Date('2025-10-11'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      // Should continue working with domain rules
      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(35);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should handle OpenAI failure for low amount claims', async () => {
      mockRiskService.setFailure(true);

      const claimData = {
        description: 'Small repair on side mirror',
        amount: 400.0, // < $1000 → domain rule: 15, APPROVE
        incidentDate: new Date('2025-10-10'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(15);
      expect(response.body.riskAssessment.recommendedAction).toBe('APPROVE');
    });

    it('should handle OpenAI failure for high amount claims', async () => {
      mockRiskService.setFailure(true);

      const claimData = {
        description: 'Expensive repair with total loss assessment',
        amount: 10000.0, // > $5000 → domain rule: 75, REJECT
        incidentDate: new Date('2025-10-09'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(75);
      expect(response.body.riskAssessment.recommendedAction).toBe('REJECT');
    });
  });

  describe('Data Validation', () => {
    it('should return all required fields in response', async () => {
      const claimData = {
        description: 'Test claim for validation check',
        amount: 1000.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('claimId');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('amount');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('submittedAt');
      expect(response.body).toHaveProperty('riskAssessment');
      expect(response.body.riskAssessment).toHaveProperty('riskScore');
      expect(response.body.riskAssessment).toHaveProperty('recommendedAction');
    });

    it('should reject claim with missing description', async () => {
      const invalidData = {
        amount: 500.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Description is required');
    });

    it('should reject claim with description too short', async () => {
      const invalidData = {
        description: 'Short',
        amount: 500.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('at least 10 characters');
    });

    it('should reject claim with negative amount', async () => {
      const invalidData = {
        description: 'Valid description for testing',
        amount: -100.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('greater than 0');
    });

    it('should reject claim with amount exceeding limit', async () => {
      const invalidData = {
        description: 'Valid description for testing',
        amount: 150000.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('100,000');
    });

    it('should reject claim with future incident date', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);

      const invalidData = {
        description: 'Valid description for testing',
        amount: 500.0,
        incidentDate: futureDate,
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('cannot be in the future');
    });

    it('should reject claim with missing incident date', async () => {
      const invalidData = {
        description: 'Valid description for testing',
        amount: 500.0,
      };

      const response = await request(app).post('/api/claims').send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Incident date is required');
    });
  });
});
