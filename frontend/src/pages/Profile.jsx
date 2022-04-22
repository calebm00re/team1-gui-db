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


export const Profile = () => {
    const theme = useTheme();

    const userRepository = new UserRepository();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userRepository.putInfo(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('imgurl'), data.get('password'), data.get('bio')).then(res => {
            console.log('this is the response for update_info: ')
            console.log(res)
            alert('Your changes have been updated!');
        }).catch(error => {
            console.log('this is the error for update_info: ')
            console.log(error)
            alert('There was an error updating your account, please try again.');
        });
        // const data = new FormData(event.currentTarget);
        // userRepository.register(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password')).then(res => {
        //   if (res.status <= 201) {
        //     navigate('/dashboard/app');
        //   }
        // }).catch(err => {
        //   alert("email already in use");
        // });
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonIcon />
                        </Avatar>
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
                                        label={sessionStorage.getItem('firstName')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label={sessionStorage.getItem('lastName')}
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label={sessionStorage.getItem('email')}
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="bio"
                                        label="Bio"
                                        name="bio"
                                        autoComplete="bio"
                                        multiline
                                        rows={2}
                                        maxRows={4}
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
                    <Box sx={{ 
                        mt: 3,
                        flexDirection: 'row-reverse',
                        }}>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Delete account
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </Page>
    );
}