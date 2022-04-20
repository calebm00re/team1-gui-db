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
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import Page from '../components/Page';

export const Register = () => {

  const [value, setValue] = React.useState('Parent');

  const userRepository = new UserRepository();
  const navigate = useNavigate();
  const userChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await userRepository.register(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password'))


    // if(!res.success) {
    //   console.log("no good");
    //   // setErrors(res)
    // } 
    // else {
    //   console.log("good entry");
    //   navigate('/home');
    // }
    // navigate('/home');
  };

  return (
    <Page title="Register">
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Already have an account? Sign in
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
                  <Button
                    variant="outlined"
                    href="/"
                  // startIcon={<ArrowBackIosOutlined />}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

      </ThemeProvider>
    </Page>
  );
}