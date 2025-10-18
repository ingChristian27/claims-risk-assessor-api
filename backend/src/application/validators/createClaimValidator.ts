import Joi from 'joi';

export const createClaimSchema = Joi.object({
  description: Joi.string().min(10).max(1000).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters',
    'string.max': 'Description cannot exceed 1000 characters',
    'any.required': 'Description is required',
  }),

  amount: Joi.number().positive().max(100000).precision(2).required().messages({
    'number.base': 'Amount must be a valid number',
    'number.positive': 'Amount must be greater than 0',
    'number.max': 'Amount cannot exceed $100,000',
    'any.required': 'Amount is required',
  }),

  incidentDate: Joi.date().max('now').required().messages({
    'date.base': 'Incident date must be a valid date',
    'date.max': 'Incident date cannot be in the future',
    'any.required': 'Incident date is required',
  }),
});
