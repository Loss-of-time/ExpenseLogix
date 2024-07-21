import axios from 'axios';
import { PaymentMethod, ExpenseRecord } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3000', // 你的后端API地址
});

// PaymentMethod APIs
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api.get('/payment-methods');
  return response.data;
};

export const createPaymentMethod = async (data: PaymentMethod): Promise<PaymentMethod> => {
  const response = await api.post('/payment-methods', data);
  return response.data;
};

export const updatePaymentMethod = async (id: number, data: PaymentMethod): Promise<PaymentMethod> => {
  const response = await api.put(`/payment-methods/${id}`, data);
  return response.data;
};

export const deletePaymentMethod = async (id: number): Promise<void> => {
  await api.delete(`/payment-methods/${id}`);
};

// ExpenseRecord APIs
export const getExpenseRecords = async (): Promise<ExpenseRecord[]> => {
  const response = await api.get('/expense-records');
  return response.data;
};

export const createExpenseRecord = async (data: ExpenseRecord): Promise<ExpenseRecord> => {
  const response = await api.post('/expense-records', data);
  return response.data;
};

export const updateExpenseRecord = async (id: number, data: ExpenseRecord): Promise<ExpenseRecord> => {
  const response = await api.put(`/expense-records/${id}`, data);
  return response.data;
};

export const deleteExpenseRecord = async (id: number): Promise<void> => {
  await api.delete(`/expense-records/${id}`);
};