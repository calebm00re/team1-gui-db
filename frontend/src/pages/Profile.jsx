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

export const Profile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [nameF, setNameF] = React.useState(sessionStorage.getItem('firstName'));
    const [nameL, setNameL] = React.useState(sessionStorage.getItem('lastName'));
    const [email, setEmail] = React.useState(sessionStorage.getItem('email'));
    const [bio, setBio] = React.useState(sessionStorage.getItem('bio'));
    const [minage, setMinage] = React.useState(sessionStorage.getItem('minage'));
    const [maxage, setMaxage] = React.useState(sessionStorage.getItem('maxage'));
    const [startTime, setStartTime] = React.useState(sessionStorage.getItem('startTime'));
    const [endTime, setEndTime] = React.useState(sessionStorage.getItem('endTime'));
    const [imgurl, setImgurl] = React.useState(sessionStorage.getItem('imgurl'));
    const [open, setOpen] = React.useState(false);
    const [sitters, setSitters] = React.useState([]);

    const userRepository = new UserRepository();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userRepository.putInfo(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('imgurl'), data.get('password'), data.get('bio')).then(res => {
            console.log('this is the response for update_info: ')
            console.log(res);
            alert('Profile updated successfully!');
        }).catch(error => {
            console.log('this is the error for update_info: ')
            console.log(error)
            alert('There was an error updating your account, please try again.');
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="minage"
                                        name="minage"
                                        fullWidth
                                        id="minage"
                                        label={'Min Child Age'}
                                        placeholder={'Add your youngest Child\'s age here!'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="maxage"
                                        label={'Max Child Age'}
                                        name="maxage"
                                        autoComplete="maxage"
                                        placeholder={'Add your oldest Child\'s age here!'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="starttime"
                                        name="starttime"
                                        fullWidth
                                        id="starttime"
                                        label={'Start Work Time'}
                                        placeholder={'Add your work\'s starting time!'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="endtime"
                                        label={'End Work Time'}
                                        name="endtime"
                                        autoComplete="endtime"
                                        placeholder={'Add your work\'s ending time!'}
                                    />
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