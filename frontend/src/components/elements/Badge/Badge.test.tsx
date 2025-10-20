import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render APPROVED status correctly', () => {
    render(<Badge status="APPROVED" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('should render MANUAL_REVIEW status correctly', () => {
    render(<Badge status="MANUAL_REVIEW" />);
    expect(screen.getByText('Manual Review')).toBeInTheDocument();
  });

  it('should render REJECTED status correctly', () => {
    render(<Badge status="REJECTED" />);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('should render APPROVE recommendation correctly', () => {
    render(<Badge status="APPROVE" />);
    expect(screen.getByText('Approve')).toBeInTheDocument();
  });

  it('should render REJECT recommendation correctly', () => {
    render(<Badge status="REJECT" />);
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('should render PENDING status correctly', () => {
    render(<Badge status="PENDING" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});

