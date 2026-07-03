# Real-time Analytics Dashboard

A React 18 + TypeScript + Redux dashboard that shows live payment transaction data via WebSocket streaming.

---

## Tech stack

- Frontend: React 18, TypeScript, Redux Toolkit
- Charts: Recharts
- API calls: Axios
- Real-time: WebSockets with auto-reconnect

---

## Project structure

- components — StatsCards, TransactionChart, TransactionTable
- hooks — useWebSocket handles connection and reconnect
- store — Redux slice for transaction state
- api — Axios calls to Spring Boot backend
- types — TypeScript interfaces

---

## How to run locally

1. Clone the repo
2. Run npm install
3. Run npm start
4. Open http://localhost:3000

---

## Key features

- Live transaction feed via WebSocket
- Stats cards that update instantly on every new transaction
- Area chart showing transaction volume over time
- Color coded transaction status badges
- Connects to the payment-gateway-api backend
