import request from 'supertest';
import { RecommendedAction, ClaimCategory } from '@domain/entities/RiskAssessment';
import { createTestApp, mockRiskService } from '../testUtils';

const app = createTestApp();

describe('POST /api/claims - Create Claim with Risk Assessment', () => {
  // Reset mock before each test
  beforeEach(() => {
    mockRiskService.reset();
  });

  describe('Success Cases - AI Service', () => {
    it('should create claim with low risk for small amounts', async () => {
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
      expect(response.body.aiRecommendation).toBe('APPROVE');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should create claim with medium risk for moderate amounts', async () => {
      const claimData = {
        description: 'Bumper replacement needed after parking incident',
        amount: 2500.0,
        incidentDate: new Date('2025-10-14'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(35);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.aiRecommendation).toBe('MANUAL_REVIEW');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should create claim with high risk for large amounts', async () => {
      const claimData = {
        description: 'Major collision repair with extensive damage to front end',
        amount: 8000.0,
        incidentDate: new Date('2025-10-13'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(75);
      expect(response.body.riskAssessment.recommendedAction).toBe('REJECT');
      expect(response.body.aiRecommendation).toBe('REJECT');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });

    it('should use custom AI response when configured', async () => {
      // Configure mock to simulate specific OpenAI response
      mockRiskService.setMockResponse({
        riskScore: 42,
        recommendedAction: RecommendedAction.MANUAL_REVIEW,
        category: ClaimCategory.HEALTH,
      });

      const claimData = {
        description: 'Medical claim for surgery procedure',
        amount: 1500.0,
        incidentDate: new Date('2025-10-12'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(42);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.riskAssessment.category).toBe('HEALTH');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });
  });

  describe('Failure Cases - AI Service', () => {
    it('should return error when AI service fails', async () => {
      // Configure mock to fail
      mockRiskService.setFailure(true);

      const claimData = {
        description: 'Normal claim for vehicle repair',
        amount: 1200.0,
        incidentDate: new Date('2025-10-11'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      // Should return error when AI fails
      expect(response.status).toBe(502);
      expect(response.body).toHaveProperty('error');
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
