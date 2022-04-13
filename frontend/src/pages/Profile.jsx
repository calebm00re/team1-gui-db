import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Grid from '@mui/material/Grid';


export const Profile = () => {
    const [value, setValue] = React.useState(new Date());

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                    </Grid>
                </Grid>
                {/* <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            orientation="landscape"
                            openTo="day"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div> */}
            </ThemeProvider>
        </>
    );
}