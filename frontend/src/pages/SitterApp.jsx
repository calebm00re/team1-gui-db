import React, { useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ThemeProvider } from '@mui/material';
import { CardHeader, Card } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { UserRepository } from '../api/userRepository.js'
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { SitterCards } from '../components/SitterCards';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SitterJobs } from '../components/SitterJobs';
import { SitterSchedule } from '../components/SitterSchedule';
import { AlertCreateShift } from '../components/AlertCreateShift';

// import Iconify from '../components/Iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export const SitterApp = () => {
  const [value, setValue] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Hi, welcome back
          </Typography>
          <Grid container justifyContent={'flex-end'}>
            <Button
              variant="contained"
              sx={{ mb: 2, justifyContent: 'flex-end' }}
              endIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Shift
            </Button>
            <AlertCreateShift open={open} setOpen={setOpen} />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardHeader title="Calendar" />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Jobs for Today' : `Jobs for ${value.toDateString()}`} />
                <Typography variant="body1" sx={{ m: 5 }}>
                  {/* conditional do you have plans today, if so show them otherwise say no plans */}
                  Looks like there is nothing scheduled for today, head down to the browse to look for a sitter or head over to the sitters tab to have a search
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Card >
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Availability for Today' : `Availability for ${value.toDateString()}`} />
                <SitterCards date={value} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
