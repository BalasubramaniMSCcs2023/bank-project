import React from 'react';

const AllData = ({ users }) => {
  return (
    <div>
      <h2>All User Data</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.name}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Balance:</strong> ${user.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllData;
