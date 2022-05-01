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
import { Box } from '@mui/material';
// import { SitterCards } from '../components/SitterCards';

export default function DashboardApp() {
  const [value, setValue] = React.useState(new Date());
  const [sitters, setSitters] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const userRepository = new UserRepository();
  const theme = useTheme();

  useEffect(() => {
    const day = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    console.log("Day: " + day);
    userRepository.getSittersByDate(day).then(setSitters).catch(err => console.error(err));
    userRepository.getJobs(day).then(setJobs).catch(err => console.error(err));
  }, [value]);

  const handleBook = (sitter) => {
    userRepository.newJob(sitter.sitter_id, sitter.start_time, sitter.end_time).then(() => {
      setValue(value);
    }).catch(err => console.error(err));
    console.log('sitter id: ' + sitter.sitter_id);
    console.log('job starting time: ' + sitter.start_time);
    console.log('job ending time: ' + sitter.end_time);
  }


  return (
    <Page title="Dashboard">
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, welcome back
          </Typography>

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
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Schedule for Today' : `Schedule for ${value.toDateString()}`} />
                <Typography variant="body1" sx={{ m: 5 }}>
                {jobs.length == 0 ?
                    <div> Nothing on the schedule here! </div>
                    :
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      {jobs.map((sitter, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                          <Card sx={{ height: 275, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {sitter.start_time.substring(11, 16)} - {sitter.end_time.substring(11, 16)}
                                {/* <Button className="m-1" variant="contained" size="small">Book</Button> */}
                              </Typography>
                              <Typography variant="h5" component="div">
                                {sitter.sitter.firstname} {sitter.sitter.lastname}
                              </Typography>
                              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                ${sitter.sitter.price} / hr
                              </Typography>
                              <Typography variant="body2">
                                {sitter.sitter.location}
                                <br />
                                {sitter.sitter.experience}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>))}
                    </Grid>}
                </Typography>
              </Card>

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Card >
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Browse for Today' : `Browse for ${value.toDateString()}`} />
                <div className='m-3'>
                  {sitters.length == 0 ?
                    <div> No sitters found for this date </div>
                    :
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      {sitters.map((sitter, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                          <Card sx={{ height: 275, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {sitter.start_time.substring(11, 16)} - {sitter.end_time.substring(11, 16)}
                                {/* <Button className="m-1" variant="contained" size="small">Book</Button> */}
                              </Typography>
                              <Typography variant="h5" component="div">
                                {sitter.firstname} {sitter.lastname}
                              </Typography>
                              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                ${sitter.price} / hr
                              </Typography>
                              <Typography variant="body2">
                                {sitter.location}
                                <br />
                                {sitter.experience}
                              </Typography>
                            </CardContent>
                            <Button sx={{ alignSelf: 'flex-end' }} className="m-2" variant="contained" size="small" onClick={() => handleBook(sitter)}>Book</Button>
                          </Card>
                        </Grid>))}
                    </Grid>}
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
