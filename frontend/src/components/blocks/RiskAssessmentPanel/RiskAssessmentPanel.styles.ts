import type { SxProps, Theme } from '@mui/material/styles';

export const riskAssessmentPanelStyles = {
  container: {
    p: 2,
    maxWidth: 800,
    mx: 'auto',
    mt: 3,
    mb: 3,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  } as SxProps<Theme>,

  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  } as SxProps<Theme>,

  title: {
    fontWeight: 400,
    letterSpacing: '-0.02em',
    fontSize: '1.5rem',
    color: 'primary.main',
  } as SxProps<Theme>,

  riskGauge: {
    mb: 3,
  } as SxProps<Theme>,

  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1.5,
    py: 0.5,
  } as SxProps<Theme>,

  reasoningBox: {
    mt: 3,
    p: 2.5,
    bgcolor: 'background.default',
    borderRadius: 2,
  } as SxProps<Theme>,

  reasoningTitle: {
    fontWeight: 500,
    mb: 1,
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  reasoningText: {
    lineHeight: 1.6,
    fontWeight: 300,
  } as SxProps<Theme>,

  detailsContainer: {
    p: 2.5,
    mt: 3,
    bgcolor: 'background.default',
    borderRadius: 2,
  } as SxProps<Theme>,

  detailsTitle: {
    fontWeight: 500,
    mb: 1.5,
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  } as SxProps<Theme>,

  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  descriptionRow: {
    display: 'flex',
    flexDirection: 'column',
    mt: 1,
  } as SxProps<Theme>,

  label: {
    fontWeight: 400,
  } as SxProps<Theme>,

  value: {
    fontWeight: 400,
  } as SxProps<Theme>,

  monospaceValue: {
    fontWeight: 400,
    fontFamily: 'monospace',
  } as SxProps<Theme>,

  descriptionLabel: {
    fontWeight: 400,
    mb: 0.5,
  } as SxProps<Theme>,

  descriptionValue: {
    fontWeight: 400,
    fontStyle: 'italic',
  } as SxProps<Theme>,
};

export const riskAssessmentSkeletonStyles = {
  container: {
    p: 4,
    maxWidth: 800,
    mx: 'auto',
    mt: 3,
    mb: 3,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  } as SxProps<Theme>,

  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  } as SxProps<Theme>,

  headerTitle: {
    width: 240,
    height: 40,
  } as SxProps<Theme>,

  headerChip: {
    width: 120,
    height: 32,
    borderRadius: '16px',
  } as SxProps<Theme>,

  gaugeContainer: {
    mb: 3,
  } as SxProps<Theme>,

  gaugeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
  } as SxProps<Theme>,

  gaugeLabel: {
    width: 80,
    height: 20,
  } as SxProps<Theme>,

  gaugeScore: {
    width: 50,
    height: 20,
  } as SxProps<Theme>,

  gaugeBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
  } as SxProps<Theme>,

  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    pb: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  statusLabel: {
    width: 120,
    height: 24,
  } as SxProps<Theme>,

  statusBadge: {
    width: 140,
    height: 28,
    borderRadius: '12px',
  } as SxProps<Theme>,

  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1.5,
    py: 0.5,
  } as SxProps<Theme>,

  actionLabel: {
    width: 140,
    height: 24,
  } as SxProps<Theme>,

  actionValue: {
    width: 160,
    height: 24,
  } as SxProps<Theme>,

  reasoningBox: {
    mt: 3,
    p: 2.5,
    bgcolor: 'background.default',
    borderRadius: 2,
  } as SxProps<Theme>,

  reasoningTitle: {
    width: 100,
    height: 20,
    mb: 1,
  } as SxProps<Theme>,

  reasoningLine: {
    width: '100%',
    height: 20,
  } as SxProps<Theme>,

  reasoningLineMedium: {
    width: '95%',
    height: 20,
  } as SxProps<Theme>,

  reasoningLineShort: {
    width: '80%',
    height: 20,
  } as SxProps<Theme>,

  detailsContainer: {
    p: 2.5,
    mt: 3,
    bgcolor: 'background.default',
    borderRadius: 2,
  } as SxProps<Theme>,

  detailsTitle: {
    width: 100,
    height: 20,
    mb: 1.5,
  } as SxProps<Theme>,

  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  } as SxProps<Theme>,

  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  detailKeyShort: {
    width: 80,
    height: 20,
  } as SxProps<Theme>,

  detailKeyMedium: {
    width: 60,
    height: 20,
  } as SxProps<Theme>,

  detailKeyLong: {
    width: 100,
    height: 20,
  } as SxProps<Theme>,

  detailValueLong: {
    width: 120,
    height: 20,
  } as SxProps<Theme>,

  detailValueMedium: {
    width: 80,
    height: 20,
  } as SxProps<Theme>,

  detailValueXLong: {
    width: 150,
    height: 20,
  } as SxProps<Theme>,
};
