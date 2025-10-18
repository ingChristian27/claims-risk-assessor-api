import { Box, Container, Typography } from '@mui/material';
import { mainLayoutStyles } from './MainLayout.styles';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={mainLayoutStyles.root}>
      <Box component="header" sx={mainLayoutStyles.header}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            component="div"
            sx={mainLayoutStyles.headerTitle}
          >
            Claims Risk Assessor
          </Typography>
        </Container>
      </Box>

      <Container component="main" sx={mainLayoutStyles.main}>
        {children}
      </Container>

      <Box component="footer" sx={mainLayoutStyles.footer}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center" sx={mainLayoutStyles.footerText}>
            © 2025 Claims Risk Assessor
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

