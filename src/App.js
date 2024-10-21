import React, { useCallback, useEffect, useState } from "react";
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
import EarnPartner from "./pages/Earn/EarnPartner";
import Play from "./pages/Play/Play";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [isTelegram, setIsTelegram] = useState();
  const [rewardPopup, setRewardPopup] = useState(false);
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
    lastStreakDate: undefined,
    chestTimeStamp: undefined,
    referredUsers: [],
    referralCode: "",
  });
  const [leaderboard, setLeaderboard] = useState({
    player: {},
    users: [],
    userCount: 0,
  });
  const [jwt, setJwt] = useState();
  const [dailySession, setDailySession] = useState(true);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [referralPoints, setReferralPoints] = useState(0);
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
      });
      alert( new Date(res.data.userData.lastChestOpened).getTime() + 300000);
      setLoadingChest(false);
      const referredUsers = res.data.userData.referredUsers;
      const sumRewards = referredUsers.reduce(
        (acc, item) => acc + item.earnedPoints,
        0
      );
      setReferralPoints(sumRewards);
      setJwt(res.data.JWT);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData.chestTimeStamp) {
      const nextAvailableTime =
        userData.chestTimeStamp;
      const now = new Date();

      if (now.getTime() >= nextAvailableTime) {
        setCanClaimHourly(true);
      } else {
        setCanClaimHourly(false);
      }
    }
  }, [userData.chestTimeStamp]);

  const openHourlyChest = async () => {
    if (canClaimHourly) {
      setLoadingChest(true);
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
          chestTimeStamp: new Date(res.data.nextChestAvailableAt).getTime(),
        }));
        alert(new Date(res.data.nextChestAvailableAt).getTime() + 'timeeeeeee');
        setRewardPopup(true);
        setCanClaimHourly(false);
      } catch (err) {
        console.log(err);
        alert(err?.toString());
      }
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
      setLeaderboard({
        player: res.data.userPosition,
        users: res.data.topUsers,
        userCount: res.data.totalParticipants,
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
      }));
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
      const lastDate = new Date(lastStreakDate)
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
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (userData.chestTimeStamp) {
  //     setCanClaimHourly(true);
  //   } else {
  //     setCanClaimHourly(false);
  //   }
  // }, [userData.chestTimeStamp]);

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
              tasks={userData.tasks.slice(0, 4)}
              userData={userData}
              handleCompleteTask={handleCompleteTask}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard username={username} leaderboard={leaderboard} />
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
              rewardPopup={rewardPopup}
              setRewardPopup={setRewardPopup}
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
        <Route path="/earn" element={<Earn />} />
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
    </div>
  );
};

export default App;
