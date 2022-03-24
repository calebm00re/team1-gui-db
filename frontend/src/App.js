import { React } from 'react';
import './App.css';
import {
  Route, BrowserRouter, Routes
} from 'react-router-dom';


import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';


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
        </Routes>
      </BrowserRouter>
  );
}
