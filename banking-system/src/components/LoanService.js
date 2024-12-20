import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Assuming you have an AuthContext to get the logged-in user

const LoanService = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const [credit, setCredit] = useState(0); // User's current credit
  const [loanInfo, setLoanInfo] = useState(null);
  const [error, setError] = useState(null);

  // Function to load credit from localStorage
  const loadCreditFromLocalStorage = () => {
    if (currentUser) {
      const savedCredit = localStorage.getItem(`credit_${currentUser.uid}`);
      return savedCredit ? parseInt(savedCredit, 10) : 500; // Default to 500 if no credit is stored
    }
    return 0;
  };

  // Load credit when the component mounts or when the user changes
  useEffect(() => {
    if (currentUser) {
      const initialCredit = loadCreditFromLocalStorage();
      setCredit(initialCredit);
    }
  }, [currentUser]);

  // Update localStorage whenever credit changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`credit_${currentUser.uid}`, credit);
    }
  }, [credit, currentUser]);

  // Function to calculate loan eligibility based on credit
  const checkLoanEligibility = () => {
    if (!currentUser) {
      setError("You must be logged in to check loan eligibility.");
      return;
    }

    // Loan eligibility logic: Allow loans up to 2x the user's credit
    const loanEligibility = {
      eligibleAmount: credit * 2, // Loan eligibility is 2x the current credit
      credit,
    };

    setLoanInfo(loanEligibility);
    setError(null);
  };

  // Function to take a loan
  const takeLoan = (loanAmount) => {
    if (!loanInfo) {
      setError("Please check your loan eligibility first.");
      return;
    }

    if (loanAmount > loanInfo.eligibleAmount) {
      setError(`Loan amount exceeds your eligibility of ${loanInfo.eligibleAmount}.`);
      return;
    }

    if (loanAmount <= 0) {
      setError("Loan amount must be greater than 0.");
      return;
    }

    // Deduct loan amount from eligibility and add it to credit
    setCredit((prevCredit) => prevCredit + loanAmount);
    setLoanInfo((prevLoanInfo) => ({
      ...prevLoanInfo,
      eligibleAmount: prevLoanInfo.eligibleAmount - loanAmount,
    }));

    setError(null);
  };

  return (
    <div>
      <h2>Loan Service</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loanInfo ? (
        <button onClick={checkLoanEligibility}>Check Loan Eligibility</button>
      ) : (
        <div>
          <h3>Your Loan Eligibility Information</h3>
          <p>
            Current Credit: <strong>{credit}</strong>
          </p>
          <p>
            Loan Eligibility: <strong>{loanInfo.eligibleAmount}</strong>
          </p>
          <button onClick={() => takeLoan(200)}>Take Loan of 200</button>
          <button onClick={() => takeLoan(300)}>Take Loan of 300</button>
        </div>
      )}
    </div>
  );
};

export default LoanService;
