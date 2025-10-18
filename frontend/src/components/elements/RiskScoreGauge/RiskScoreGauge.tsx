import { Box, Typography, LinearProgress } from '@mui/material';
import { riskScoreGaugeStyles } from './RiskScoreGauge.styles';

interface RiskScoreGaugeProps {
  score: number;
}

export const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const getColor = () => {
    if (score < 30) return 'success';
    if (score < 70) return 'warning';
    return 'error';
  };

  const getGradient = () => {
    if (score < 30) return riskScoreGaugeStyles.successGradient;
    if (score < 70) return riskScoreGaugeStyles.warningGradient;
    return riskScoreGaugeStyles.errorGradient;
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

