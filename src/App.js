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


  useEffect(() => {
    // if (!isTelegramBrowser()) {
    //   window.location.href = "https://www.google.com/"; // Redirect to an error page or show a message
    // }

    alert(navigator.vendor)
  }, []);

  // const isTelegramBrowser = () => {
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   return /Telegram/i.test(userAgent);
  // };



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
    <div className={`container-fluid px-0 main-wrapper ${airdrop && "hide-scroll"}`}>
      <GetStarted showWelcome={showWelcome} onClose={handleClose} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
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
