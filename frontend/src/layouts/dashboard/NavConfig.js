// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:cube-outline'),
  },
  {
    title: 'Sitters',
    path: '/dashboard/sitters',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: getIcon('eva:person-outline'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Logout',
    path: '/landing',
    icon: getIcon('eva:log-out-outline'),
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export const sitterConfig = [
  {
    title: 'Dashboard',
    path: '/sitters/app',
    icon: getIcon('eva:cube-outline'),
  },
  {
    title: 'Profile',
    path: '/sitters/profile',
    icon: getIcon('eva:person-outline'),
  },
  {
    title: 'Logout',
    path: '/landing',
    icon: getIcon('eva:log-out-outline'),
  },
];

// export default navConfig;
