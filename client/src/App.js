
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Login from './components/Login';
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
