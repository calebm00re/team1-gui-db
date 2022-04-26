import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Page from '../components/Page';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { UserRepository } from '../api/userRepository.js'
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AlertDelete } from '../components/AlertDelete';
import ProfileImg from '../Assets/images/imgurl.jpg';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { max } from 'date-fns';

export const Profile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [nameF, setNameF] = React.useState(sessionStorage.getItem('firstName'));
    const [nameL, setNameL] = React.useState(sessionStorage.getItem('lastName'));
    const [email, setEmail] = React.useState(sessionStorage.getItem('email'));
    const [bio, setBio] = React.useState(sessionStorage.getItem('bio'));
    const [location, setLocation] = React.useState(sessionStorage.getItem('location'));
    const [minage, setMinage] = React.useState(sessionStorage.getItem('minage') !== 'null' ? sessionStorage.getItem('minage') : '');
    const [maxage, setMaxage] = React.useState(sessionStorage.getItem('maxage') !== 'null' ? sessionStorage.getItem('maxage') : '');
    const [startTime, setStartTime] = React.useState(sessionStorage.getItem('startTime') !== 'null' ? sessionStorage.getItem('startTime').slice(-2) : '');
    const [endTime, setEndTime] = React.useState(sessionStorage.getItem('endTime') !== 'null' ? sessionStorage.getItem('endTime').slice(-2) : '');
    const [numKids, setNumKids] = React.useState(sessionStorage.getItem('numKids') !== 'null' ? sessionStorage.getItem('numKids') : '');
    const [imgurl, setImgurl] = React.useState(sessionStorage.getItem('imgurl'));
    const [open, setOpen] = React.useState(false);
    const [sitters, setSitters] = React.useState([]);
    const [age, setAge] = React.useState('');
    const ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const workTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const numkids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const userRepository = new UserRepository();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userRepository.putInfo(data.get('firstName'), data.get('lastName'), data.get('imgurl'), data.get('password'), data.get('bio'),
                               minage, maxage, startTime, endTime, numKids, data.get('location') ).then(res => {
            console.log('this is the response for update_info: ')
            console.log(res);
            alert('Profile updated successfully!');
        }).catch(error => {
            console.log('this is the error for update_info: ')
            console.log(error)
            alert('There was an error updating your account, please try again.');
        }).finally(() => {
            setNameF(data.get('firstName'));
            setNameL(data.get('lastName'));
            setBio(data.get('bio'));
            setLocation(data.get('location'));
            sessionStorage.setItem('firstName', data.get('firstName'));
            sessionStorage.setItem('lastName', data.get('lastName'));
            sessionStorage.setItem('bio', data.get('bio'));
            sessionStorage.setItem('location', data.get('location'));
            sessionStorage.setItem('numKids', numKids);
            sessionStorage.setItem('startTime', startTime);
            sessionStorage.setItem('endTime', endTime);
            sessionStorage.setItem('minage', minage);
            sessionStorage.setItem('maxage', maxage);
        });
    };

    const handleDelete = async () => {
        userRepository.deleteUser().then(res => {
            console.log('this is the response for delete_user: ')
            console.log(res)
            alert('Your account has been deleted!');
            navigate('/landing');
        }).catch(error => {
            console.log('this is the error for delete_user: ')
            console.log(error)
            alert('There was an error deleting your account, please try again.');
        });
    };

    return (
        <Page title="Profile">
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}
                    >
                        <Avatar alt={nameF} src={imgurl == 'null' ? ProfileImg : imgurl} />
                        <Typography component="h1" variant="h5">
                            Update Account
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        fullWidth
                                        id="firstName"
                                        label={'First Name'}
                                        defaultValue={nameF}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label={'Last Name'}
                                        defaultValue={nameL}
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label={'Email'}
                                        defaultValue={email}
                                        name="email"
                                        autoComplete="email"
                                        disabled
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="bio"
                                        label={'Bio'}
                                        // defaultValue={bio}
                                        placeholder={'Tell us about yourself!'}
                                        defaultValue={bio == 'null' ? '' : bio}
                                        name="bio"
                                        autoComplete="bio"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="minage">Youngest Child Age</InputLabel>
                                        <Select
                                            labelId="minage"
                                            id="minage"
                                            value={minage}
                                            label="Youngest Child Age"
                                            onChange={(event) => { setMinage(event.target.value) }}
                                        >
                                            {ages.map((n, index) => (
                                                <MenuItem key={index} value={n}>{n}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="maxage">Oldest Child Age</InputLabel>
                                        <Select
                                            labelId="maxage"
                                            id="maxage"
                                            value={maxage}
                                            label="Oldest Child Age"
                                            onChange={(event) => { setMaxage(event.target.value) }}
                                        >
                                            {ages.map((n, index) => (
                                                <MenuItem key={index} value={n}>{n}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="numkids">Number of Kids</InputLabel>
                                        <Select
                                            labelId="numkids"
                                            id="numkids"
                                            value={numKids}
                                            label="Number of Kids"
                                            onChange={(event) => { setNumKids(event.target.value) }}
                                        >
                                            {numkids.map((n, index) => (
                                                <MenuItem key={index} value={n}>{n}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="imgurl"
                                        label="Profile Image Link"
                                        type="imgurl"
                                        id="umgurl"
                                        autoComplete="new-imgurl"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            p: 1,
                            mt: 3,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => setOpen(true)}
                        >
                            Delete account
                        </Button>
                    </Box>
                    <AlertDelete open={open} setOpen={setOpen} />
                </Container>
            </ThemeProvider>
        </Page>
    );
}