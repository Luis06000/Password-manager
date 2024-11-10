import React, { useState } from 'react';
import '../styles/PasswordChecker.css';

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const checkPassword = () => {
    if (!password.trim()) {
      setError('Please enter a password');
      setTimeout(() => setError(''), 2000);
      return;
    }

    let score = 0;
    const newFeedback = [];

    if (password.length >= 12) {
      score += 2;
    } else if (password.length >= 8) {
      score += 1;
      newFeedback.push("A longer password would be more secure");
    } else {
      newFeedback.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      newFeedback.push("Add uppercase letters");
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      newFeedback.push("Add lowercase letters");
    } else {
      score += 1;
    }

    if (!/[0-9]/.test(password)) {
      newFeedback.push("Add numbers");
    } else {
      score += 1;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      newFeedback.push("Add special characters");
    } else {
      score += 1;
    }

    const strengthLevels = {
      1: { text: 'Very Weak', color: '#FF0000' },
      2: { text: 'Weak', color: '#FF6600' },
      3: { text: 'Medium', color: '#FFCC00' },
      4: { text: 'Strong', color: '#99FF00' },
      5: { text: 'Very Strong', color: '#00FF00' },
      6: { text: 'Very Strong', color: '#00FF00' }
    };

    setStrength(strengthLevels[score] || strengthLevels[0]);
    setFeedback(newFeedback);
  };

  return (
    <div className="checker-section">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to check"
        />
        <button 
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🔒' : '👁️'}
        </button>
      </div>

      <button onClick={checkPassword}>Check Strength</button>

      {strength && (
        <div className="result">
          <div className="strength-result" style={{ color: strength.color }}>
            Strength: {strength.text}
          </div>
          {feedback.length > 0 && (
            <div className="feedback-list">
              <h3>Improvement Suggestions:</h3>
              <ul>
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PasswordChecker;