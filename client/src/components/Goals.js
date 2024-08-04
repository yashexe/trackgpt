import React, { useState } from 'react';
import {Typography, Box, TextField,Input,InputAdornment  } from "@mui/material"
import { shadows } from '@mui/system';


export const Goals = ({setGoals})=>{
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');


    // setGoal
    async function handleSalaryChange(e){ 
        setGoals({salary:e.target.value});
        setText1(e.target.value);
    }

    const handleGoalChange = (e) => {
        setGoals((prevGoals) => ({
          ...prevGoals,
          goal: e.target.value,
        }));
      };
    return(
        <Box
        className="budget"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ boxShadow: 3, p: 2 }} // optional padding
      >
        <Typography variant="h6">Budget Goals</Typography>

        <div className='row-entry'> 
        {/* <Input
            id="monthly-salary" label="Monthly Salary" onChange={handleSalaryChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          /> */}
            <TextField onChange={handleSalaryChange}
            id="monthly-salary"
            label="Monthly Salary"
            variant="standard"
            sx={{ my: 2 }} />
            {/* <Typography variant="h6">{text1}</Typography> */}
        </div>

        <div className='row-entry'>
        {/* <Input
            id="budget-goal" label="Budget Goal" onChange={handleGoalChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          /> */}
        <TextField
         onChange={handleGoalChange}
          id="budget-goal"
          label="Budget Goal"
          variant="standard"
          sx={{ my: 2 }} // margin on top and bottom
        />
        {/* <Typography variant="h6">{text2}</Typography> */}

        </div>
      </Box>
    )
}