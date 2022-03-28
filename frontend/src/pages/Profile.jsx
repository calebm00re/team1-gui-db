import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';


export const Profile = () => {
    return (
        <ThemeProvider theme={theme}>
        <div>
            <h1>Profile</h1>
        </div>
        </ThemeProvider>
    );
    }