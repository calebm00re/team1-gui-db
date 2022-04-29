import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserRepository } from '../api/userRepository.js'
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const AlertCreateShift = ({ open, setOpen }) => {
    const [location, setLocation] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [value, setValue] = React.useState(null);
    const workTimes = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

    const userRepository = new UserRepository();
    const navigate = useNavigate();

    const handleSubmit = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Shift"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Create your new Shift!
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="location"
                                label={'Location'}
                                defaultValue={location == 'null' ? '' : location}
                                name="location"
                                placeholder='Enter Location'
                                autoComplete="location"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="starttime">Start Work Time</InputLabel>
                                <Select
                                    labelId="starttime"
                                    id="starttime"
                                    value={startTime}
                                    label="Start Work Time"
                                    onChange={(event) => { setStartTime(event.target.value) }}
                                >
                                    {workTimes.map((n, index) => (
                                        <MenuItem key={index} value={n}>{n}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="endtime">End Work Time</InputLabel>
                                <Select
                                    labelId="endtime"
                                    id="endtime"
                                    value={endTime}
                                    label="End Work Time"
                                    onChange={(event) => { setEndTime(event.target.value) }}
                                >
                                    {workTimes.map((n, index) => (
                                        <MenuItem key={index} value={n}>{n}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Create</Button>
                    <Button onClick={handleClose} color="primary" autofocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}