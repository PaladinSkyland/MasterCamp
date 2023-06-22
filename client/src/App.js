import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";


import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import AccountPage from "./components/AccountPage";
import ErrorPage from "./components/ErrorPage";
import LoanApplicationPage from "./components/customer/LoanApplicationPage";
import FileUploadForm from "./components/customer/FileUpload";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/authentification/login" element={<LoginPage />} />
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
                <HomePage />
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
          <Route
            path="/customer/fileUpload"
            element={
              <UserProvider>
                <FileUploadForm />
              </UserProvider>
            }
          />
          <Route
            path="/customer/loanApplication"
            element={<LoanApplicationPage/>}
            />
          <Route
            path="/*"
            element={<ErrorPage />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
