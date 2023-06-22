import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";


import LoginPage from "./components/common/LoginPage";
import RegisterPage from "./components/common/RegisterPage";
import HomePage from "./components/common/HomePage";
import WelcomePage from "./components/common/WelcomePage";
import AccountPage from "./components/common/AccountPage";
import ErrorPage from "./components/common/ErrorPage";
import LoanApplicationPage from "./components/customer/LoanApplicationPage";
import FileUploadForm from "./FileUpload";

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
            path="/customer/loanApplication"
            element={<UserProvider><LoanApplicationPage/></UserProvider>}
            />
          <Route
            path="/customer"
            element={
              <UserProvider>
                <FileUploadForm />
              </UserProvider>
            }
          />
          <Route
            path="/*"
            element={<ErrorPage />}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
