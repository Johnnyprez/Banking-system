import React, { useState } from 'react';
import axios from 'axios';

const AccountManagement = () => {
  const [accountData, setAccountData] = useState(null);

  const fetchAccountDetails = async (accountId) => {
    try {
      const response = await axios.get(`/api/account/${accountId}`);
      setAccountData(response.data);
    } catch (error) {
      console.error('Error fetching account details', error);
    }
  };

  return (
    <div>
      <h2>Account Management</h2>
      <button onClick={() => fetchAccountDetails(1)}>Get Account Details</button>
      {accountData && <pre>{JSON.stringify(accountData, null, 2)}</pre>}
    </div>
  );
};

export default AccountManagement;