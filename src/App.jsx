import zorvynLogo from './image.png';
import React, { useState } from 'react';
import { useFinanceData } from './hooks/useFinanceData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function App() {
  const { transactions, role, setRole, totals, deleteTransaction } = useFinanceData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);

  // Filtering transactions
  const filteredTransactions = transactions.filter((tx) => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const netSavings = totals.income - totals.expense;
  const savingsRate = totals.income > 0 ? ((netSavings / totals.income) * 100).toFixed(0) : 0;
  

  const expenses = transactions.filter(t => t.type === 'expense');
  const biggestExpense = expenses.length > 0 
    ? expenses.reduce((max, tx) => (tx.amount > max.amount ? tx : max), expenses[0]) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      
      <div className="bg-brand-purple py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-6">
          <img src={zorvynLogo} alt="Zorvyn Logo" className="h-10 md:h-12" />
          <div className="h-7 w-[1px] bg-white/20 hidden md:block"></div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Finance Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/15 transition-colors">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">Role</span>
            <select 
              className="bg-transparent p-0 border-none outline-none text-sm font-medium text-white cursor-pointer focus:ring-0"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Viewer" className="text-gray-900">Viewer (Read Only)</option>
              <option value="Admin" className="text-gray-900">Admin (Full Access)</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="p-6 md:p-12 max-w-[1500px] mx-auto">
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="text-4xl">💵</div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Balance</p>
              <p className="text-3xl font-extrabold text-gray-950">${totals.balance.toLocaleString()}</p>
            </div>
          </div>

          <div 
            onClick={() => setShowChart(!showChart)}
            className="group bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <div className="text-4xl transition-transform group-hover:scale-110">📈</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500 font-medium">Total Income</p>
                <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-300 opacity-60 group-hover:opacity-100 transition-opacity">VIEW CHART</span>
              </div>
              <p className="text-3xl font-extrabold text-green-600">${totals.income.toLocaleString()}</p>
            </div>
          </div>

          <div 
            onClick={() => setShowChart(!showChart)}
            className="group bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <div className="text-4xl transition-transform group-hover:scale-110">📉</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500 font-medium">Total Expenses</p>
                <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100 opacity-60 group-hover:opacity-100 transition-opacity">VIEW CHART</span>
              </div>
              <p className="text-3xl font-extrabold text-red-600">${totals.expense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-3xl">💡</div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Financial Insights</h3>
                    <p className="text-sm text-gray-500">Quick observations based on your data.</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-purple-300 flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Savings Rate</p>
                    <p className="text-xl font-extrabold text-brand-purple">{savingsRate}%</p>
                </div>
                <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-purple-300 flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Top Expense</p>
                    <p className="text-xl font-extrabold text-gray-900 capitalize">{biggestExpense ? biggestExpense.category : 'N/A'}</p>
                </div>
            </div>
        </div>

        {showChart && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-950">Visual Analytics</h2>
              <button onClick={() => setShowChart(false)} className="text-gray-400 hover:text-gray-600 text-sm font-semibold">✕ Close</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              <div>
                <h3 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest text-center">Spending by Category</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactions}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis dataKey="category" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: '#f9fafb'}} />
                      <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={50}>
                        {transactions.map((entry, index) => (
                          <Cell key={'cell-${index}'} fill={entry.type === 'income' ? '#22c55e' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest text-center">Activity Timeline</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {/* I reverse the array so dates read left to right chronologically */}
                    <LineChart data={[...transactions].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis dataKey="date" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="#6b21a8" strokeWidth={3} dot={{r: 4, fill: '#6b21a8', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-5">
            <h2 className="text-xl font-bold text-gray-950">Recent Activity</h2>
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-600 border-b border-gray-400 uppercase tracking-widest font-semibold">
                  <th className="pb-4 px-5">Date</th>
                  <th className="pb-4 px-5">Description</th>
                  <th className="pb-4 px-5 text-right">Amount</th>
                  {role === 'Admin' && <th className="pb-4 px-5 text-center">Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-5 px-5 text-sm text-gray-990 whitespace-nowrap">{tx.date}</td>
                    <td className="py-5 px-5">
                      <div className="font-semibold text-gray-950">{tx.description}</div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                        {tx.category}
                      </div>
                    </td>
                    <td className={`py-5 px-5 text-right font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </td>
                    {role === 'Admin' && (
                      <td className="py-5 px-5 text-center">
                        <button onClick={() => deleteTransaction(tx.id)} className="text-red-300 hover:text-red-600 font-bold transition-colors">✕</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}