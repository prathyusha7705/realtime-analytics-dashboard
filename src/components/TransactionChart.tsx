import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';

interface Props { transactions: Transaction[]; }

export const TransactionChart: React.FC<Props> = ({ transactions }) => {
  const data = transactions.slice(0, 20).reverse().map((t) => ({
    time: new Date(t.createdAt).toLocaleTimeString(),
    amount: t.amount,
  }));

  return (
    <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Transaction volume (last 20)</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(val: number) => ['$' + val.toFixed(2), 'Amount']} />
          <Area type="monotone" dataKey="amount" stroke="#378ADD" fill="#378ADD22" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
