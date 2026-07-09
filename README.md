# Realtime Analytics Dashboard

> Built as a personal project to demonstrate the real-time monitoring patterns I worked with in fintech — live transaction feeds, wallet activity, P2P transfers, BNPL tracking, and fraud signals. Transaction types and flows reflect real fintech product experience.

---

## What it does

A live payment transaction dashboard that updates every 4 seconds. Shows real fintech transaction types — Walmart wallet purchases, Klarna BNPL installments, P2P transfers, crypto buys, direct deposits, and cashback redemptions.

---

## Tech stack

- React 18, TypeScript, Redux Toolkit
- Recharts for live area charts
- WebSocket-ready architecture
- Deployed on Vercel

## Live demo
https://prathyusha-fintech-dashboard.vercel.app/

---

## Transaction types included

- Walmart in-store and online wallet purchases
- P2P transfers (domestic and international)
- BNPL installments via Klarna
- High-yield savings deposits
- Direct deposit / early wage access
- Crypto purchases (BTC)
- CashRewards redemptions
- Bill payments and card payments

---

## Project structure

- components — StatsCards, TransactionChart, TransactionTable
- hooks — useWebSocket for live feed architecture
- store — Redux slice for transaction state
- api — Axios layer for backend integration
- types — TypeScript interfaces

---

## Key decisions

**Why live updates every 4s?** Fintech dashboards need near-real-time visibility. Polling at 4s gives a balance between freshness and API load — in production this would be WebSocket driven.

**Why these transaction types?** They reflect the actual product surface of a modern fintech super app — wallet, credit, savings, BNPL, crypto, and P2P are the core pillars.
