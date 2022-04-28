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

export default function DashboardApp() {
  const [value, setValue] = React.useState(new Date());
  const [sitters, setSitters] = React.useState([]);
  const theme = useTheme();

  const userRepository = new UserRepository();

  // const getSitter = (i, sitterList) => {
  //   var sitterTemp = sitters;
  //   let currentSitter = sitterList[i];
  //   sitterTemp[i] = currentSitter;
  //   setSitters(sitterTemp);
  // }

  // const loadSitters = () => {
  //   // const day = value.getFullYear() + '-0' + (value.getMonth() + 1) + '-' + value.getDate();
  //   const day = '2022-05-25';
  //   console.log('day: ' + day);
  //   userRepository.getSittersByDate(day).then(response => {
  //     console.log('this is the response for getSittersByDate in dashboard app: ')
  //     console.log(response)
  //     let allSitters = response.data;
  //     for (var i in allSitters) {
  //       getSitter(i, allSitters);
  //     }
  //   })
  //     .catch(error => {
  //       console.log('error in dashboard app: ')
  //       console.log(error)
  //     })
  // }


  // useEffect(() => {
  //   console.log('in dashboard');
  //   loadSitters();
  // }, [value]);

  // setValue(new Date());
  return (
    <Page title="Dashboard">
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, welcome back
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Schedule for Today' : `Schedule for ${value.toDateString()}`} />
                <Typography variant="body1" sx={{ m: 5 }}>
                  {/* conditional do you have plans today, if so show them otherwise say no plans */}
                  Looks like there is nothing scheduled for today, head down to the browse to look for a sitter or head over to the sitters tab to have a search
                </Typography>
              </Card>

            </Grid>
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
            <Grid item xs={12} md={12} lg={12}>
              <Card >
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Browse for Today' : `Browse for ${value.toDateString()}`} />
                  <SitterCards date={value} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
