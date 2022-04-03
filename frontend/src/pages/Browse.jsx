import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';



export const Browse = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} className='mt-2'> 
                <Grid item xs={12} container direction='row' justifyContent='space-around'>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <Typography variant="h4" align="center">Sitters</Typography>
                    </Grid>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <Typography variant="h4" align="center">Kids</Typography>
                    </Grid>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <Typography variant="h4" align="center">Scheduled</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction='row' justifyContent='space-around'>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                    </Grid>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                    </Grid>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
    }