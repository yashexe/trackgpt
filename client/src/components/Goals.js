import {Typography, Box, TextField} from "@mui/material"

export const Goals = ({setGoals})=>{

    async function handleSalaryChange(e){ 
        setGoals({salary:e.target.value});
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
        sx={{ boxShadow: 3, p: 3, marginRight: 2 , marginTop: -2 }} // optional padding

        // This was the Budget Goals Thingy
      >
        <Typography variant="h6">Budget Goals  </Typography>

        <div className='row-entry'> 
          <TextField onChange={handleSalaryChange}
            id="monthly-salary"
            label="Monthly Salary"
            variant="standard"
            sx={{ my: 2 }}
          />
        </div>
        <div className='row-entry'>
          <TextField
            onChange={handleGoalChange}
            id="budget-goal"
            label="Budget Goal"
            variant="standard"
            sx={{ my: 2 }}
          />
        </div>
      </Box>
    );
}