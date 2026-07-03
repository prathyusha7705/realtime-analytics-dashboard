import axios from 'axios';
import { Transaction } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  const response = await axios.get(`${BASE_URL}/transactions/user/${userId}`);
  return response.data;
};
