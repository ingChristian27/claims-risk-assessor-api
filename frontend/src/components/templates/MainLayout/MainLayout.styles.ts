import type { SxProps, Theme } from '@mui/material/styles';

export const mainLayoutStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    bgcolor: 'background.default',
  } as SxProps<Theme>,

  header: {
    py: 2.5,
    bgcolor: 'background.paper',
    borderBottom: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  headerTitle: {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: '#1e3a8a',
    fontSize: '1.1rem',
  } as SxProps<Theme>,

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as SxProps<Theme>,
};
