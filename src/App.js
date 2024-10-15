import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Friends from "./pages/Friends/Friends";
import Tasks from "./pages/Tasks/Tasks";
import Navbar from "./components/Navbar/Navbar";
import "./app.css";
import Airdrop from "./pages/Airdrop/Airdrop";
import GetStarted from "./components/GetStarted/GetStarted";
import ComingSoon from "./components/ComingSoon/ComingSoon";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [airdrop, setAirdrop] = useState(false);

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;

      if (user) {
        if (user.username) {
          setUsername(user.username);
        } else if (user.first_name) {
          setUsername(user.first_name);
        } else {
          setUsername("User");
        }
      } else {
        setUsername("User");
      }
    }
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      // Show the welcome screen if it's the user's first visit in this session
      setShowWelcome(true);
      sessionStorage.setItem("hasVisited", "true"); // Set the flag in sessionStorage
    }
  }, []);

  const handleClose = () => {
    setShowWelcome(false); // Hide the welcome screen when the user dismisses it
  };

  return (
    <div
      className={`container-fluid px-0 main-wrapper ${
        airdrop && "hide-scroll"
      }`}
    >
      <GetStarted showWelcome={showWelcome} onClose={handleClose} />
      <Routes>
        <Route path="/" element={<Home username={username} />} />
        <Route
          path="/leaderboard"
          element={<Leaderboard username={username} />}
        />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/airdrop" element={<Airdrop />} />
      </Routes>
      <ComingSoon show={airdrop} onClose={() => setAirdrop(false)} />
      <Navbar showAirdrop={() => setAirdrop(true)} />
    </div>
  );
};

export default App;
