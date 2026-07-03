import React, { useEffect, useState } from 'react';
import { Transaction } from './types';
import { StatsCards } from './components/StatsCards';
import { TransactionChart } from './components/TransactionChart';
import { TransactionTable } from './components/TransactionTable';
import { generateMockTransactions, generateLiveTx } from './mockData';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setTransactions(generateMockTransactions());
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
      setTransactions(prev => [generateLiveTx(), ...prev.slice(0, 49)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const completed = transactions.filter(t => t.status === 'COMPLETED');
  const failed = transactions.filter(t => t.status === 'FAILED');
  const stats = {
    totalTransactions: transactions.length,
    totalVolume: completed.reduce((sum, t) => sum + t.amount, 0),
    completedCount: completed.length,
    failedCount: failed.length,
    successRate: transactions.length > 0
      ? Math.round((completed.length / transactions.length) * 100) : 0,
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#f9f9f8', minHeight: '100vh' }}>
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>OnePay · Internal Platform</div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#111' }}>Transaction monitoring</h1>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0' }}>Real-time view across wallet, P2P, BNPL, and savings transactions</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '8px 14px', fontSize: 12 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: pulse ? '#f59e0b' : '#10b981', display: 'inline-block', transition: 'background 0.3s' }} />
          <span style={{ color: '#555' }}>Live · updates every 4s</span>
        </div>
      </div>
      <StatsCards stats={stats} connected={true} />
      <TransactionChart transactions={transactions} />
      <TransactionTable transactions={transactions} />
      <div style={{ marginTop: 24, fontSize: 11, color: '#bbb', textAlign: 'center' }}>
        OnePay Transaction Monitoring · Internal dashboard · Data simulated for demo
      </div>
    </div>
  );
};

export default App;
