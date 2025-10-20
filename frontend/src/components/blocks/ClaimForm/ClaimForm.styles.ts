import type { SxProps, Theme } from '@mui/material/styles';

export const claimFormStyles = {
  container: {
    py: 4,
    px: 3,
  } as SxProps<Theme>,

  alert: {
    mb: 3,
    borderRadius: 2,
  } as SxProps<Theme>,

  descriptionField: {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      bgcolor: 'background.default',
    },
  } as SxProps<Theme>,

  fieldsRow: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  } as SxProps<Theme>,

  amountField: {
    flex: { xs: '1 1 calc(50% - 8px)', sm: 1 },
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: 'background.default',
    },
  } as SxProps<Theme>,

  dateField: {
    flex: { xs: '1 1 calc(50% - 8px)', sm: 1 },
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: 'background.default',
    },
  } as SxProps<Theme>,

  submitButton: {
    minWidth: { xs: '100%', sm: 140 },
    height: 44,
    borderRadius: '14px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  } as SxProps<Theme>,

  moneyIcon: {
    fontSize: 20,
    color: 'text.secondary',
  } as SxProps<Theme>,

  sendIcon: {
    ml: 1,
    fontSize: 18,
  } as SxProps<Theme>,
};
