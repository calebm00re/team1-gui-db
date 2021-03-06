import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import DashboardSitterNavbar from './DashboardSitterNavbar';
import DashboardSitterSidebar from './DashboardSitterSidebar';
import { UserRepository } from '../../api/userRepository';
import ProfileImg from '../../Assets/images/imgurl.jpg';
// import { Profile } from '../../pages/Profile';

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

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgurl, setImgurl] = useState(null);

  // console.log('in DashboardLayout');
  const userRepository = new UserRepository();

  useEffect(() => {
    userRepository.getInfo().then(response => {
      setUser(response.data.firstName + ' ' + response.data.lastName);
      // console.log('this is the response for get_info: ')
      // console.log(response)
      sessionStorage.setItem('firstName', response.data.firstName);
      sessionStorage.setItem('lastName', response.data.lastName);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('bio', response.data.bio);
      sessionStorage.setItem('imgurl', response.data.imgurl);
      setImgurl(response.data.imgurl);
      sessionStorage.setItem('minage', response.data.minKidAge);
      sessionStorage.setItem('maxage', response.data.maxKidAge);
      sessionStorage.setItem('startTime', response.data.startWorkTime);
      sessionStorage.setItem('endTime', response.data.endWorkTime);
      sessionStorage.setItem('numKids', response.data.numKids);
      sessionStorage.setItem('location', response.data.location);
    }).catch(error => {
      console.log('this is the error for get_info: ')
      console.log(error)
    });
  });
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user} Imgurl={imgurl === 'null' ? ProfileImg : imgurl} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export const SitterLayout = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgurl, setImgurl] = useState(null);

  // console.log('in Sitter DashboardLayout');
  const userRepository = new UserRepository();

  useEffect(() => {
    userRepository.getSitterInfo().then(response => {
      setUser(response.data.firstname + ' ' + response.data.lastname);
      sessionStorage.setItem('firstName', response.data.firstname);
      sessionStorage.setItem('lastName', response.data.lastname);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('xp', response.data.experience);
      sessionStorage.setItem('imgurl', response.data.imgurl);
      setImgurl(response.data.imgurl);
      sessionStorage.setItem('location', response.data.location);
      sessionStorage.setItem('price', response.data.price);
      sessionStorage.setItem('age', response.data.age);
    }).catch(error => {
    });
  });
  return (
    <RootStyle>
      <DashboardSitterNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSitterSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user} Imgurl={imgurl === 'null' ? ProfileImg : imgurl} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}