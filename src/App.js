import React from 'react';
import logo from './logo.svg';
import './App.css';
import HackerNews from './HackerNews';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HackerNews />
      </header>
    </div>
  );
}

export default App;
