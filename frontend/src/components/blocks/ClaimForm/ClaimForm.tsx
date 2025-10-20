import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { AttachMoney, Send } from '@mui/icons-material';
import { Button } from '@elements/Button/Button';
import { claimFormSchema } from './ClaimForm.schema';
import { claimFormStyles } from './ClaimForm.styles';

export interface ClaimFormData {
  description: string;
  amount: number;
  incidentDate: Date;
}

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const ClaimForm = ({ onSubmit, isLoading = false, error = null }: ClaimFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
    reset,
  } = useForm<ClaimFormData>({
    resolver: yupResolver(claimFormSchema),
  });

  const handleFormSubmit = async (data: ClaimFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Box sx={claimFormStyles.container}>
      {error && (
        <Alert severity="error" variant="filled" sx={claimFormStyles.alert}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={6}
          label="Describe the incident"
          {...register('description')}
          error={!!validationErrors.description}
          helperText={validationErrors.description?.message}
          sx={claimFormStyles.descriptionField}
          placeholder="Car accident, property damage, medical expenses..."
        />

        
        <Box sx={claimFormStyles.fieldsRow}>
          <TextField
            type="number"
            label="Claim amount (USD)"
            {...register('amount')}
            error={!!validationErrors.amount}
            helperText={validationErrors.amount?.message}
            placeholder="2,500"
            size="small"
            sx={claimFormStyles.amountField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney sx={claimFormStyles.moneyIcon} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="date"
            label="Incident date"
            {...register('incidentDate')}
            error={!!validationErrors.incidentDate}
            helperText={validationErrors.incidentDate?.message}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: new Date().toISOString().split('T')[0],
            }}
            size="small"
            sx={claimFormStyles.dateField}
          />
          
          <Button 
            type="submit" 
            disabled={isLoading}
            variant="contained"
            sx={claimFormStyles.submitButton}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Analyzing...
              </>
            ) : (
              <>
                Assess Risk
                <Send sx={claimFormStyles.sendIcon} />
              </>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
