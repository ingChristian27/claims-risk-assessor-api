import { Box, Skeleton } from '@mui/material';
import { riskAssessmentSkeletonStyles } from './RiskAssessmentPanel.styles';

export const RiskAssessmentSkeleton = () => {
  return (
    <Box sx={riskAssessmentSkeletonStyles.container}>
      {/* Header */}
      <Box sx={riskAssessmentSkeletonStyles.headerRow}>
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.headerTitle} />
        <Skeleton variant="rounded" sx={riskAssessmentSkeletonStyles.headerChip} />
      </Box>

      {/* Risk Gauge */}
      <Box sx={riskAssessmentSkeletonStyles.gaugeContainer}>
        <Box sx={riskAssessmentSkeletonStyles.gaugeHeader}>
          <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.gaugeLabel} />
          <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.gaugeScore} />
        </Box>
        <Skeleton variant="rounded" sx={riskAssessmentSkeletonStyles.gaugeBar} />
      </Box>

      {/* AI Recommendation Row */}
      <Box sx={riskAssessmentSkeletonStyles.actionRow}>
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.actionLabel} />
        <Skeleton variant="rounded" sx={riskAssessmentSkeletonStyles.statusBadge} />
      </Box>

      {/* AI Reasoning Box */}
      <Box sx={riskAssessmentSkeletonStyles.reasoningBox}>
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.reasoningTitle} />
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.reasoningLine} />
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.reasoningLineMedium} />
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.reasoningLineShort} />
      </Box>

      {/* Details Container */}
      <Box sx={riskAssessmentSkeletonStyles.detailsContainer}>
        <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailsTitle} />
        <Box sx={riskAssessmentSkeletonStyles.detailsList}>
          <Box sx={riskAssessmentSkeletonStyles.detailRow}>
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailKeyShort} />
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailValueLong} />
          </Box>
          <Box sx={riskAssessmentSkeletonStyles.detailRow}>
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailKeyMedium} />
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailValueMedium} />
          </Box>
          <Box sx={riskAssessmentSkeletonStyles.detailRow}>
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailKeyLong} />
            <Skeleton variant="text" sx={riskAssessmentSkeletonStyles.detailValueXLong} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

