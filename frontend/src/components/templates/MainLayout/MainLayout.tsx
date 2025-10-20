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

      <Box component="main" sx={mainLayoutStyles.main}>
        {children}
      </Box>
    </Box>
  );
};

