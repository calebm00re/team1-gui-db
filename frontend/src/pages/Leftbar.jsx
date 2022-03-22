import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Styles/Leftbar.css';
// import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from '@mui/icons-material/Home';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up("sm")]: {
            margin: '1rem',
        },
    },
}));

export const Leftbar = () => {
    const classes = useStyles();
    // const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div className={classes.item}>
                    <Home className='icon'/>
                    <Typography className='text'>Home</Typography>
                </div>
                <div className={classes.item}>
                    <Home className='icon'/>
                    <Typography className='text'>Home</Typography>
                </div>
                <div className={classes.item}>
                    <Home className='icon'/>
                    <Typography className='text'>Home</Typography>
                </div>
                <div className={classes.item}>
                    <Home className='icon'/>
                    <Typography className='text'>Home</Typography>
                </div>
                <div className={classes.item}>
                    <Home className='icon'/>
                    <Typography className='text'>Home</Typography>
                </div>
            </Container>
        </ThemeProvider>
    );
    
}