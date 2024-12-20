import React, { useState } from 'react';

import axios from 'axios';

const Transaction = () => {
  const [transactionData, setTransactionData] = useState(null);

  const makeTransaction = async (fromAccount, toAccount, amount) => {
    try {
      const response = await axios.post(`/api/transaction`, {
        fromAccount,
        toAccount,
        amount,
      });
      setTransactionData(response.data);
    } catch (error) {
      console.error('Error making transaction', error);
    }
  };

  return (
    <div>
      <h2>Transaction Service</h2>
      <button onClick={() => makeTransaction(1, 2, 100)}>Make Transaction</button>
      {transactionData && <pre>{JSON.stringify(transactionData, null, 2)}</pre>}
    </div>
  );
};

export default Transaction;