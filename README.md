# PrimeFinance - Intelligent Dashboard Overview

A high-performance, premium financial dashboard built with **React 19**, **Tailwind CSS 4**, and **Recharts**. This application provides a comprehensive suite of tools for tracking assets, analyzing spending velocity, and managing multi-card wallets with persistent data storage.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 💎 Core Features

### 1. Unified Command Center (Dashboard)
- **High-End Metrics**: Real-time tracking of Total Balance, Monthly Influx (Income), and Outflow (Expenses) with dynamic trend indicators.
- **Asset Velocity (Time-Based)**: An interactive area chart visualizing cumulative balance trends over the last 7 active transaction days.
- **Smart Stacking Wallet**: A physical-inspired 3D card stack that handles 4+ bank cards with interactive "cycle-to-back" rotation logic.

### 2. Algorithmic Insights
- **Heuristic Spending Analysis**: Real-time calculation of your most dominant expense category.
- **Progressive Breakdown**: A minimalist vertical breakdown of spending sectors using proportional progress bars.
- **Intelligent Advisory**: Automated system tips providing specific budgetary targets (e.g., "15% savings cap") based on current outflow.

### 3. Transaction Integrity
- **Advanced Filtering**: Instant search by category/description combined with a quick-toggle between Income and Expense logs.
- **Data Export**: One-click JSON export of filtered transaction history for external reporting.
- **Live Syncing**: Synchronous updates across the entire UI whenever a record is added or modified.

## 🔒 Access Control (Role-Based UI)
The application simulates a **Role-Based Access Control (RBAC)** environment:
- **Viewer Mode**: A read-only experience for auditing and reviewing data. Administrative buttons (Post Entry, Add Card) are hidden.
- **Admin Access**: Unlocks full "write" capabilities, allowing record creation and wallet expansion.
*Switch roles instantly via the Access Control panel in the sidebar.*

## 🛠️ Technical Implementation

### State Management
- **React Context API**: Centralized `FinanceContext` manages the global application state, including user roles, filtering logic, and the persistent data engine.
- **Persistence Layer**: Integrated `localStorage` synchronization for both Transaction and Card states, ensuring user data survives browser refreshes.

### UI & UX Architecture
- **Tailwind CSS 4**: Utilizes the latest utility-first framework for complex glassmorphism effects (`@utility glass`) and responsive 12-column grid foundations.
- **Lucide Icons**: Consistent, high-end iconography throughout the interface.
- **Recharts**: Performance-optimized SVG charts for smooth data visualization.

### Responsive Design
The dashboard is engineered with a **Mobile-First** approach, seamlessly transitioning from a single-column layout on small devices to a sophisticated multi-column command center on wide displays.

---
*Developed as a high-fidelity technical demonstration of modern frontend architecture and data-driven UI design.*
