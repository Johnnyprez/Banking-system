import React, { useState } from "react";
import { getAuth } from "firebase/auth"; // Firebase Auth to get the logged-in user

const Transaction = () => {
  const [credit, setCredit] = useState(0); // Track the user's current credit
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(0); // To store the amount to be added
  const [isConfirming, setIsConfirming] = useState(false); // Flag for confirmation step

  // Function to add credit to the logged-in user
  const addCredit = async (amount) => {
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const currentUser = auth.currentUser; // Get the currently logged-in user

      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      // Set the pending amount and show the confirmation button
      setPendingAmount(amount);
      setIsConfirming(true); // Show the confirm button
      setError(null); // Clear previous errors
    } catch (error) {
      setError("Error adding credit: " + error.message);
      console.error("Error adding credit", error);
    }
  };

  // Function to confirm the credit addition
  const confirmCreditAddition = () => {
    try {
      if (pendingAmount <= 0) {
        setError("Amount must be greater than zero.");
        return;
      }

      // Update the credit locally
      setCredit((prevCredit) => prevCredit + pendingAmount);

      // Simulate a transaction
      const auth = getAuth();
      const currentUser = auth.currentUser;

      const newTransaction = {
        fromAccount: "System", // System or admin as the source of credit
        toAccount: currentUser.uid,
        amount: pendingAmount,
        timestamp: new Date().toISOString(),
      };

      // Store the transaction data in local state
      setTransactionData(newTransaction);

      console.log("Credit added successfully:", newTransaction);
      setIsConfirming(false); // Hide the confirm button
      setPendingAmount(0); // Reset the pending amount
    } catch (error) {
      setError("Error confirming credit: " + error.message);
      console.error("Error confirming credit", error);
    }
  };

  return (
    <div>
      <h2>Transaction Service</h2>

      {/* Display the logged-in user's current credit */}
      <p>Your Current Credit: <strong>{credit}</strong></p>

      {/* Button to add credit to the logged-in user's account */}
      <button onClick={() => addCredit(100)}>Add Credit</button>

      {/* If a pending amount is set, show confirmation step */}
      {isConfirming && (
        <div>
          <p>Are you sure you want to add {pendingAmount} credit?</p>
          <button onClick={confirmCreditAddition}>Confirm</button>
          <button onClick={() => setIsConfirming(false)}>Cancel</button>
        </div>
      )}

      {/* Display transaction data if available */}
      {transactionData && (
        <div>
          <h3>Last Transaction</h3>
          <pre>{JSON.stringify(transactionData, null, 2)}</pre>
        </div>
      )}

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Transaction;
