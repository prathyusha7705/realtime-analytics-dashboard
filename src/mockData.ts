import { Transaction } from './types';

const txTypes = [
  { desc: 'Walmart in-store purchase', min: 12, max: 280 },
  { desc: 'Walmart.com order', min: 25, max: 450 },
  { desc: 'P2P transfer sent', min: 20, max: 500 },
  { desc: 'P2P transfer received', min: 20, max: 500 },
  { desc: 'BNPL installment - Klarna', min: 45, max: 300 },
  { desc: 'High-yield savings deposit', min: 100, max: 2000 },
  { desc: 'OnePay CashRewards redemption', min: 5, max: 50 },
  { desc: 'Direct deposit - paycheck', min: 800, max: 3200 },
  { desc: 'Bill pay - utilities', min: 60, max: 220 },
  { desc: 'Crypto purchase - BTC', min: 10, max: 500 },
  { desc: 'Walmart fuel station', min: 35, max: 95 },
  { desc: 'Credit card payment', min: 50, max: 800 },
  { desc: 'Early wage access', min: 50, max: 400 },
  { desc: 'International P2P transfer', min: 100, max: 1000 },
  { desc: 'Refund - Walmart return', min: 8, max: 180 },
];

const userIds = [
  'cust_4f8a2b', 'cust_9c3d1e', 'cust_7b5f0a', 'cust_2e8c4d',
  'cust_6a1b9f', 'cust_3d7e2c', 'cust_8f4a5b', 'cust_1c6d3e',
  'cust_5b2f8a', 'cust_0e9c7d',
];

const weightedStatuses = (): Transaction['status'][] =>
  ['COMPLETED','COMPLETED','COMPLETED','COMPLETED','COMPLETED',
   'COMPLETED','COMPLETED','FAILED','PENDING','PROCESSING'];

export const generateMockTransactions = (): Transaction[] => {
  const now = Date.now();
  return Array.from({ length: 48 }, (_, i) => {
    const type = txTypes[Math.floor(Math.random() * txTypes.length)];
    const statuses = weightedStatuses();
    return {
      id: 'txn_' + Math.random().toString(36).substring(2, 11),
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      amount: parseFloat((Math.random() * (type.max - type.min) + type.min).toFixed(2)),
      currency: 'USD',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      description: type.desc,
      createdAt: new Date(now - i * 1000 * 60 * (2 + Math.random() * 8)).toISOString(),
    };
  });
};

export const generateLiveTx = (): Transaction => {
  const type = txTypes[Math.floor(Math.random() * txTypes.length)];
  const statuses = weightedStatuses();
  return {
    id: 'txn_' + Math.random().toString(36).substring(2, 11),
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    amount: parseFloat((Math.random() * (type.max - type.min) + type.min).toFixed(2)),
    currency: 'USD',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: type.desc,
    createdAt: new Date().toISOString(),
  };
};
