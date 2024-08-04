import React from "react"
import {Typography, Box} from "@mui/material"
import '../styles/Header.css'
import GitHub from '../assets/Home/github.png'
export const Header = () => {

    return(
       <div>
            <Box className='Navigation'>
                <Typography variant="h6" fontWeight='bold'>WealthHack</Typography>
                <a href="https://github.com/yashexe/wealthhack"><img src={GitHub} alt="GitHub Link"/></a>
            </Box>
        </div>
    );
}