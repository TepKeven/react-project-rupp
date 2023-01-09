import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './front/component/navbar';
import Homepage from './front/layout/home';
import AboutPage from './front/layout/about';
import ContactPage from './front/layout/contact';
import Footer from './front/component/footer';
import DashboardPage from './admin/layout/dashboard';


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>

          {/* Front Side */}
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Admin Side */}
          <Route path="/admin" element={<DashboardPage /> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
