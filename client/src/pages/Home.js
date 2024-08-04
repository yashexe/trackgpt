import React, { useState } from 'react';
import Header from '../components/Header'; 
import { Goals } from '../components/Goals';
import { Grid, TextField, Box, Typography, Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Paper, Input,InputAdornment  } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip, Legend,  BarChart, Bar, XAxis, YAxis } from 'recharts';
//import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios'; // For making API calls
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactSpeedometer from 'react-d3-speedometer'; // Import ReactSpeedometer
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


export const Home = () => {
  const [goals,setGoals] = useState({
    goal: 1000,
    salary: 0, //Todays average price
}); //about goals

const [expenses, setExpenses] = useState([]);

  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });


  const prompt=""; // API prompt with user data

  const addExpense = (e) => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      // setNewExpense({ description: '', amount: '', category: '' });
    }
    
  };

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
    <div className='scroll' style={{display: 'flex' }}>
      <Header/>
      <Box sx={{ flexGrow: 1, padding: 2, marginTop: '64px', bgcolor:'black'}}>
        <Grid container spacing={2} sx={{alignContent:'center'}} >
          
         {/* Set User Goals */}
          <Grid item xs={4} >
            <Goals setGoals={setGoals} />
          </Grid>
          {/* Top-RIght Corner*/}
          <Grid item sm={8}  className="budget"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 2,
                    boxShadow: 3,
                    mb: 2 // Add margin-bottom to create space below this grid item
                  }}>
          <div className="border p-4 rounded" flexDirection="center" alignItems="center" justifyContent="center">
          <h3 className="text-lg font-bold mb-2" >Goal Progress</h3>
          <div className="flex justify-center items-center h-full ">
            <div style={{ width: 200, height: 200, paddingtop:10  }}>
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

          {/* Bottom-Left Corner */}
          <Grid item sm={12} >
          <form>
        <Box className="budget" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ boxShadow: 3, p: 2 }}>
            <Typography variant="h6">Add Expenses </Typography>
            
            <div className='row-entry'> 
            <TextField
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            id="item-name"
            label="Name"
            variant="standard"
            sx={{ my: 2 }} />


            {/* <Input
            id="item-amount" onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            /> */}
            <TextField 
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            id="item-amount"
            label="Amount"
            variant="standard"
            sx={{ my: 2 }} />

            <TextField 
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            id="item-category"
            label="Category"
            variant="standard"
            sx={{ my: 2 }} />
            </div>
            <Button onClick={addExpense}>Add</Button>
      </Box>
        </form>
          </Grid>

          {/* Entire Expense List */}
          <Grid item sm={6} >
          <Box padding={2}>
            <TableContainer component={Paper}       sx={{
        maxHeight: 400, // Set the height you want
        overflowY: 'auto'}}> 
            <Typography variant="h6">Expenses Table</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
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
          {/* Categories Breakdowns*/}
        <Grid item sm={6}        
        flexDirection="column"
    >
              <h3 className="text-lg font-bold mb-2">Expense Categories</h3>
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
              <h3 className="text-lg font-bold mb-2">Salary vs Expenses</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
          </Grid>

          
        </Grid>
      </Box>
    </div>
  );
};
