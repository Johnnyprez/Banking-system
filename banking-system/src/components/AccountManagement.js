import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const AccountManagement = () => {
  const { currentUser } = useAuth();
  const [credit, setCredit] = useState(0); // State to store user's credit

  // Fetch credit from localStorage when the component mounts
  useEffect(() => {
    if (currentUser) {
      const savedCredit = localStorage.getItem(`credit_${currentUser.uid}`);
      if (savedCredit) {
        setCredit(parseInt(savedCredit, 10)); // Set the credit from localStorage
      } else {
        setCredit(0); // Default to 0 if no credit is found
      }
    }
  }, [currentUser]); // Re-run the effect if the current user changes

  return (
    <div>
      <h2>Account Management</h2>
      {currentUser ? (
        <div>
          <p><strong>Name:</strong> {currentUser.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>UID:</strong> {currentUser.uid}</p>
          <p><strong>Credit:</strong> {credit}</p> {/* Display user's credit */}
        </div>
      ) : (
        <p>No user is logged in.</p>
      )}
    </div>
  );
};

export default AccountManagement;
