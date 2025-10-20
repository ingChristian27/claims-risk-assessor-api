import request from 'supertest';
import { createTestApp } from '../testUtils';

const app = createTestApp();

describe('POST /api/claims - Create Claim with Risk Assessment', () => {
  describe('Success Cases', () => {
    it('should create claim successfully', async () => {
      const claimData = {
        description: 'Car accident with front-end damage',
        amount: 2500.0,
        incidentDate: new Date('2025-10-15'),
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('claimId');
      expect(response.body).toHaveProperty('description', claimData.description);
      expect(response.body).toHaveProperty('amount', claimData.amount);
      expect(response.body).toHaveProperty('status', 'MANUAL_REVIEW');
      expect(response.body).toHaveProperty('aiRecommendation');
      expect(response.body).toHaveProperty('riskAssessment');
      expect(response.body.riskAssessment).toHaveProperty('riskScore');
      expect(response.body.riskAssessment).toHaveProperty('recommendedAction');
      expect(response.body.riskAssessment).toHaveProperty('category');
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
