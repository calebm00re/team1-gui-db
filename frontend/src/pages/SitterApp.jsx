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
// import { SitterCards } from '../components/SitterCards';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SitterJobs } from '../components/SitterJobs';
import { SitterSchedule } from '../components/SitterSchedule';
import { AlertCreateShift } from '../components/AlertCreateShift';

export const SitterApp = () => {
  const [value, setValue] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [sitters, setSitters] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const theme = useTheme();
  const userRepository = new UserRepository();

  useEffect(() => {
    const day = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    console.log("Day: " + day);
    userRepository.getSitterByDate(day).then(setSitters).catch(err => console.error(err));
    userRepository.getJobs(day).then(setJobs).catch(err => console.error(err));
  }, [open, value])

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
                                {sitter.user.firstName} {sitter.user.lastName}
                              </Typography>
                              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {sitter.user.numKids} {sitter.user.numKids == '1' ? 'Kid' : 'Kids'} {sitter.user.numKids == '1' ? 'Age' : `Ages ${sitter.user.minKidAge} to ${sitter.user.maxKidAge}`}
                              </Typography>
                              <Typography variant="body2">
                                {sitter.sitter.location}
                                <br />
                                {sitter.user.bio}
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
                <CardHeader title={(new Date().toDateString() == value.toDateString()) ? 'Availability for Today' : `Availability for ${value.toDateString()}`} />
                <div className='m-3'>
                  {sitters.length == 0 ?
                    <div> You Have no Availability for this Day, Consider Adding a Shift </div>
                    :
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      {sitters.map((sitter, index) => (
                        <Grid item xs={6} md={3} lg={2} key={index}>
                          <Card sx={{ height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                              <Typography sx={{ fontSize: 14 }} gutterBottom>
                                {sitter.start_time.substring(11, 16)} - {sitter.end_time.substring(11, 16)}
                                {/* <Button className="m-1" variant="contained" size="small">Book</Button> */}
                              </Typography>
                              {/* <Typography variant="h5" component="div">
                                {sitter.firstname} {sitter.lastname}
                              </Typography> */}
                              <Typography sx={{ mb: 1.5, mt: 1.5 }}>
                                ${sitter.price} / hr
                              </Typography>
                              <Typography variant="body2">
                                {sitter.location}
                              </Typography>
                            </CardContent>
                            {/* <Button sx={{ alignSelf: 'flex-end' }} className="m-2" variant="contained" size="small" onClick={() => handleBook(sitter)}>Book</Button> */}
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
