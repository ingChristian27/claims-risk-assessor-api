import type { SxProps, Theme } from '@mui/material/styles';

export const riskAssessmentPanelStyles = {
  container: {
    p: 5,
    maxWidth: 880,
    mx: 'auto',
    mt: 4,
  } as SxProps<Theme>,

  title: {
    fontWeight: 400,
    mb: 3,
    letterSpacing: '-0.01em',
  } as SxProps<Theme>,

  riskGauge: {
    mb: 3,
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

  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  } as SxProps<Theme>,

  detailsContainer: {
    p: 3,
    mt: 2,
  } as SxProps<Theme>,

  detailsTitle: {
    fontWeight: 400,
    mb: 2,
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
