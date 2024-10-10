// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if your backend is hosted elsewhere

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/api/tasks`);
  return response.data;
};

export const fetchPoints = async () => {
  const response = await axios.get(`${API_URL}/api/points`);
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await axios.get(`${API_URL}/api/leaderboard`);
  return response.data;
};
