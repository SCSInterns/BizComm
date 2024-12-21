import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Assuming you have an axios instance configured for API calls
import './forgetpage.css'; 

import forget_password from "../image/forgot_password.svg";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post('api/v1/forgot-password', { email });
      setMessage('Password reset instructions have been sent to your email.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset instructions. Please try again.');
      setMessage('');
    }
  };

  const handleBackToLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="main-forget">
      <div className="leftimage-forget">
        <img src={forget_password} alt="" />
      </div>
      <div className="forgot-password-page">
        <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Biz<span className="text-blue">Comm</span>Sync</h1>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            placeholder="name@gmail.com" 
            className="custom-input" 
            value={email}
            onChange={handleEmailChange}
            required 
          />
          <button type="submit" className="custom-button-submit-forget">Send Request</button>
        </form>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button onClick={handleBackToLoginClick} className="custom-butoon-back-submit">Back to Login</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
