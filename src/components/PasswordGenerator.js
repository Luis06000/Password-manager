import React, { useState } from 'react';
import '../styles/PasswordGenerator.css';

function PasswordGenerator() {
  const [options, setOptions] = useState({
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const generatePassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let validChars = '';
    Object.keys(chars).forEach(key => {
      if (options[key]) validChars += chars[key];
    });

    const newPassword = Array(options.length)
      .fill('')
      .map(() => validChars.charAt(Math.floor(Math.random() * validChars.length)))
      .join('');

    setPassword(newPassword);
    checkStrength(newPassword);
  };

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 12) score += 2;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;

    const strengthLevels = {
      1: { text: 'Very Weak', color: '#FF0000' },
      2: { text: 'Weak', color: '#FF6600' },
      3: { text: 'Medium', color: '#FFCC00' },
      4: { text: 'Strong', color: '#99FF00' },
      5: { text: 'Very Strong', color: '#00FF00' }
    };

    setStrength(strengthLevels[score] || strengthLevels[1]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setShowCopyMessage(true);
    
    // Cache le message après 2 secondes
    setTimeout(() => {
      setShowCopyMessage(false);
    }, 2000);
  };

  return (
    <div className="generator-section">
      <div className={`options-toggle ${showOptions ? 'active' : ''}`} 
           onClick={() => setShowOptions(!showOptions)}>
        Password Options
      </div>
      
      {showOptions && (
        <div className="options-container">
          <div className="form-group">
            <label htmlFor="length">Length:</label>
            <input
              type="number"
              id="length"
              name="length"
              value={options.length}
              min="4"
              max="50"
              onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
            />
          </div>

          <div className="form-group options">
            {[
              { id: 'lowercase', label: 'Lowercase (a-z)' },
              { id: 'uppercase', label: 'Uppercase (A-Z)' },
              { id: 'numbers', label: 'Numbers (0-9)' },
              { id: 'symbols', label: 'Symbols (!@#$...)' }
            ].map(({ id, label }) => (
              <div key={id} className="checkbox-option">
                <div className="checkbox-wrapper-19">
                  <input
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={options[id]}
                    onChange={(e) => setOptions({...options, [id]: e.target.checked})}
                  />
                </div>
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="button-group">
        <button className="generate-btn" onClick={generatePassword}>
          Generate
        </button>
      </div>

      {password && (
        <div className="result">
          <h3>Your password:</h3>
          <div className="password-container">
            <span className="password">{password}</span>
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          {strength && (
            <div className="strength-result" style={{ color: strength.color }}>
              Strength: {strength.text}
            </div>
          )}
        </div>
      )}
      
      {/* Message de copie */}
      <div className={`copy-message ${showCopyMessage ? 'show' : ''}`}>
        Password copied to clipboard!
      </div>
    </div>
  );
}

export default PasswordGenerator;