
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentification/AuthContext';

import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';

const App = () => {


  return (
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    
  );
};

export default App
