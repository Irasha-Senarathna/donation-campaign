import React from 'react';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <p>No registered users yet.</p>;
  }

  return (
    <div className="user-list">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
