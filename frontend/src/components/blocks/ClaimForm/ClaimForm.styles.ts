import type { SxProps, Theme } from '@mui/material/styles';

export const claimFormStyles = {
  container: {
    p: 5,
    maxWidth: 880,
    mx: 'auto',
    mt: 8,
  } as SxProps<Theme>,

  header: {
    textAlign: 'center',
    mb: 3,
  } as SxProps<Theme>,

  title: {
    fontWeight: 400,
    color: 'primary.main',
    mb: 1,
    fontSize: '1.75rem',
  } as SxProps<Theme>,

  subtitle: {
    fontWeight: 400,
    fontSize: '0.95rem',
  } as SxProps<Theme>,

  alert: {
    mb: 3,
    fontWeight: 400,
    bgcolor: 'rgba(220, 38, 38, 0.05)',
    borderRadius: 2,
  } as SxProps<Theme>,

  descriptionField: {
    mb: 2,
  } as SxProps<Theme>,

  amountField: {
    mb: 2,
  } as SxProps<Theme>,

  dateField: {
    mb: 3,
  } as SxProps<Theme>,

  submitButton: {
    py: 1.5,
    fontWeight: 500,
  } as SxProps<Theme>,

  inputLabel: {
    fontWeight: 400,
  } as SxProps<Theme>,
};
