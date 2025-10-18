import type { SxProps, Theme } from '@mui/material/styles';

export const riskScoreGaugeStyles = {
  container: {
    width: '100%',
  } as SxProps<Theme>,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 2,
  } as SxProps<Theme>,

  label: {
    fontWeight: 400,
  } as SxProps<Theme>,

  score: {
    fontWeight: 400,
  } as SxProps<Theme>,

  progressBar: {
    height: 8,
    borderRadius: 4,
    bgcolor: 'rgba(0, 0, 0, 0.05)',
    '& .MuiLinearProgress-bar': {
      borderRadius: 4,
    },
  } as SxProps<Theme>,

  successGradient: 'linear-gradient(90deg, #059669 0%, #10b981 100%)',
  warningGradient: 'linear-gradient(90deg, #d97706 0%, #f59e0b 100%)',
  errorGradient: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
};
