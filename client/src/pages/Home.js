import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../styles/ChatIcon.css';
import axios from 'axios'; // For making API calls

import { ChatIcon } from '../components/ChatIcon';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [goal, setGoal] = useState(1000);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });
  const [submitExpense, setSubmitExpense] = useState(null); // New state to track expense submission

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setSubmitExpense(newExpense); // Set the expense to be submitted
      setNewExpense({ description: '', amount: '', category: '' });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const goalProgress = Math.min((totalExpenses / goal) * 100, 100);
  
  useEffect(() => {
    const sendExpensesToServer = async () => {
      try {
        if (submitExpense) {
          await axios.post('http://localhost:5000/api/expenses', {
            description: submitExpense.description,
            amount: submitExpense.amount,
            category: submitExpense.category
          });
          setSubmitExpense(null); // Clear submit state after successful submission
        }
      } catch (error) {
        console.error('Error saving expenses:', error);
      }
    };

    sendExpensesToServer();
  }, [submitExpense]); // Dependency array includes submitExpense to trigger effect on submission
  
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div className="col-span-1 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Monthly Goal</h3>
        <input 
          type="number" 
          value={goal} 
          onChange={(e) => setGoal(parseFloat(e.target.value))} 
          className="w-full p-2 mb-2 border rounded"
        />
        <p>Goal: ${goal}</p>
      </div>

      <div className="col-span-1 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Goal Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${goalProgress}%` }}
          ></div>
        </div>
        <p className="mt-2">{goalProgress.toFixed(2)}% of goal reached</p>
      </div>

      <div className="col-span-2 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Add Expense</h3>
        <div className="flex space-x-2">
          <input 
            placeholder="Description" 
            value={newExpense.description} 
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
          <input 
            type="number" 
            placeholder="Amount" 
            value={newExpense.amount} 
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
          <input 
            placeholder="Category" 
            value={newExpense.category} 
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
          <button onClick={addExpense} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </div>

      <div className="col-span-2 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Expenses</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-span-1 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Expense Categories</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ChatIcon />
    </div>
  );
};
