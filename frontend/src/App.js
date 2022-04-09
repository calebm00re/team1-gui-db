import { React } from 'react';
import './App.css';
import {
  Route, BrowserRouter, Routes
} from 'react-router-dom';


import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
// import { Browse } from './pages/Browse';
// import { Kids } from './pages/Kids';
// import { Sitters } from './pages/Sitters';
// import { Calendar } from './pages/Calendar';


// React functional component
export const App = () => {
  // state for storage of the information on the webpage of forms and list, uses hooks
  // const [number, setNumber] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/browse" element={<Browse />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/sitters" element={<Sitters />} />
          <Route path="/calendar" element={<Calendar />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
