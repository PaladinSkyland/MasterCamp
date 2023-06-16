import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider,  } from "./context/AuthContext";

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ContactPage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<UserProvider><RegisterPage /></UserProvider>} />
          <Route path="/home" element={<UserProvider><ContactPage /></UserProvider>} />
          <Route path="/error" element={<UserProvider><ErrorPage /></UserProvider>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
