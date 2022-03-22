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
import { Calendar } from './pages/Calendar';


// React functional component
export const App = () => {
  // state for storage of the information on the webpage of forms and list, uses hooks
  // const [number, setNumber] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
