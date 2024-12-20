// src/components/LoanService.js
import React, { useState } from 'react';

import axios from 'axios';

const LoanService = () => {
  const [loanInfo, setLoanInfo] = useState(null);

  const checkLoanEligibility = async (accountId) => {
    try {
      const response = await axios.get(`/api/loan/${accountId}`);
      setLoanInfo(response.data);
    } catch (error) {
      console.error('Error fetching loan info', error);
    }
  };

  return (
    <div>
      <h2>Loan Service</h2>
      <button onClick={() => checkLoanEligibility(1)}>Check Loan Eligibility</button>
      {loanInfo && <pre>{JSON.stringify(loanInfo, null, 2)}</pre>}
    </div>
  );
};

export default LoanService;
