import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import "./resetPasswordPage.css";

//image 

import reset_image from "../image/reset_password.svg";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleResetCodeChange = (event) => setResetCode(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(`Sending email: ${email}, resetCode: ${resetCode}, newPassword: ${newPassword}`);

    try {
        await axiosInstance.post('/reset-forget/reset-password', { email, resetCode, newPassword });
        setMessage('Password has been reset successfully.');
        setError('');
        navigate('/login');
    } catch (error) {
        setError('Failed to reset password. Please try again.');
        setMessage('');
    }
};

  return (
    <div className="reset-password-page">
    <div className="left-side-reset-img">
        <img src={reset_image} alt="" />
    </div>
    <div className="right-side-reset-btn">
    <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Biz<span className="text-blue">Comm</span>Sync</h1>
      <h1>Reset Password</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={email}
          className="custom-input" 
          onChange={handleEmailChange}
          required 
        />
        <input 
          type="text" 
          name="resetCode"
          placeholder="Reset Code" 
          value={resetCode}
          className="custom-input" 
          onChange={handleResetCodeChange}
          required 
        />
        <input 
          type="password" 
          name="newPassword"
          placeholder="New Password" 
          value={newPassword}
          className="custom-input" 
          onChange={handleNewPasswordChange}
          required 
        />
        <button type="submit" className="custom-button-submit-reset">Reset Password</button>

      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      </div>
    </div>
    
  );
};

export default ResetPasswordPage;
