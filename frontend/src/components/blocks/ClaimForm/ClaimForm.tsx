import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Button } from '../../elements/Button/Button';
import { claimFormSchema } from './ClaimForm.schema';
import { claimFormStyles } from './ClaimForm.styles';
import type { CreateClaimRequest, Claim } from '../../../types';
import { createClaim } from '../../../services/api';

interface ClaimFormProps {
  onSuccess?: (claim: Claim) => void;
}

interface ClaimFormData {
  description: string;
  amount: number;
  incidentDate: Date;
}

export const ClaimForm = ({ onSuccess }: ClaimFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClaimFormData>({
    resolver: yupResolver(claimFormSchema),
  });

  const onSubmit = async (data: ClaimFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert date to ISO string for API
      const claimData: CreateClaimRequest = {
        description: data.description,
        amount: Number(data.amount),
        incidentDate: new Date(data.incidentDate).toISOString(),
      };

      const claim = await createClaim(claimData);
      reset();
      if (onSuccess) {
        onSuccess(claim);
      }
    } catch {
      setError('Failed to submit claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={claimFormStyles.container}>
      <Box sx={claimFormStyles.header}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={claimFormStyles.title}
        >
          Submit Your Claim
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={claimFormStyles.subtitle}
        >
          Get instant risk assessment for your insurance claim
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          variant="outlined"
          sx={claimFormStyles.alert}
        >
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Claim Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={claimFormStyles.descriptionField}
          placeholder="Describe the incident or damage in detail..."
          InputLabelProps={{ sx: claimFormStyles.inputLabel }}
        />

        <TextField
          fullWidth
          type="number"
          label="Claim Amount ($)"
          {...register('amount')}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          sx={claimFormStyles.amountField}
          placeholder="0.00"
          InputLabelProps={{ sx: claimFormStyles.inputLabel }}
        />

        <TextField
          fullWidth
          type="date"
          label="Incident Date"
          {...register('incidentDate')}
          error={!!errors.incidentDate}
          helperText={errors.incidentDate?.message}
          sx={claimFormStyles.dateField}
          InputLabelProps={{ shrink: true, sx: claimFormStyles.inputLabel }}
          inputProps={{
            max: new Date().toISOString().split('T')[0],
          }}
        />

        <Button type="submit" fullWidth disabled={isLoading} sx={claimFormStyles.submitButton}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit Claim'}
        </Button>
      </Box>
    </Box>
  );
};

