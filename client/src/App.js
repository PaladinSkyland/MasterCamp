import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ContactPage from "./components/HomePage";
import BienvenuePage from "./components/BienvenuePage";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<BienvenuePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={
              <UserProvider>
                <RegisterPage />
              </UserProvider>
            }
          />
          <Route
            path="/home"
            element={
              <UserProvider>
                <ContactPage />
              </UserProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
