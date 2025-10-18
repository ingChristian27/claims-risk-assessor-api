import type { SxProps, Theme } from '@mui/material/styles';

export const mainLayoutStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    bgcolor: 'background.default',
  } as SxProps<Theme>,

  header: {
    py: 3,
    bgcolor: '#f8fafc', // Lighter blue-gray from same family
    borderBottom: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.06)',
  } as SxProps<Theme>,

  headerTitle: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: 'primary.main',
  } as SxProps<Theme>,

  main: {
    flex: 1,
    py: 6,
  } as SxProps<Theme>,

  footer: {
    py: 4,
    px: 2,
    mt: 'auto',
    bgcolor: 'background.default',
  } as SxProps<Theme>,

  footerText: {
    fontWeight: 400,
  } as SxProps<Theme>,
};
