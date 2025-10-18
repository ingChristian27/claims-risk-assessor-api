import * as yup from 'yup';

export const claimFormSchema = yup.object().shape({
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Minimum 10 characters')
    .max(1000, 'Maximum 1000 characters'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(100000, 'Maximum amount: $100,000'),
  incidentDate: yup
    .date()
    .required('Incident date is required')
    .max(new Date(), 'Incident date cannot be in the future'),
});

