import { Chip } from '@mui/material';
import type { ClaimStatus } from '../../../types';

interface BadgeProps {
  status: ClaimStatus;
}

const statusConfig: Record<ClaimStatus, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  APPROVE: { label: 'Approved', color: 'success' },
  MANUAL_REVIEW: { label: 'Manual Review', color: 'warning' },
  REJECT: { label: 'Rejected', color: 'error' },
  PENDING: { label: 'Pending', color: 'default' },
};

export const Badge = ({ status }: BadgeProps) => {
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

