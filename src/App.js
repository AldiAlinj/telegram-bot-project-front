import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Friends from "./pages/Friends/Friends";
import Earn from "./pages/Earn/Earn";
import Navbar from "./components/Navbar/Navbar";
import "./app.css";
import Airdrop from "./pages/Airdrop/Airdrop";
import GetStarted from "./components/GetStarted/GetStarted";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import axios from "axios";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [isTelegram, setIsTelegram] = useState(null)
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([])



  const postToken = async (token) => {
    try {
      const res = await axios.post(`https://api.worldofdypians.com/api/tg_auth`, {
        data: token
      });
      // console.log(res);
      setUserData(res.data)
      alert(res.data)
    } catch (err) {
      console.log(err);
    }
  };



 


  useEffect(() => {

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('bg_color', '#FF5733'); 
    }

    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;

      if (user) {
        postToken(window.Telegram.WebApp.initData)
      setIsTelegram(true)
        if (user.username) {
          setUsername(user.username);
        } else if (user.first_name) {
          setUsername(user.first_name);
        } else {
          setUsername("User");
        }
      } else {
        setUsername("User");
      setIsTelegram(false)
        
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


  if(!isTelegram){
    return (
      <div
      className={`d-flex  justify-content-center align-items-center`}
      style={{height: "100vh", width: "100vw"}}
    >
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
        <h1 className="use-telegram-title mb-0">
          Page available on
        </h1>
        <a href="https://t.me/AldiTestBot_bot/AldiTestBot" className="use-telegram-title">
        Telegram
        </a>
        </div>
    </div>
    )
  }

  return (
    <div
      className={`container-fluid px-0 main-wrapper ${
        airdrop && "hide-scroll"
      }`}
    >
      <GetStarted showWelcome={showWelcome} onClose={handleClose} />
      <Routes>
        <Route path="/" element={<Home username={username} tasks={tasks} userData={userData} />} />
        <Route
          path="/leaderboard"
          element={<Leaderboard username={username} />}
        />
        <Route path="/friends" element={<Friends referralCode={userData.referralCode} />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/airdrop" element={<Airdrop />} />
      </Routes>
      <ComingSoon show={airdrop} onClose={() => setAirdrop(false)} />
      <Navbar showAirdrop={() => setAirdrop(true)} />
    </div>
  );
};

export default App;
