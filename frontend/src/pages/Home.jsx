import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ProfileCard } from './ProfileCard';
import { ThemeProvider, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import theme from '../Assets/theme';

// const pages = ['Sitters', 'Kids', 'browse'];
// const pageIcons = [{PersonIcon}, {CalendarMonthIcon}, {DashboardIcon}, {LogoutIcon}]; 
// const settings = ['Profile', 'Calendar', 'Dashboard', 'Logout'];

export const Home = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const buildMap = (settings, pageIcons) => {
  //   const map = new Map();
  //   for(let i = 0; i < pages.length; i++) {
  //     map.set(settings[i], pageIcons[i]);
  //   };
  //   return map;
  // };

  // buildMap(settings, pageIcons);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              👶🏼
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem onClick={() => navigate("/sitters")}>
                  <WorkHistoryIcon />
                  <Typography textAlign="center">Sitters</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/kids")}>
                  <ChildCareIcon />
                  <Typography textAlign="center">Kids</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/browse")}>
                  <SavedSearchIcon />
                  <Typography textAlign="center">Browse</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              👶🏼
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
              <Button onClick={() => navigate("/sitters")} sx={{ my: 2, color: 'white', display: 'flex' }} startIcon={<WorkHistoryIcon/>}>Sitters</Button>
              <Button onClick={() => navigate("/kids")} sx={{ my: 2, color: 'white', display: 'flex' }} startIcon={<ChildCareIcon/>}>Kids</Button>
              <Button onClick={() => navigate("/browse")} sx={{ my: 2, color: 'white', display: 'flex' }} startIcon={<SavedSearchIcon/>}>Browse</Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <PersonIcon />
                  <Typography textAlign="center" onClick={() => navigate("/profile")}>Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <CalendarMonthIcon />
                  <Typography textAlign="center" onClick={() => navigate("/calendar")}>Calendar</Typography>
                </MenuItem>
                <MenuItem>
                  <DashboardIcon />
                  <Typography textAlign="center" onClick={() => navigate("/home")}>Dashboard</Typography>
                </MenuItem>
                <MenuItem>
                  <LogoutIcon />
                  <Typography textAlign="center" onClick={() => navigate("/")}>Logout</Typography>
                </MenuItem>
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{'icon ' + setting}</Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid 
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </Grid>
      {/* <Button variant="outlined" href="/">Landing</Button> */}
    </ThemeProvider>
  );
};