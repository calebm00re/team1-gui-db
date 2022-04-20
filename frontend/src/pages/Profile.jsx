import React from 'react';
// import theme from '../Assets/theme';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Grid from '@mui/material/Grid';
import Page from '../components/Page';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';


export const Profile = () => {
    const [value, setValue] = React.useState(new Date());
    const theme = useTheme();

    return (
        <Page title="Profile">
            <ThemeProvider theme={theme}>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Profile
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Card>
                                <CardHeader title="Bookings" />
                                {/* if have bookings in context? show them with a scroll right else show the message thats curretnly hard coded */}
                                <Typography variant="body1" sx={{ m: 5 }}>
                                    You have no current bookings
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
                        <Grid item xs={12} md={6} lg={8}>
                            <Card>
                                <CardHeader title="Available" />
                                {/* if there are sitters for that day, show them, otherwise show the hardcoded text */}
                                <Typography variant="body1" sx={{ m: 5 }}>
                                    There are no available sitters for the selected date
                                </Typography>
                            </Card>

                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </Page>
    );
}