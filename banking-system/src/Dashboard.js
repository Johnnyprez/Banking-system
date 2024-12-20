import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "./AuthContext"; 
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome to the Dashboard: {currentUser.displayName || "N/A"}</h2>
      <div className="App">
        <header>
          <h1>Banking System</h1>
          <nav>
            <ul>
              <li>
                <Link to="account">Account Management</Link>
              </li>
              <li>
                <Link to="transaction">Transaction Service</Link>
              </li>
              <li>
                <Link to="loan">Loan Service</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <div className="dashboard-main-content">
            <div className="section">
              <h3>Account Management</h3>
              <p>Manage your account settings and details.</p>
            </div>
            <div className="section">
              <h3>Transaction Service</h3>
              <p>View and manage your transaction history.</p>
            </div>
            <div className="section">
              <h3>Loan Service</h3>
              <p>Apply for loans and manage loan details.</p>
            </div>
          </div>
          {/* Nested routes will be rendered here */}
          <Outlet />
        </main>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
