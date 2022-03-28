import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';


export const Calendar = () => {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <h1>Calendar</h1>
        </div>
        </ThemeProvider>
    );
    }