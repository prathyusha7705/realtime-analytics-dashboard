import React from 'react';
import { Transaction } from '../types';

const statusColor: Record<string, string> = {
  COMPLETED: '#1D9E75', FAILED: '#E24B4A',
  PENDING: '#BA7517', PROCESSING: '#378ADD', REFUNDED: '#888',
};

interface Props { transactions: Transaction[]; }

export const TransactionTable: React.FC<Props> = ({ transactions }) => (
  <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
    <div style={{ padding: '12px 20px', borderBottom: '0.5px solid #e5e5e5', fontSize: 13, fontWeight: 500 }}>Recent transactions</div>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: '#fafafa' }}>
          {['ID', 'User', 'Amount', 'Status', 'Time'].map(h => (
            <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: '#888', fontSize: 11 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.slice(0, 10).map(t => (
          <tr key={t.id} style={{ borderTop: '0.5px solid #f0f0f0' }}>
            <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{t.id.slice(0, 8)}...</td>
            <td style={{ padding: '10px 16px' }}>{t.userId}</td>
            <td style={{ padding: '10px 16px', fontWeight: 500 }}>${t.amount.toFixed(2)}</td>
            <td style={{ padding: '10px 16px' }}>
              <span style={{ background: statusColor[t.status] + '22', color: statusColor[t.status], padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>
                {t.status}
              </span>
            </td>
            <td style={{ padding: '10px 16px', color: '#888', fontSize: 11 }}>{new Date(t.createdAt).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
