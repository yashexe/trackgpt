import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

export const Home = () => {

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: 0 });

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: '', amount: 0 });
    }
  };

  const handleCategoryChange = (e) => {
    setNewExpense({ ...newExpense, category: e.target.value });
  };

  const handleAmountChange = (e) => {
    setNewExpense({ ...newExpense, amount: parseInt(e.target.value) });
  };

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const pieChartData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(pieChartData),
    datasets: [
      {
        label: 'amount',
        data: Object.values(pieChartData),
        backgroundColor: Object.keys(pieChartData).map(
          (_, index) => `hsl(${(index * 360) / Object.keys(pieChartData).length}, 70%, 50%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div>
        <h2 className="text-lg font-bold mb-4">Expense Tracker</h2>
        <form className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2">Category:</label>
          <select
            value={newExpense.category}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-400 rounded mb-4"
          >
            <option value="">Select a category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Living">Living</option>
            <option value="Utility">Utility</option>
          </select>
          <label className="text-sm font-bold mb-2">Amount:</label>
          <input
            type="number"
            value={newExpense.amount}
            onChange={handleAmountChange}
            className="px-4 py-2 border border-gray-400 rounded mb-4"
          />
          <button
            type="button"
            onClick={handleAddExpense}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
        </form>
        <div className="flex flex-col mb-4">
          <h3 className="text-lg font-bold mb-2">Pie Chart:</h3>
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
        <p className="text-lg font-bold mb-4">Total Expenses: ${totalExpenses}</p>
      </div>
    </div>
  );
};
