import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import { Grid } from '@mui/material';


export const Calendar = () => {
    return (
        <ThemeProvider theme={theme}>
            calendar
        </ThemeProvider>
    );
    }