import React from 'react';
import { DashboardStats } from '../types';

interface Props { stats: DashboardStats; connected: boolean; }

export const StatsCards: React.FC<Props> = ({ stats, connected }) => {
  const cards = [
    { label: 'Total transactions', value: stats.totalTransactions.toLocaleString(), color: '#378ADD' },
    { label: 'Total volume', value: '$' + stats.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 }), color: '#1D9E75' },
    { label: 'Success rate', value: stats.successRate + '%', color: stats.successRate >= 95 ? '#1D9E75' : '#BA7517' },
    { label: 'Failed', value: stats.failedCount.toLocaleString(), color: '#E24B4A' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? '#1D9E75' : '#E24B4A', display: 'inline-block' }} />
        <span style={{ fontSize: 12, color: '#888' }}>{connected ? 'Live' : 'Disconnected'}</span>
      </div>
      {cards.map(card => (
        <div key={card.label} style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{card.label}</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: card.color }}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};
