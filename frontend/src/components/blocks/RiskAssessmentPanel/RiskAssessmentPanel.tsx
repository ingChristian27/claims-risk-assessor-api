import { Typography, Box } from '@mui/material';
import { RiskScoreGauge } from '../../elements/RiskScoreGauge/RiskScoreGauge';
import { Badge } from '../../elements/Badge/Badge';
import { riskAssessmentPanelStyles } from './RiskAssessmentPanel.styles';
import type { Claim } from '../../../types';

interface RiskAssessmentPanelProps {
  claim: Claim;
}

export const RiskAssessmentPanel = ({ claim }: RiskAssessmentPanelProps) => {
  if (!claim.riskAssessment) {
    return null;
  }

  const { riskScore, recommendedAction } = claim.riskAssessment;

  return (
    <Box sx={riskAssessmentPanelStyles.container}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={riskAssessmentPanelStyles.title}
      >
        Assessment Result
      </Typography>

      <Box sx={riskAssessmentPanelStyles.riskGauge}>
        <RiskScoreGauge score={riskScore} />
      </Box>

      <Box sx={riskAssessmentPanelStyles.statusRow}>
        <Typography variant="body1" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
          Status
        </Typography>
        <Badge status={claim.status} />
      </Box>

      <Box sx={riskAssessmentPanelStyles.actionRow}>
        <Typography variant="body1" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
          Recommended Action
        </Typography>
        <Typography variant="body1" sx={riskAssessmentPanelStyles.value}>
          {recommendedAction}
        </Typography>
      </Box>

      <Box sx={riskAssessmentPanelStyles.detailsContainer}>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={riskAssessmentPanelStyles.detailsTitle}
        >
          Claim Details
        </Typography>
        <Box sx={riskAssessmentPanelStyles.detailsList}>
          <Box sx={riskAssessmentPanelStyles.detailRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
              ID
            </Typography>
            <Typography variant="body2" sx={riskAssessmentPanelStyles.monospaceValue}>
              {claim.claimId}
            </Typography>
          </Box>
          <Box sx={riskAssessmentPanelStyles.detailRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
              Amount
            </Typography>
            <Typography variant="body2" sx={riskAssessmentPanelStyles.value}>
              ${claim.amount.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={riskAssessmentPanelStyles.descriptionRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.descriptionLabel}>
              Description
            </Typography>
            <Typography variant="body2" sx={riskAssessmentPanelStyles.descriptionValue}>
              {claim.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

