import axios from 'axios';
import type { Claim, CreateClaimRequest } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Claims API
export const createClaim = async (data: CreateClaimRequest): Promise<Claim> => {
  const response = await api.post('/claims', data);
  return response.data;
};

export const getClaimById = async (id: string): Promise<Claim> => {
  const response = await api.get(`/claims/${id}`);
  return response.data;
};

export default api;

