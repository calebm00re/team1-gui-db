import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
// import { Typography } from '@mui/material';
import landLogo from '../Assets/landLogo.png';
import '../Styles/Navbar.css';
import Search from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
// import { Badge } from '@mui/material';
// import Person from '@mui/icons-material/Person';
// import { useNavigate } from 'react-router-dom';
// import CalendarMonth from '@mui/icons-material/CalendarMonth';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import { ArrowBackIosOutlined } from '@mui/icons-material/AcUnit';

const theme = createTheme();

export const Navbar = () => {
    // const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static'>
                <Toolbar className='toolbar'>
                    <div className='logo'>
                        <img className='logo-img' alt="logo" src={landLogo}></img>
                    </div>
                    {/* <Typography>
                        test
                    </Typography> */}
                    <div className='search'>
                        <Search />
                        <InputBase placeholder='Search...' className='input'/>
                        <FilterAltIcon className='filter'/>
                    </div>
                    <div>
                        {/* <Badge 
                            className='icons'
                            // badgeContent={1} 
                            color="error"
                            onClick={() => navigate('/calendar')}
                        >
                            <CalendarMonth />
                        </Badge>
                        <Badge 
                            className='icons'
                            badgeContent={1} 
                            color="error"
                            onClick={() => navigate('/profile')}
                        >
                            <Person />
                        </Badge> */}
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
    
}