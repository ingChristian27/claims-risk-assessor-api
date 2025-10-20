import { Box, Typography } from '@mui/material';
import { emptyStateStyles } from './EmptyState.styles';

const LABELS = {
  TITLE: 'AI-Powered Claims Assessment',
  SUBTITLE: 'Submit your insurance claim below and receive an instant risk assessment with AI-powered recommendations',
} as const;

export const EmptyState = () => {
  return (
    <Box sx={emptyStateStyles.container}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={emptyStateStyles.title}
      >
        {LABELS.TITLE}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={emptyStateStyles.subtitle}
      >
        {LABELS.SUBTITLE}
      </Typography>
    </Box>
  );
};

