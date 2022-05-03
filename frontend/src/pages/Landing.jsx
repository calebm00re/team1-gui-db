// import '../Styles/Landing.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Page from '../components/Page';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Assets/theme';
import landLogo from "../Assets/images/Landing Title.png";
import babies from "../Assets/images/landing_animation.gif";
import { Typography } from "@mui/material";

export const Landing = () => {

    const navigate = useNavigate();

    sessionStorage.clear();

    return (    
    <Page title="Landing">
    <ThemeProvider theme={theme}>
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
            marginTop: 8,
            backgroundImage: `url(${landLogo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#fafafa',
        }}
    >
        {/* <img src={landLogo} alt="Sitters 4 Hire" /> */}
        <Typography variant="h1" textAlign="center">Sitters 4 Hire</Typography>
        <Container component="main" maxWidth="xs">
        <img src={babies} alt="wiggling babies" />
        </Container>
        

    </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/login")}
        >
            Sign In
        </Button>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/register")}
        >
            Sign Up
        </Button>
        </Box>
      </Container>
    </ThemeProvider>
    </Page>
    );
}