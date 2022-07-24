import React from "react";
import './assets/styles/app.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import Header from './components/header';
import PrivateRoute from './components/private';
import Profile from './pages/profile'
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="blur" style={{ top: '-18%', right: '0' }}></div>
        <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
        <Header />
        <Routes>
          {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
