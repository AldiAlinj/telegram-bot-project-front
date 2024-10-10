// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    };

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user) => (
          <li key={user.id}>
            {user.name}: {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
