import React, { useState } from 'react';
import '../styles/PasswordGenerator.css';

function PasswordGenerator() {
  const [options, setOptions] = useState({
    length: 8,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let validChars = '';
    let password = '';
    
    // Collecte tous les caractères valides
    Object.keys(chars).forEach(key => {
      if (options[key]) validChars += chars[key];
    });

    // D'abord, on s'assure d'avoir au moins un caractère de chaque type sélectionné
    Object.keys(chars).forEach(key => {
      if (options[key]) {
        const randomChar = chars[key].charAt(Math.floor(Math.random() * chars[key].length));
        password += randomChar;
      }
    });

    // Ensuite, on remplit le reste de la longueur avec des caractères aléatoires
    const remainingLength = options.length - password.length;
    for (let i = 0; i < remainingLength; i++) {
      password += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    // Mélange le mot de passe final (algorithme de Fisher-Yates)
    const shuffledPassword = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setPassword(shuffledPassword);
    checkStrength(shuffledPassword);
  };

  const checkStrength = (pass) => {
    let score = 0;
    
    // Vérifie la longueur
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    
    // Vérifie les différents types de caractères
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;

    const strengthLevels = {
      0: { text: 'Very Weak', color: '#FF0000' },   // 0 critères
      1: { text: 'Weak', color: '#FF6600' },        // 1-2 critères
      2: { text: 'Medium', color: '#FFCC00' },      // 3 critères
      3: { text: 'Strong', color: '#99FF00' },      // 4-5 critères
      4: { text: 'Very Strong', color: '#00FF00' }  // 6 critères
    };

    // Conversion du score (0-6) en niveau de force (0-4)
    const strengthScore = Math.floor(score * 4 / 6);
    setStrength(strengthLevels[strengthScore]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setShowCopyMessage(true);
    
    // Cache le message après 2 secondes
    setTimeout(() => {
      setShowCopyMessage(false);
    }, 2000);
  };

  const handleOptionChange = (optionId) => {
    // Si on essaie de décocher
    if (options[optionId] === true) {
      // Compte combien d'options sont actuellement cochées
      const currentlyChecked = Object.values(options)
        .filter((value, index) => typeof value === 'boolean' && value === true)
        .length;
      
      // Si c'est la dernière option cochée
      if (currentlyChecked === 1) {
        setError('At least one option must be selected');
        setTimeout(() => setError(''), 3000); // Le message disparaît après 3 secondes
        return; // On sort de la fonction sans modifier l'état
      }
    }
    
    // Si on arrive ici, on peut modifier l'option
    setError('');
    setOptions({...options, [optionId]: !options[optionId]});
  };

  return (
    <div className="generator-section">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="options-wrapper">
        <div className={`options-toggle ${showOptions ? 'active' : ''}`} 
             onClick={() => setShowOptions(!showOptions)}>
          Password Options
        </div>
        
        {showOptions && (
          <div className="options-container">
            <div className="form-group">
              <label htmlFor="length">Length:</label>
              <input
                type="tel"
                id="length"
                name="length"
                value={options.length}
                min="4"
                max="50"
                onChange={(e) => {
                  const value = Math.min(50, parseInt(e.target.value));
                  setOptions({...options, length: value});
                }}
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
                      onChange={() => handleOptionChange(id)}
                    />
                    <label className="check-box" htmlFor={id}></label>
                  </div>
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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