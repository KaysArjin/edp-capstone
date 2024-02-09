import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send GET request to fetch user data based on username
      const response = await fetch(`/api/authentication/login/${username}/${password}`);
      

      console.log(response)
      console.log("here")

      if (!response.ok) {
        throw new Error('Login Credentials Incorrect');
      }

      const userData = await response.json();
      // Check if password matches the one stored in the database

      console.log(userData)
      

      // Clear form fields and error message on successful login
      setUsername('');
      setPassword('');
      setError(null);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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