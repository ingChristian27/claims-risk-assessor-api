import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';
import * as api from '@services/api';
import type { Claim } from '@types';

// Mock API module
vi.mock('@services/api', () => ({
  createClaim: vi.fn(),
}));

describe('HomePage - Integration Test', () => {
  const mockClaim: Claim = {
    claimId: 'test-123',
    userId: 'user-mock',
    description: 'Car accident with severe damage',
    amount: 5000,
    status: 'MANUAL_REVIEW',
    aiRecommendation: 'MANUAL_REVIEW',
    submittedAt: '2024-01-15T10:00:00.000Z',
    riskAssessment: {
      riskScore: 65,
      recommendedAction: 'MANUAL_REVIEW',
      category: 'AUTO',
      reasoning: 'High claim amount requires manual review',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fill form, submit, and display results', async () => {
    const user = userEvent.setup();

    // Mock backend response
    vi.mocked(api.createClaim).mockResolvedValue(mockClaim);

    render(<HomePage />);

    // Verify EmptyState is shown initially
    expect(screen.getByText(/AI-Powered Claims Assessment/i)).toBeInTheDocument();

    // Fill the form
    const amountInput = screen.getByLabelText(/Claim amount/i);
    const dateInput = screen.getByLabelText(/Incident date/i);
    const descriptionInput = screen.getByLabelText(/Describe the incident/i);

    await user.type(amountInput, '5000');
    await user.type(dateInput, '2024-01-15');
    await user.type(descriptionInput, 'Car accident with severe damage');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Assess Risk/i });
    await user.click(submitButton);

    // Verify skeleton loader is shown
    await waitFor(() => {
      expect(screen.queryByText(/Submit your first claim/i)).not.toBeInTheDocument();
    });

    // Wait for results to appear
    await waitFor(
      () => {
        expect(screen.getByText(/Risk Assessment Result/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify correct data is displayed
    expect(screen.getByText(/65/)).toBeInTheDocument(); // Risk score
    expect(screen.getByText('Manual Review')).toBeInTheDocument(); // Status badge
    expect(screen.getByText(/\$5,000/)).toBeInTheDocument(); // Amount
    expect(screen.getByText(/Car accident with severe damage/i)).toBeInTheDocument(); // Description

    // Verify backend was called correctly
    expect(api.createClaim).toHaveBeenCalledWith({
      description: 'Car accident with severe damage',
      amount: 5000,
      incidentDate: expect.any(String),
    });
  });

  it('should display error when submission fails', async () => {
    const user = userEvent.setup();

    // Mock backend error
    vi.mocked(api.createClaim).mockRejectedValue(
      new Error('Network error: Unable to connect')
    );

    render(<HomePage />);

    // Fill the form
    const amountInput = screen.getByLabelText(/Claim amount/i);
    const dateInput = screen.getByLabelText(/Incident date/i);
    const descriptionInput = screen.getByLabelText(/Describe the incident/i);

    await user.type(amountInput, '3000');
    await user.type(dateInput, '2024-01-10');
    await user.type(descriptionInput, 'Home damage from severe storm');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Assess Risk/i });
    await user.click(submitButton);

    // Wait for error to appear
    await waitFor(
      () => {
        expect(
          screen.getByText(/Network error: Unable to connect/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify results are not shown
    expect(screen.queryByText(/Risk Assessment Result/i)).not.toBeInTheDocument();
  });

});

