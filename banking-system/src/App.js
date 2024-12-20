import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AccountManagement from "./components/AccountManagement";
import Transaction from "./components/Transaction";
import LoanService from "./components/LoanService";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected dashboard route with nested routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested child routes for /dashboard */}
            <Route path="account" element={<AccountManagement />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="loan" element={<LoanService />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
