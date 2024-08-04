import React from "react"
import {Typography, Box} from "@mui/material"
import '../styles/Header.css'

export const Header = () => {

    return(
       <div>
            <Box className='Navigation'>
                <Typography variant="h6"> Expense Tracker</Typography>
            </Box>
        </div>
    );
}