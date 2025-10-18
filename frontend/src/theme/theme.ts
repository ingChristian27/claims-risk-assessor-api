import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3a8a', // Deep professional blue
      light: '#3b82f6',
      dark: '#1e40af',
    },
    secondary: {
      main: '#64748b', // Sophisticated slate
      light: '#94a3b8',
      dark: '#475569',
    },
    success: {
      main: '#059669', // Professional green
      light: '#10b981',
      dark: '#047857',
    },
    warning: {
      main: '#d97706', // Amber warning
      light: '#f59e0b',
      dark: '#b45309',
    },
    error: {
      main: '#dc2626', // Professional red
      light: '#ef4444',
      dark: '#b91c1c',
    },
    background: {
      default: '#f1f5f9', // Slightly darker blue-gray
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Deep slate
      secondary: '#475569', // Medium slate
    },
    divider: 'rgba(15, 23, 42, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h3: {
      fontWeight: 300,
      letterSpacing: '-0.02em',
      fontSize: '2.5rem',
    },
    h5: {
      fontWeight: 400,
      letterSpacing: '-0.01em',
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 400,
      letterSpacing: '-0.005em',
    },
    body1: {
      fontWeight: 300,
      fontSize: '0.95rem',
    },
    body2: {
      fontWeight: 300,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        elevation0: {
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontWeight: 400,
            borderRadius: 8,
            '& fieldset': {
              borderWidth: '1px',
              borderColor: 'rgba(0, 0, 0, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#1e3a8a',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 400,
            color: '#64748b',
            '&.Mui-focused': {
              color: '#1e3a8a',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '12px 24px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: '#1e3a8a',
          '&:hover': {
            background: '#1e40af',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          borderWidth: '1px',
          borderRadius: 8,
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          borderRadius: 12,
        },
      },
    },
  },
});

