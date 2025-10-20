import { Box, Typography, LinearProgress } from '@mui/material';
import { riskScoreGaugeStyles } from './RiskScoreGauge.styles';
import type { RecommendedAction } from '@types';

interface RiskScoreGaugeProps {
  score: number;
  recommendedAction: RecommendedAction;
}

export const RiskScoreGauge = ({ score, recommendedAction }: RiskScoreGaugeProps) => {
  const getColor = () => {
    if (recommendedAction === 'APPROVE') return 'success';
    if (recommendedAction === 'REJECT') return 'error';
    return 'warning'; // MANUAL_REVIEW
  };

  const getGradient = () => {
    if (recommendedAction === 'APPROVE') return riskScoreGaugeStyles.successGradient;
    if (recommendedAction === 'REJECT') return riskScoreGaugeStyles.errorGradient;
    return riskScoreGaugeStyles.warningGradient; // MANUAL_REVIEW
  };

  return (
    <Box sx={riskScoreGaugeStyles.container}>
      <Box sx={riskScoreGaugeStyles.header}>
        <Typography variant="body2" color="text.secondary" sx={riskScoreGaugeStyles.label}>
          Risk Score
        </Typography>
        <Typography variant="body2" color="text.primary" sx={riskScoreGaugeStyles.score}>
          {score}/100
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        color={getColor()}
        sx={{
          ...riskScoreGaugeStyles.progressBar,
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: getGradient(),
          },
        }}
      />
    </Box>
  );
};

