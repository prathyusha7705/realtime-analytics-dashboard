import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, DashboardStats } from '../types';
import { fetchTransactions } from '../api/transactionApi';

interface TransactionState {
  transactions: Transaction[];
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  connected: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  stats: { totalTransactions: 0, totalVolume: 0, completedCount: 0, failedCount: 0, successRate: 0 },
  loading: false,
  error: null,
  connected: false,
};

export const loadTransactions = createAsyncThunk(
  'transactions/load',
  async (userId: string) => fetchTransactions(userId)
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      const completed = state.transactions.filter(t => t.status === 'COMPLETED');
      const failed = state.transactions.filter(t => t.status === 'FAILED');
      state.stats = {
        totalTransactions: state.transactions.length,
        totalVolume: completed.reduce((sum, t) => sum + t.amount, 0),
        completedCount: completed.length,
        failedCount: failed.length,
        successRate: state.transactions.length > 0
          ? Math.round((completed.length / state.transactions.length) * 100) : 0,
      };
    },
    setConnected: (state, action: PayloadAction<boolean>) => { state.connected = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTransactions.pending, (state) => { state.loading = true; })
      .addCase(loadTransactions.fulfilled, (state, action) => { state.loading = false; state.transactions = action.payload; })
      .addCase(loadTransactions.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed'; });
  },
});

export const { addTransaction, setConnected } = transactionSlice.actions;
export default transactionSlice.reducer;
