import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';


export const Kids = () => {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <h1>Kids</h1>
        </div>
        </ThemeProvider>
    );
    }