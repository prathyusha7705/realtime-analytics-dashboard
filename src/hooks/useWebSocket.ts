import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, setConnected } from '../store/transactionSlice';
import { Transaction } from '../types';

export const useWebSocket = (userId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';
    const ws = new WebSocket(`${wsUrl}/transactions/${userId}`);

    ws.onopen = () => dispatch(setConnected(true));
    ws.onmessage = (event) => {
      try { dispatch(addTransaction(JSON.parse(event.data) as Transaction)); }
      catch (e) { console.error('Parse error', e); }
    };
    ws.onclose = () => dispatch(setConnected(false));
    ws.onerror = () => dispatch(setConnected(false));
    return () => ws.close();
  }, [userId, dispatch]);
};
