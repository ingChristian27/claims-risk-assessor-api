import type { SxProps, Theme } from '@mui/material/styles';

export const emptyStateStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    px: 4,
  } as SxProps<Theme>,

  title: {
    fontWeight: 200,
    color: 'primary.main',
    mb: 3,
    letterSpacing: '-0.02em',
  } as SxProps<Theme>,

  subtitle: {
    fontWeight: 300,
    maxWidth: 600,
    lineHeight: 1.8,
  } as SxProps<Theme>,
};

