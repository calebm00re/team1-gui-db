import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { DashboardLayout } from './layouts/dashboard';
import { SitterLayout } from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Blog from './pages/Blog';
import User from './pages/Sitters';
import { Login } from './pages/Login';
import { Page404 } from './pages/Page404';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import DashboardApp from './pages/DashboardApp';
import { Landing } from './pages/Landing';
import { SitterProfile } from './pages/SitterProfile';
import { SitterApp } from './pages/SitterApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'sitters', element: <User /> },
        { path: 'profile', element: <Profile /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/sitters',
      element: <SitterLayout />,
      children: [
        { path: 'app', element: <SitterApp /> },
        { path: 'profile', element: <SitterProfile /> },
      ],
    },
    {
      path: '/',
      // element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/landing" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'landing', element: <Landing /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
