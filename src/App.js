import React, { useState } from 'react';
import './App.css';
import PasswordGenerator from './components/PasswordGenerator.js';
import PasswordChecker from './components/PasswordChecker.js';
import MatrixBackground from './components/MatrixBackground.js';

function App() {
  const [view, setView] = useState('generate');

  return (
    <div className="app">
      <MatrixBackground />
      <div className="container">
        <h1>Password Manager</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${view === 'generate' ? 'active' : ''}`}
            onClick={() => setView('generate')}
          >
            Generator
          </button>
          <button 
            className={`tab ${view === 'check' ? 'active' : ''}`}
            onClick={() => setView('check')}
          >
            Checker
          </button>
        </div>

        {view === 'generate' ? <PasswordGenerator /> : <PasswordChecker />}
      </div>
    </div>
  );
}

export default App;