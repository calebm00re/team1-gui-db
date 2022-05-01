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
import { AlertSitterDelete } from '../components/AlertSitterDelete';
import ProfileImg from '../Assets/images/imgurl.jpg';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';


export const SitterProfile = () => {
    const theme = useTheme();
    const [nameF, setNameF] = React.useState(sessionStorage.getItem('firstName'));
    const [nameL, setNameL] = React.useState(sessionStorage.getItem('lastName'));
    const [email, setEmail] = React.useState(sessionStorage.getItem('email'));
    const [xp, setXp] = React.useState(sessionStorage.getItem('xp'));
    const [location, setLocation] = React.useState(sessionStorage.getItem('location'));
    const [age, setAge] = React.useState(sessionStorage.getItem('age') !== 'null' ? sessionStorage.getItem('age') : '');
    const [price, setPrice] = React.useState(sessionStorage.getItem('price') !== 'null' ? sessionStorage.getItem('price') : '');
    const [imgurl, setImgurl] = React.useState(sessionStorage.getItem('imgurl'));
    const [open, setOpen] = React.useState(false);
    const ages = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    const prices = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

    const userRepository = new UserRepository();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log('data: ');
        console.log(data.get('imgurl'));
        userRepository.putSitterInfo(data.get('firstName'), data.get('lastName'), data.get('location'), age, price, data.get('xp'), data.get('password'), data.get('imgurl')).then(res => {
            alert('Profile updated');
        }).catch(err => {
            alert('Error updating profile');
        }).finally(() => {
            setNameF(data.get('firstName'));
            setNameL(data.get('lastName'));
            setLocation(data.get('location'));
            setXp(data.get('xp'));
            setImgurl(data.get('imgurl'));
            sessionStorage.setItem('firstName', data.get('firstName'));
            sessionStorage.setItem('lastName', data.get('lastName'));
            sessionStorage.setItem('location', data.get('location'));
            sessionStorage.setItem('age', age);
            sessionStorage.setItem('price', price);
            sessionStorage.setItem('xp', data.get('xp'));
            sessionStorage.setItem('imgurl', data.get('imgurl'));
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
                        <Avatar alt={nameF} src={imgurl === 'null' ? ProfileImg : imgurl} />
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
                                        defaultValue={location === 'null' ? '' : location}
                                        name="location"
                                        placeholder='Enter Location'
                                        autoComplete="location"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="age">Age</InputLabel>
                                        <Select
                                            labelId="age"
                                            id="age"
                                            value={age}
                                            label="Age"
                                            onChange={(event) => { setAge(event.target.value) }}
                                        >
                                            {ages.map((n, index) => (
                                                <MenuItem key={index} value={n}>{n}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="price">Price</InputLabel>
                                        <Select
                                            labelId="price"
                                            id="price"
                                            value={price}
                                            label="Price"
                                            onChange={(event) => { setPrice(event.target.value) }}
                                        >
                                            {prices.map((n, index) => (
                                                <MenuItem key={index} value={n}>{n}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="xp"
                                        label={'Experience'}
                                        // defaultValue={bio}
                                        placeholder={'Tell us about yourself, and your experience!'}
                                        defaultValue={xp === 'null' ? '' : xp}
                                        name="xp"
                                        autoComplete="xp"
                                        multiline
                                        rows={2}
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
                                        defaultValue={imgurl === 'null' ? '' : imgurl}
                                        name="imgurl"
                                        label="Profile Image Link"
                                        placeholder='Enter Image Link'
                                        type="imgurl"
                                        id="imgurl"
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
                    <AlertSitterDelete open={open} setOpen={setOpen} />
                </Container>
            </ThemeProvider>
        </Page>
    );
}