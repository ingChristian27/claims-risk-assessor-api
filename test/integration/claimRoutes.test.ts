import request from 'supertest';
import { createTestApp } from '../testUtils';

const app = createTestApp();

describe('Claim Routes', () => {
  describe('POST /api/claims', () => {
    it('should create a new claim with risk assessment', async () => {
      const claimData = {
        description: 'Minor door dent repair',
        amount: 450.0,
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('claimId');
      expect(response.body).toHaveProperty('description', claimData.description);
      expect(response.body).toHaveProperty('amount', claimData.amount);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('riskAssessment');
      expect(response.body.riskAssessment).toHaveProperty('riskScore');
      expect(response.body.riskAssessment).toHaveProperty('recommendedAction');
    });

    it('should calculate low risk for small amounts', async () => {
      const claimData = {
        description: 'Small scratch repair',
        amount: 300.0,
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(10);
      expect(response.body.riskAssessment.recommendedAction).toBe('APPROVE');
      expect(response.body.status).toBe('APPROVE');
    });

    it('should calculate medium risk for moderate amounts', async () => {
      const claimData = {
        description: 'Bumper replacement needed',
        amount: 5000.0,
      };

      const response = await request(app).post('/api/claims').send(claimData);

      expect(response.status).toBe(201);
      expect(response.body.riskAssessment.riskScore).toBe(30);
      expect(response.body.riskAssessment.recommendedAction).toBe('MANUAL_REVIEW');
      expect(response.body.status).toBe('MANUAL_REVIEW');
    });
  });

  describe('GET /api/claims/:id', () => {
    it('should return claim when exists', async () => {
      const claimId = 'claim-001'; // Mock data exists

      const response = await request(app).get(`/api/claims/${claimId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('claimId', claimId);
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('amount');
      expect(response.body).toHaveProperty('status');
    });

    it('should return 404 when claim not found', async () => {
      const claimId = 'nonexistent-id';

      const response = await request(app).get(`/api/claims/${claimId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Claim not found');
    });
  });
});
