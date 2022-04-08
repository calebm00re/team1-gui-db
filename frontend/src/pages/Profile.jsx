import React from 'react';
import theme from '../Assets/theme';
import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';


export const Profile = () => {
    const [value, setValue] = React.useState(new Date());

    return (
        <>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDateTimePicker
                        displayStaticWrapperAs="desktop"
                        openTo="year"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}