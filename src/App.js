import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import EarnPartner from "./pages/Earn/EarnPartner";
import Play from "./pages/Play/Play";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [isTelegram, setIsTelegram] = useState();
  const [username, setUsername] = useState("");
  const [chestReward, setChestReward] = useState(0);
  const [userData, setUserData] = useState({
    tasks: [],
    completedTasks: [],
    totalPoints: 0,
    streakPoints: 0,
    chestsPoints: 0,
    tasksPoints: 0,
    streakDay: 0,
    referralPoints: 0,
    lastStreakDate: undefined,
    chestTimeStamp: undefined,
    referredUsers: [],
    referralCode: "",
    walletAddress: null,
  });
  const [leaderboard, setLeaderboard] = useState({
    player: {},
    users: [],
    userCount: 0,
  });
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState({
    player: {},
    weeklyUsers: [],
    prevWeeklyUsers: [],
  });
  const [jwt, setJwt] = useState();
  const [dailySession, setDailySession] = useState(true);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [loadingChest, setLoadingChest] = useState(false);
  const [canClaimHourly, setCanClaimHourly] = useState(false);

  const postToken = async (token) => {
    setLoadingChest(true);
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
      const referredUsers = res.data.userData.referredUsers;
      const sumRewards = referredUsers.reduce(
        (acc, item) => acc + item.earnedPoints,
        0
      );
      setUserData({
        tasks: res.data.userData.availableTasks,
        completedTasks: res.data.userData.completedTasks,
        totalPoints: res.data.userData.totalPoints,
        streakPoints: res.data.userData.streakPoints,
        chestsPoints: res.data.userData.chestsPoints,
        tasksPoints: res.data.userData.tasksPoints,
        streakDay: res.data.userData.streakDay,
        lastStreakDate: res.data.userData.lastStreakDate,
        chestTimeStamp:
          new Date(res.data.userData.lastChestOpened).getTime() + 300000,
        referredUsers: res.data.userData.referredUsers,
        referralCode: res.data.userData.referralCode,
        walletAddress: res.data.userData.walletAddress,
        referralPoints: sumRewards,
      });
      setLoadingChest(false);

      setJwt(res.data.JWT);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData.chestTimeStamp) {
      const nextAvailableTime = userData.chestTimeStamp;
      const now = new Date();

      if (now.getTime() >= nextAvailableTime) {
        setCanClaimHourly(true);
      } else {
        setCanClaimHourly(false);
      }
    }
  }, [userData.chestTimeStamp]);

  const postWalletAddress = async (wallet) => {
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/link-wallet`,
        {
          token: jwt,
          walletAddress: wallet,
        }
      );
      setUserData((prevState) => ({
        ...prevState,
        walletAddress: res.data.walletAddress,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const openHourlyChest = async () => {
    if (canClaimHourly) {
      try {
        const res = await axios.post(
          `https://api.worldofdypians.com/api/open-chest`,
          {
            token: jwt,
          }
        );
        setLoadingChest(false);
        setChestReward(res.data.pointsAwarded);
        setUserData((prevState) => ({
          ...prevState,
          totalPoints: res.data.totalPoints,
          chestsPoints: res.data.chestsPoints,
          chestTimeStamp: new Date(res.data.nextChestAvailableAt).getTime(),
        }));
        setCanClaimHourly(false);
      } catch (err) {
        console.log(err);
        setLoadingChest(false);
      }
    }
  };

  const fetchAllData = useCallback(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
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
      setLeaderboard({
        player: res.data.userPosition,
        users: res.data.topUsers,
        userCount: res.data.totalParticipants,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchWeeklyLeaderboard = async (token) => {
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/weekly-leaderboard`,
        {
          token: token,
        }
      );
      setWeeklyLeaderboard({
        player: res.data.currentLeaderboard.userPosition,
        weeklyUsers: res.data.currentLeaderboard.topUsers,
        prevWeeklyUsers: res.data.previousLeaderboard.leaderboard,
      });
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
      setUserData((prevState) => ({
        ...prevState,
        totalPoints: res.data.totalPoints,
        streakDay: res.data.streakDay,
        streakPoints: res.data.streakPoints,
      }));
      setCanClaim(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllData();
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

      if (now.getTime() > lastDate.getTime()) {
        setCanClaim(true);
      } else {
        setCanClaim(false);
      }
    }
    setLoadingClaim(false);
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready(); // Ensure Telegram WebApp is ready
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor("bg_color", "#FF5733");
    }
  }, []);

  useEffect(() => {
    canClaimToday(userData.lastStreakDate);
  }, [userData.lastStreakDate]);

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

  useEffect(() => {
    fetchLeaderboard(jwt);
    fetchWeeklyLeaderboard(jwt);
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
      setUserData((prevState) => ({
        ...prevState,
        totalPoints: res.data.totalPoints,
        tasks: res.data.availableTasks,
        completedTasks: res.data.completedTasks,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;

    if (location.pathname !== "/") {
      backButton.show();
      backButton.onClick(() => {
        navigate(-1);
      });
    } else {
      backButton.hide();
    }

    return () => {
      backButton.offClick();
    };
  }, [location, navigate]);

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
      {!showWelcome && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  username={username}
                  referralPoints={userData.referralPoints}
                  tasks={userData.tasks.slice(0, 4)}
                  userData={userData}
                  handleCompleteTask={handleCompleteTask}
                  walletAddress={userData.walletAddress}
                  postWalletAddress={postWalletAddress}
                />
              }
            />
            <Route
              path="/leaderboard"
              element={
                <Leaderboard
                  username={username}
                  leaderboard={leaderboard}
                  weeklyLeaderboard={weeklyLeaderboard}
                />
              }
            />
            <Route
              path="/play"
              element={
                <Play
                  openHourlyChest={openHourlyChest}
                  chestTimeStamp={userData.chestTimeStamp}
                  canClaimHourly={canClaimHourly}
                  setCanClaimHourly={setCanClaimHourly}
                  loadingChest={loadingChest}
                  setLoadingChest={setLoadingChest}
                  chestReward={chestReward}
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
                  tasks={userData.tasks}
                  completedTasks={userData.completedTasks}
                  handleCompleteTask={handleCompleteTask}
                />
              }
            />
            <Route
              path="/earn/:partnerId"
              element={
                <EarnPartner
                  tasks={userData.tasks}
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
            streakDay={userData?.streakDay}
            claimDailySession={() => claimDailySession(jwt)}
            loadingClaim={loadingClaim}
          />
          <ComingSoon show={airdrop} onClose={() => setAirdrop(false)} />
          <Navbar showAirdrop={() => setAirdrop(true)} />
        </>
      )}
    </div>
  );
};

export default App;
