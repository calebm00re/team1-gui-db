import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';


export const Sitters = () => {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <h1>Sitters</h1>
        </div>
        </ThemeProvider>
    );
    }