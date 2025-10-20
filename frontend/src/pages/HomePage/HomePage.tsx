import { Container, Box } from "@mui/material";
import { MainLayout } from "@templates/MainLayout/MainLayout";
import { ClaimForm, type ClaimFormData } from "@blocks/ClaimForm/ClaimForm";
import { RiskAssessmentPanel } from "@blocks/RiskAssessmentPanel/RiskAssessmentPanel";
import { RiskAssessmentSkeleton } from "@blocks/RiskAssessmentPanel/RiskAssessmentSkeleton";
import { EmptyState } from "@blocks/EmptyState/EmptyState";
import { homePageStyles } from "./HomePage.styles";
import { createClaim } from "@services/api";
import { useApiMutation } from "@hooks/useApiMutation";
import type { Claim, CreateClaimRequest } from "@types";

export const HomePage = () => {
  const {
    mutate: submitClaim,
    isLoading,
    error,
    data: submittedClaim,
  } = useApiMutation<Claim, CreateClaimRequest>(createClaim);

  const handleSubmit = async (data: ClaimFormData) => {
    const claimData: CreateClaimRequest = {
      description: data.description,
      amount: Number(data.amount),
      incidentDate: new Date(data.incidentDate).toISOString(),
    };

    await submitClaim(claimData);
  };

  return (
    <MainLayout>
      <Box sx={homePageStyles.mainContainer}>
        {/* Scrollable results area */}
        <Box sx={homePageStyles.scrollableArea}>
          <Container maxWidth="md" sx={homePageStyles.contentContainer}>
            {isLoading ? (
              <RiskAssessmentSkeleton />
            ) : !submittedClaim ? (
              <EmptyState />
            ) : (
              <RiskAssessmentPanel claim={submittedClaim} />
            )}
          </Container>
        </Box>

        <Box sx={homePageStyles.fixedFormContainer}>
          <Container maxWidth="md">
            <ClaimForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </Container>
        </Box>
      </Box>
    </MainLayout>
  );
};
