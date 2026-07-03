import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import transactionReducer, { loadTransactions } from './store/transactionSlice';
import { StatsCards } from './components/StatsCards';
import { TransactionChart } from './components/TransactionChart';
import { TransactionTable } from './components/TransactionTable';
import { useWebSocket } from './hooks/useWebSocket';
import { useSelector, useDispatch } from 'react-redux';

const store = configureStore({ reducer: { transactions: transactionReducer } });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const USER_ID = 'user-demo-123';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, stats, loading, connected } = useSelector((s: RootState) => s.transactions);
  useWebSocket(USER_ID);

  useEffect(() => { dispatch(loadTransactions(USER_ID)); }, [dispatch]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Payment analytics</h1>
        <p style={{ fontSize: 13, color: '#888' }}>Real-time transaction monitoring · User {USER_ID}</p>
      </div>
      <StatsCards stats={stats} connected={connected} />
      <TransactionChart transactions={transactions} />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;
