import React, { useState, useEffect } from 'react';
import backgroundImage from './17.avif';

const WithdrawPage = ({ handleLogout }) => {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBalance = localStorage.getItem('balance');

    if (storedName) {
      setName(storedName);
    }

    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  const handleWithdraw = () => {
    setError('');

    if (!transactionAmount || isNaN(transactionAmount) || transactionAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (parseFloat(transactionAmount) > balance) {
      setError('Insufficient balance.');
      return;
    }

    const newBalance = balance - parseFloat(transactionAmount);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);


    setTransactionAmount('');

    alert(`Successfully withdrew $${transactionAmount}`);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem('name', e.target.value);
  };

  return (
    <div className="withdraw-page" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="withdraw-form" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: '20px',
        width: '80%',
        maxWidth: '40vh',
        border: '4px solid cyan',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <h2>Welcome, {name}</h2>
        <h3>Balance: ${balance}</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '3px solid black',marginLeft:'-10px' ,borderRadius: '5px' }}
        />
        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '3px solid black',marginLeft:'-10px' ,borderRadius: '5px' }}
        />
        <button onClick={handleWithdraw} style={{ width: '100%', padding: '10px', marginTop: '10px', border: '3px solid black', marginLeft: '10px', borderRadius: '5px', backgroundColor: 'black',color: '#fff', cursor: 'pointer' }}>Withdraw</button>
        <button onClick={handleLogout} style={{ width: '100%', padding: '10px', marginTop: '10px', marginLeft: '10px', border: '3px solid black', borderRadius: '5px', backgroundColor: 'black', color: '#fff', cursor: 'pointer' }}>Logout</button>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default WithdrawPage;
