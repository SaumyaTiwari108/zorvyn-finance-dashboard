import { useState, useEffect } from 'react';

export function useFinanceData() {
  const initialData = [
    { id: 1, date: '2023-10-01', description: 'Acme Corp Salary', category: 'Income', amount: 4200, type: 'income' },
    { id: 2, date: '2023-10-02', description: 'Downtown Rent', category: 'Housing', amount: 1450, type: 'expense' },
    { id: 3, date: '2023-10-04', description: 'Whole Foods', category: 'Food', amount: 185, type: 'expense' },
    { id: 4, date: '2023-10-08', description: 'Electric Bill', category: 'Utilities', amount: 110, type: 'expense' },
    { id: 5, date: '2023-10-12', description: 'Uber Rides', category: 'Transport', amount: 45, type: 'expense' }
  ];

  const [transactions, setTransactions] = useState(() => {
    
    const saved = localStorage.getItem('finance-data');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialData;
  });
  
  const [role, setRole] = useState('Viewer');
  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(transactions));
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const totals = transactions.reduce((acc, curr) => {
    if (curr.type === 'income') {
      acc.income += curr.amount;
      acc.balance += curr.amount;
    } else {
      acc.expense += curr.amount;
      acc.balance -= curr.amount;
    }
    return acc;
  }, { income: 0, expense: 0, balance: 0 });

  return {
    transactions,
    role,
    setRole,
    totals,
    deleteTransaction
  };
}