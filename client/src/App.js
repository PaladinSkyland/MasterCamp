import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import LoginPage from "./components/LoginPage";
import ContactPage from "./components/ContactPage";
import SignInPage from "./components/SignInPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
