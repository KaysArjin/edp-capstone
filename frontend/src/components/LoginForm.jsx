import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ username, handleUsername }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [tempUsername, setTempUsername] = useState('');

  console.log(username)
  const navigate = useNavigate();





  const handleSubmit = async (e) => {
    handleUsername(tempUsername);
    e.preventDefault();

    try {
      // Send GET request to fetch user data based on username
      const response = await fetch(`/api/authentication/login/${tempUsername}/${password}`);

      if (!response.ok) {
        throw new Error('Login Credentials Incorrect');
      }

      const userData = await response.json();
      // Check if password matches the one stored in the database

      console.log(userData)


      // Clear form fields and error message on successful login
      setPassword('');
      setError(null);

      navigate('/landingpage');
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className='input-field'
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;