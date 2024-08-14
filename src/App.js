import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
