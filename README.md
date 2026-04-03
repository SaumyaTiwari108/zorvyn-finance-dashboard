🚀ZORVYN FINANCE DASHBOARD

A high-fidelity, interactive finance management interface built with React, Tailwind CSS, and Recharts. This project was designed to provide a clean, "Branded Portal" experience for tracking personal finances.

🌟 KEY FEATURE
Advanced Visualizations
Categorical Analysis: A dynamic Bar Chart showing spending breakdown by category (Income vs. Expenses).

Time-Based Trend: A Line Chart visualizing financial activity over time to track balance trends.

Interactive Toggles: Charts are hidden by default to maintain a clean UI and can be toggled by clicking the Income or Expense summary cards.

🔐ROLE-BASED UI (RBAC)

Viewer Mode: Default "Read-Only" access. Users can explore data and charts but cannot modify records.

Admin Mode: Full "Read/Write" access. Unlocks the ability to delete transactions from the activity log.

Live Switcher: A branded dropdown in the navbar allows for instant role switching to demonstrate UI changes.

💡SMART INSIGHTS
Savings Rate: Automatically calculates the percentage of income saved vs. spent.

Top Expense Tracking: Dynamically identifies the highest spending category based on current transaction data.

💾 DATA PERSISTANCE & STATE
LocalStorage Integration: All changes (like deleting transactions) are saved to the browser's local storage. Your data persists even after a page refresh!

Custom Hook Architecture: Logic is cleanly separated into a useFinanceData hook for better scalability and code readability.

🛠️ Tech Stack
Frontend Framework: React (Vite)

Styling: Tailwind CSS (v4)

Charts/Graphs: Recharts

Icons: HeroIcons & System Emojis

State Management: React Hooks (useState, useEffect, Custom Hooks)

🚀GETTING STARTED
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open in browser: Navigate to http://localhost:5173

📝DESIGN DECISION
Branding: Applied the "Zorvyn" dark purple theme to the navigation bar for a cohesive portal experience.

UX Cues: Added "VIEW CHART" badges with hover-states on summary cards to guide user interaction.

Empty States: Implemented a "Graceful Empty State" that provides a "Reset Data" button if all transactions are deleted.
