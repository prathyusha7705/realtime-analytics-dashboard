export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  description: string;
  createdAt: string;
}

export interface DashboardStats {
  totalTransactions: number;
  totalVolume: number;
  completedCount: number;
  failedCount: number;
  successRate: number;
}

export interface ChartDataPoint {
  time: string;
  amount: number;
  count: number;
}
