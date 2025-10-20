import { memo } from 'react';
import { Chip } from '@mui/material';
import type { ClaimStatus, RecommendedAction } from '@types';

interface BadgeProps {
  status: ClaimStatus | RecommendedAction;
}

const statusConfig: Record<ClaimStatus | RecommendedAction, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  // Claim Statuses
  APPROVED: { label: 'Approved', color: 'success' },
  MANUAL_REVIEW: { label: 'Manual Review', color: 'warning' },
  REJECTED: { label: 'Rejected', color: 'error' },
  PENDING: { label: 'Pending', color: 'default' },
  // AI Recommendations
  APPROVE: { label: 'Approve', color: 'success' },
  REJECT: { label: 'Reject', color: 'error' },
};

const BadgeComponent = ({ status }: BadgeProps) => {
  const config = statusConfig[status];
  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="outlined"
      sx={{
        fontWeight: 300,
        borderWidth: '1px',
      }}
    />
  );
};

export const Badge = memo(BadgeComponent);

