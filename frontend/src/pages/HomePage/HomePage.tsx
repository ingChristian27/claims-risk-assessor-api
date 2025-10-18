import { useState } from 'react';
import { Container } from '@mui/material';
import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { ClaimForm } from '../../components/blocks/ClaimForm/ClaimForm';
import { RiskAssessmentPanel } from '../../components/blocks/RiskAssessmentPanel/RiskAssessmentPanel';
import type { Claim } from '../../types';

export const HomePage = () => {
  const [submittedClaim, setSubmittedClaim] = useState<Claim | null>(null);

  const handleClaimSuccess = (claim: Claim) => {
    setSubmittedClaim(claim);
  };

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <ClaimForm onSuccess={handleClaimSuccess} />

        {submittedClaim && <RiskAssessmentPanel claim={submittedClaim} />}
      </Container>
    </MainLayout>
  );
};

