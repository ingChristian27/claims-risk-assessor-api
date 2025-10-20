import type { SxProps, Theme } from '@mui/material/styles';

export const homePageStyles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  } as SxProps<Theme>,

  scrollableArea: {
    flex: 1,
    overflowY: 'auto',
    pb: 4,
  } as SxProps<Theme>,

  contentContainer: {
    py: 6,
  } as SxProps<Theme>,

  fixedFormContainer: {
    borderTop: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
  } as SxProps<Theme>,
};

