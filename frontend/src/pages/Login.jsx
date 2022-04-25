import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import theme from '../Assets/theme';
import { UserRepository } from '../api/userRepository.js'
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';
import Page from '../components/Page';


export const Login = () => {

  const [value, setValue] = React.useState('Parent');

  const userChange = (event) => {
    setValue(event.target.value);
  };

  // const delay = ms => new Promise(res => setTimeout(res, ms));

  // const get_info = async () => {
  //   userRepository.getInfo()
  //     .then(response => {
  //       console.log('this is the response for get_info: ')
  //       console.log(response)
  //       sessionStorage.setItem('firstName', response.data.firstName);
  //       sessionStorage.setItem('lastName', response.data.lastName);
  //       sessionStorage.setItem('email', response.data.email);
  //       await delay(5000);
  //     })
  //     .catch(error => {
  //       console.log('this is the error for get_info: ')
  //       console.log(error)
  //     });
  // }

  const userRepository = new UserRepository();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    userRepository.login(data.get('email'), data.get('password')).then(res => {
      if (res.status <= 201) {
        userRepository.getInfo().then(response => {
          console.log('this is the response for get_info: ')
          console.log(response)
          sessionStorage.setItem('firstName', response.data.firstName);
          sessionStorage.setItem('lastName', response.data.lastName);
          sessionStorage.setItem('email', response.data.email);
          sessionStorage.setItem('bio', response.data.bio);
          sessionStorage.setItem('imgurl', response.data.imgurl);
          sessionStorage.setItem('minage', response.data.minKidAge);
          sessionStorage.setItem('maxage', response.data.maxKidAge);
          sessionStorage.setItem('startTime', response.data.startWorkTime);
          sessionStorage.setItem('endTime', response.data.endWorkTime);
        }).catch(error => {
          console.log('this is the error for get_info: ')
          console.log(error)
        });

        navigate('/dashboard/app');
        // setTimeout(() => {
        //   navigate('/dashboard/app');
        // }, 1000);
      }
    }).catch(err => {
      alert("invalid credentials");
    });
  };

  return (
    <Page title="Login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControl sx={{ mt: 1 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Account type:</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={userChange}
                >
                  <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
                  <FormControlLabel value="Sitter" control={<Radio />} label="Sitter" />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Grid item
                  sx={{
                    marginTop: 8
                  }}>
                  <Button variant="outlined" href="/">Back</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Page>
  );
}