import { Typography, Box } from '@mui/material';
import { RiskScoreGauge } from '@elements/RiskScoreGauge/RiskScoreGauge';
import { Badge } from '@elements/Badge/Badge';
import { CategoryChip } from '@elements/CategoryChip/CategoryChip';
import { riskAssessmentPanelStyles } from './RiskAssessmentPanel.styles';
import { formatCurrency } from '@utils/currency';
import type { Claim } from '@types';

const LABELS = {
  TITLE: 'Risk Assessment Result',
  AI_RECOMMENDATION: 'AI Recommendation',
  AI_REASONING: 'AI Reasoning',
  CLAIM_DETAILS: 'Claim Details',
  ID: 'ID',
  AMOUNT: 'Amount',
  DESCRIPTION: 'Description',
} as const;

interface RiskAssessmentPanelProps {
  claim: Claim;
}

export const RiskAssessmentPanel = ({ claim }: RiskAssessmentPanelProps) => {
  if (!claim.riskAssessment) {
    return null;
  }

  const { riskScore, recommendedAction, category, reasoning } = claim.riskAssessment;

  return (
    <Box sx={riskAssessmentPanelStyles.container}>
      <Box sx={riskAssessmentPanelStyles.headerRow}>
        <Typography
          variant="h5"
          component="h2"
          sx={riskAssessmentPanelStyles.title}
        >
          {LABELS.TITLE}
        </Typography>
        <CategoryChip category={category} size="medium" />
      </Box>

      <Box sx={riskAssessmentPanelStyles.riskGauge}>
        <RiskScoreGauge score={riskScore} recommendedAction={recommendedAction} />
      </Box>

      <Box sx={riskAssessmentPanelStyles.actionRow}>
        <Typography variant="body1" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
          {LABELS.AI_RECOMMENDATION}
        </Typography>
        <Badge status={claim.aiRecommendation || recommendedAction} />
      </Box>

      {reasoning && (
        <Box sx={riskAssessmentPanelStyles.reasoningBox}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            gutterBottom 
            sx={riskAssessmentPanelStyles.reasoningTitle}
          >
            {LABELS.AI_REASONING}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.primary" 
            sx={riskAssessmentPanelStyles.reasoningText}
          >
            {reasoning}
          </Typography>
        </Box>
      )}

      <Box sx={riskAssessmentPanelStyles.detailsContainer}>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={riskAssessmentPanelStyles.detailsTitle}
        >
          {LABELS.CLAIM_DETAILS}
        </Typography>
        <Box sx={riskAssessmentPanelStyles.detailsList}>
          <Box sx={riskAssessmentPanelStyles.detailRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
              {LABELS.ID}
            </Typography>
            <Typography variant="body2" sx={riskAssessmentPanelStyles.monospaceValue}>
              {claim.claimId}
            </Typography>
          </Box>
          <Box sx={riskAssessmentPanelStyles.detailRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.label}>
              {LABELS.AMOUNT}
            </Typography>
            <Typography variant="body2" sx={riskAssessmentPanelStyles.value}>
              {formatCurrency(claim.amount)}
            </Typography>
          </Box>
          <Box sx={riskAssessmentPanelStyles.descriptionRow}>
            <Typography variant="body2" color="text.secondary" sx={riskAssessmentPanelStyles.descriptionLabel}>
              {LABELS.DESCRIPTION}
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

