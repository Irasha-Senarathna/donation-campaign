import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const RegisterPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="register-page">
      <h1>Donation Campaign Registration</h1>
      <UserForm fetchUsers={fetchUsers} />
      <div className="separator"></div>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};

export default RegisterPage;
