import React, { useCallback, useEffect, useState } from "react";
import { json, Route, Routes } from "react-router-dom";
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
  const [dailySession, setDailySession] = useState(false);
  const [dailySessionData, setDailySessionData] = useState({});
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [referralPoints, setReferralPoints] = useState(0)

  const postToken = async (token) => {
    let body = {
      data: token,
    };

    const initData = window.Telegram?.WebApp?.initDataUnsafe;
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
      const referredUsers = res.data.userData.referredUsers
      alert(JSON.stringify(referredUsers))
      const sumRewards = referredUsers.reduce((acc, item) => acc + item.reward, 0);
      setReferralPoints(sumRewards)
      setJwt(res.data.JWT);
    } catch (err) {
      console.log(err);
    }
  };


 

  const fetchAllData = useCallback(() => {
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
    setLoadingClaim(true);
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/claim-streak`,
        {
          token: token,
        }
      );
      setLoadingClaim(false);
      fetchAllData()
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   
  fetchAllData()
  }, [fetchAllData]);

  const canClaimToday = (lastStreakDate) => {
    setLoadingClaim(true);
    if (lastStreakDate === null) {
      setCanClaim(true);
    } else {
      const now = new Date();
      const lastDate = new Date(lastStreakDate);

      lastDate.setUTCHours(0, 0, 0, 0);
      now.setUTCHours(0, 0, 0, 0);

      if (now > lastDate) {
        setCanClaim(true);
      } else {
        setCanClaim(false);
      }
    }
    setLoadingClaim(false);
  };

  useEffect(() => {
    canClaimToday(dailySessionData.lastStreakDate);
  }, [dailySessionData]);

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
    setDailySession(true);
  };

  useEffect(() => {
    fetchLeaderboard(jwt);
  }, [jwt]);


  const handleCompleteTask = async (taskId) => {
    let body = {
      token: jwt,
      taskId: taskId,
    };

    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/complete-task`,
        body
      );
      console.log(res.data);
      fetchAllData();
    } catch (err) {
      console.log(err);
    }
  };


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
            <Home
              username={username}
              referralPoints={referralPoints}
              tasks={tasks?.slice(0, 4)}
              userData={userData}
              jwt={jwt}
              handleCompleteTask={handleCompleteTask}
            />
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
        <Route
          path="/earn"
          element={
            <Earn
              tasks={tasks}
              jwt={jwt}
              completedTasks={userData.completedTasks}
              handleCompleteTask={handleCompleteTask}
            />
          }
        />
        <Route path="/airdrop" element={<Airdrop />} />
      </Routes>
      <DailySession
        show={dailySession}
        onClose={() => setDailySession(false)}
        canClaimToday={canClaim}
        streakDay={dailySessionData?.streakDay}
        claimDailySession={() => claimDailySession(jwt)}
        loadingClaim={loadingClaim}
      />
      <ComingSoon show={airdrop} onClose={() => setAirdrop(false)} />
      <Navbar showAirdrop={() => setAirdrop(true)} />
    </div>
  );
};

export default App;
