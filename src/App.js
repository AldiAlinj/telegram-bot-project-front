// src/App.js
import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Points from './components/Points';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App">
      <h1>Telegram Bot Dashboard</h1>
      <Tasks />
      <Points />
      <Leaderboard />
    </div>
  );
}

export default App;
