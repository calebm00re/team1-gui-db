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
        <img src={landLogo} alt="Sitters 4 Hire" />
        <img src={babies} alt="wiggling babies" />
        

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
            {/* <h1>
            👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶👶
            </h1> */}
        {/* <h1 style = {{fontSize: 200}}>
        👶
        </h1> */}
            
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
    
    return (
        <>
            <div>
                {/* <div class="landing-center">
                    <h1>Babysitting Done Right</h1>
                </div> */}
                <div>
                    👶
                </div>
                {/* <div class="landing-center">
                    <h2>add nonsense about why you should use our app</h2>
                    <h2>screen shots of usefull features etc then scroll to buttons</h2>
                </div> */}
                <div class="landing-menu">
                    <button type="button" className="btn btn-block btn-outline-dark" onClick={() => navigate("/register")}>Register </button>
                    <button type="button" className="btn btn-block btn-outline-dark" onClick={() => navigate("/login")}>Login </button>
                </div>
            </div>
        </>
    );
}