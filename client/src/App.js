import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ContactPage from "./components/HomePage";
import BienvenuePage from "./components/BienvenuePage";
import AccountPage from "./components/AccountPage";
import SearchPage from "./components/SearchPage";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<BienvenuePage />} />
          <Route path="/authentification/login" element={<LoginPage />} />
          <Route path="/searchpage" element={<SearchPage/>} />
          <Route
            path="/authentification/register"
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
          <Route
            path="/account"
            element={
              <UserProvider>
                <AccountPage />
              </UserProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
