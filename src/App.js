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
import DailySession from "./components/DailySession/DailySession";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [isTelegram, setIsTelegram] = useState(null);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  const [jwt, setJwt] = useState(null);
  const [dailySession, setDailySession] = useState(true);
  const [dailySessionData, setDailySessionData] = useState({});
  const [loadingClaim, setLoadingClaim] = useState(false);

  const postToken = async (token) => {
    let body = {
      data: token,
    };

    const initData = window.Telegram?.WebApp?.initDataUnsafe;
    // Check if there's a `start_param` in the initData (this could be the referral code)
    if (initData?.start_param) {
      body = {
        data: token,
        referralCode: initData?.start_param,
      };
    }

    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/tg_auth`,
        body
      );
      // console.log(res);
      setUserData(res.data.userData);
      setTasks(res.data.userData.availableTasks);
      setDailySessionData({
        streakDay: res.data.userData.streakDay,
        lastStreakDate: res.data.userData.lastStreakDate,
        streakPoints: res.data.userData.streakPoints,
      });
      setJwt(res.data.JWT);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLeaderboard = async (token) => {
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/leaderboard`,
        {
          token: token,
        }
      );
      setLeaderboard(res.data.topUsers);
      setUserPosition(res.data.userPosition);
    } catch (err) {
      console.log(err);
    }
  };

  const claimDailySession = async (token) => {
    setLoadingClaim(true)
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/claim-streak`,
        {
          token: token,
        }
      );
      setLoadingClaim(false);
      console.log(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor("bg_color", "#FF5733");
    }

    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;

      if (user) {
        postToken(window.Telegram.WebApp.initData);
        setIsTelegram(true);
        if (user.username) {
          setUsername(user.username);
        } else if (user.first_name) {
          setUsername(user.first_name);
        } else {
          setUsername("User");
        }
      } else {
        setUsername("User");
        setIsTelegram(false);
      }
    }
  }, []);



  const canClaimToday = (lastStreakDate) => {
    const now = new Date();
    const lastDate = new Date(lastStreakDate);

    lastDate.setUTCHours(0, 0, 0, 0);
    now.setUTCHours(0, 0, 0, 0);

    return now > lastDate;
  };

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      // Show the welcome screen if it's the user's first visit in this session
      setShowWelcome(true);
      sessionStorage.setItem("hasVisited", "true"); // Set the flag in sessionStorage
    }
    setDailySession(true);
  }, []);

  const handleClose = () => {
    setShowWelcome(false); // Hide the welcome screen when the user dismisses it
  };

  useEffect(() => {
    fetchLeaderboard(jwt);
  }, [jwt]);

  if (!isTelegram) {
    return (
      <div
        className={`d-flex  justify-content-center align-items-center`}
        style={{ height: "100vh", width: "100vw" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <h1 className="use-telegram-title mb-0">Page available on</h1>
          <a
            href="https://t.me/AldiTestBot_bot/AldiTestBot"
            className="use-telegram-title"
          >
            Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container-fluid px-0 main-wrapper ${
        airdrop && "hide-scroll"
      }`}
    >
      <GetStarted showWelcome={showWelcome} onClose={handleClose} />
      <Routes>
        <Route
          path="/"
          element={
            <Home username={username} tasks={tasks} userData={userData} />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              username={username}
              leaderboard={leaderboard}
              userPosition={userPosition}
            />
          }
        />
        <Route
          path="/friends"
          element={
            <Friends
              referredUsers={userData.referredUsers}
              referralCode={userData.referralCode}
            />
          }
        />
        <Route path="/earn" element={<Earn />} />
        <Route path="/airdrop" element={<Airdrop />} />
      </Routes>
   {dailySession &&
      <DailySession
      canClaimToday={() => canClaimToday(dailySessionData?.lastStreakDate)}
      streakDay={dailySessionData?.streakDay}
      claimDailySession={() => claimDailySession(jwt)}
      loadingClaim={loadingClaim}
    />
   }
      <ComingSoon show={airdrop} onClose={() => setAirdrop(false)} />
      <Navbar showAirdrop={() => setAirdrop(true)} />
    </div>
  );
};

export default App;
