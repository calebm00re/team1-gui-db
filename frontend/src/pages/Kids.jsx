import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { ProfileCard } from './ProfileCard';
import { ThemeProvider, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";
import theme from '../Assets/theme';
import { Typography } from '@mui/material';

export const Kids = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
                <Grid item xs={12} container direction='row' justifyContent='space-around'>
                    <Typography variant="h4" align="center">Kids</Typography>
                </Grid>
        </Grid>
        <div>
            <Grid 
                container
                direction='row'
                justifyContent='space-around'
                alignItems='center'
            >
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
            </Grid>
        </div>
    </ThemeProvider>
  );
};