import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';


export const Browse = () => {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <h1>Browse</h1>
        </div>
        </ThemeProvider>
    );
    }