// src/components/Points.js
import React, { useEffect, useState } from 'react';
import { fetchPoints } from '../api';

const Points = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const loadPoints = async () => {
      const data = await fetchPoints();
      setPoints(data.points);
    };

    loadPoints();
  }, []);

  return (
    <div>
      <h2>Your Points</h2>
      <p>{points}</p>
    </div>
  );
};

export default Points;
