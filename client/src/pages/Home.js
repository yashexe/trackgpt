import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Grid, TextField, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReactSpeedometer from 'react-d3-speedometer';

import '../styles/ChatIcon.css';

import { ChatIcon } from '../components/ChatIcon';
import { Header } from '../components/Header';
import { Goals } from '../components/Goals';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const Home = () => {
  const [goals, setGoals] = useState({ goal: 1000, salary: 0 });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });
  const [submitExpense, setSubmitExpense] = useState(null);

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setSubmitExpense(newExpense);
    }
  };

  useEffect(() => {
    const sendExpensesToServer = async () => {
      try {
        if (submitExpense) {
          await axios.post('http://localhost:5000/api/expenses', {
            description: submitExpense.description,
            amount: submitExpense.amount,
            category: submitExpense.category
          });
          setSubmitExpense(null);
        }
      } catch (error) {
        console.error('Error saving expenses:', error);
      }
    };
    sendExpensesToServer();
  }, [submitExpense]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const goalProgress = Math.min((totalExpenses / goals.goal) * 100, 100);

  const barChartData = [
    { name: 'Salary', value: goals.salary },
    { name: 'Expenses', value: totalExpenses }
  ];

  return (
    <div style={{ display: 'flex', backgroundColor: '#F2F3F3', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1, padding: 2, marginTop: '80px', backgroundColor: '#F2F3F3' }}>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <Goals setGoals={setGoals}  />
          </Grid>
          <Grid item xs className="budget"
            marginBottom={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 3, paddingLeft: 3, backgroundColor: 'white' }}
          >
            <div flexDirection="center" alignItems="center" justifyContent="center">
              <h3 style={{ marginBottom: '20px' }} >Expense Monitor</h3>
              <div>
                <div style={{ height: 200 }}>
                  <ReactSpeedometer
                    value={goalProgress}
                    minValue={0}
                    maxValue={100}
                    needleColor="steelblue"
                    startColor="red"
                    segments={10}
                    endColor="green"
                    currentValueText={`${goalProgress.toFixed(2)}%`}
                  />
                </div>
              </div>
            </div>
          </Grid>

          <Grid item sm={12}>
            <form>
              <Box className="budget" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ boxShadow: 3, p: 2, backgroundColor: 'white' }}>
                <Typography variant="h6">Add Expenses</Typography>
                
                <div className='row-entry'> 
                  <TextField
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    id="item-name"
                    label="Name"
                    variant="standard"
                    sx={{ my: 2 }} />
                  <TextField 
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    id="item-amount"
                    label="Cost ($)"
                    variant="standard"
                    sx={{ my: 2 }} />
                  <TextField 
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    id="item-category"
                    label="Category"
                    variant="standard"
                    sx={{ my: 2 }} />
                </div>
                <Button className="add-expense-button" onClick={addExpense}>Add</Button>
              </Box>
            </form>
          </Grid>

          <Grid item sm={6}>
            <Box sx={{ maxHeight: 550, overflowY: 'scroll', backgroundColor: 'white' }}>
              <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
                <Typography variant="h6">Expenses Table</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Cost ($)</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expenses.map((expense, index) => (
                      <TableRow key={index}>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          <Grid item sm={6} flexDirection="column">
            <Box sx={{ boxShadow: 3, padding: 2, marginBottom: 2, backgroundColor: 'white' }}>
              <Typography variant="h6">Expense Categories</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart margin={{ bottom: 0 }}>
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
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={16} />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ boxShadow: 3, padding: 2, backgroundColor: 'white' }}>
              <Typography variant="h6">Salary vs Expenses</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ChatIcon />
    </div>
  );
};
