import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({username, handleUsername}) => {
  // Define state variables for username, password, confirm password, and error message
  const [password, setPassword] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  

  const handleSubmit = async (e) => {
    //preventDefault prevents the form from actually submitting, giving a chance to validate
    handleUsername(tempUsername)
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/authentication/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        // Send username and password in JSON format in the request body
        body: JSON.stringify({ username, password }),
      });

      // Check if request was successful
      if (response.status == 401) {
        throw new Error('user already exists, pick a different username');
      }else{
        if (!response.ok){
          throw new Error('Register failed')
        }
      }

      // Clear form fields and error message on successful registration
      setPassword('');
      setConfirmPassword('');
      setError(null);
      alert('Registration successful');
      navigate('/landingpage');
    } catch (error) {
      setError(error.message);
    }

    
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            required
          />
        </div>
        {/* Password input field */}
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
        {/* Confirm Password input field */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="register button">Register</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default RegistrationForm;
