import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { UserRepository } from '../../api/userRepository';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  console.log('in DashboardLayout');
  const userRepository = new UserRepository();

  useEffect(() => {
    userRepository.getInfo().then(response => {
      setUser(response.data.firstName + ' ' + response.data.lastName);
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
  }, []);
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}