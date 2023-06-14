
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentification/AuthContext';

import LoginPage from './components/LoginPage';
import Register from './components/Register';
import ContactPage from './components/ContactPage';

const App = () => {


  return (
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    
  );
};

export default App
