import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './layouts/homepage/HomePage';
import About from './layouts/about/About';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar tuKhoaTimKiem={tuKhoaTimKiem}  setTuKhoaTimKiem={setTuKhoaTimKiem}/>
        <Routes>
          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;