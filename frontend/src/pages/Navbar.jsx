import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import landLogo from '../Assets/landLogo.png';
import '../Styles/Navbar.css';
import Search from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
// import { ArrowBackIosOutlined } from '@mui/icons-material/AcUnit';

const theme = createTheme();

export const Navbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">
                        <img className='logo-img' alt="logo" src={landLogo}></img>
                    </Typography>
                    <div className='search'>
                        <Search />
                        <InputBase placeholder='Search...'/>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
    
}