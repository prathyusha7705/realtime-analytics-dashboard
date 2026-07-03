# Real-time Analytics Dashboard

A **React 18 + TypeScript + Redux** dashboard that shows live payment transaction data via WebSocket streaming. Built to demonstrate the same real-time monitoring architecture I implemented at OnePay.

## Features

- Live transaction feed via WebSocket (auto-reconnects on disconnect)
- Redux Toolkit for state management — stats recalculate instantly on each new transaction
- Recharts area chart for transaction volume over time
- Status badges with color-coded transaction states
- Connects to the [payment-gateway-api](../payment-gateway-api)

## Tech stack

`React 18` · `TypeScript` · `Redux Toolkit` · `Recharts` · `WebSockets` · `Axios`

## Run locally

```bash
git clone https://github.com/prathyusha-anantha/realtime-analytics-dashboard
cd realtime-analytics-dashboard
npm install
REACT_APP_API_URL=http://localhost:8080/api/v1 npm start
```

Open `http://localhost:3000`

> Start the payment-gateway-api first with `docker-compose up` so the data is real.

## Project structure

```
src/
  components/     # StatsCards, TransactionChart, TransactionTable
  hooks/          # useWebSocket — handles connection, reconnect, dispatch
  store/          # Redux slice — transactions state + async thunk
  api/            # axios calls to Spring Boot API
  types/          # TypeScript interfaces
```

## Key design decisions

**Why WebSocket + Redux?** Each incoming transaction event dispatches to Redux, which recalculates stats atomically — no inconsistent UI state between the chart, table, and stat cards.

**Why Recharts?** Lightweight, composable, and works naturally with React state — no imperative chart lifecycle management.
