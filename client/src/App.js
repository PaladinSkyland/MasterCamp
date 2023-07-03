import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

import BankPage from "./components/admin/Bank";
import EmployeePage from "./components/admin/Employee";


import LoginPage from "./components/common/LoginPage";
import RegisterPage from "./components/common/RegisterPage";
import HomePage from "./components/common/HomePage";
import WelcomePage from "./components/common/WelcomePage";
import AccountPage from "./components/common/AccountPage";
import ErrorPage from "./components/common/ErrorPage";
import LoanApplicationPage from "./components/customer/LoanApplicationPage";
import ConversationPage from "./components/common/ConversationPage";
import FileUploadForm from "./components/customer/FileUpload";
import AllLoanApplicationsPage from "./components/employee/allLoanApplicationsPage";
import MyLoansPage from "./components/customer/MyLoansPage";
import SelectConversationPage from "./components/common/SelectConversationPage";
import EmployeeLoanPage from "./components/employee/employeeLoans";

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
                <RegisterPage />
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
            element={<UserProvider><FileUploadForm /></UserProvider>}
          />
          <Route
            path="/customer/loanApplication"
            element={<UserProvider><LoanApplicationPage/></UserProvider>}
            />
          <Route
            path="/customer/myLoans"
            element={<UserProvider><MyLoansPage/></UserProvider>}
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
            path="/conversation"
            element={
              <UserProvider>
                <SelectConversationPage />
              </UserProvider>
            }
          />
          <Route
            path="/conversation/:conversationId"
            element={
              <UserProvider>
                <ConversationPage />
              </UserProvider>
            }
          />
          <Route
            path="/admin/Employee"
            element={
              <UserProvider>
                <EmployeePage />
              </UserProvider>
            }
          />
          <Route
            path="/admin/bank"
            element={
              <UserProvider>
                <BankPage />
              </UserProvider>
            }
          />
          <Route
            path="/employee/loanApplications"
            element={<UserProvider><AllLoanApplicationsPage/></UserProvider>}
            />
          <Route
            path="/employee/myLoans"
            element={<UserProvider><EmployeeLoanPage/></UserProvider>}
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
