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

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [isTelegram, setIsTelegram] = useState(null);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({
    tasks: [],
    completedTasks: [],
    totalPoints: 0,
    streakPoints: 0,
    chestsPoints: 0,
    tasksPoints: 0,
    streakDay: 0,
    lastStreakDate: null,
    chestTimeStamp: null,
  });
  const [leaderboard, setLeaderboard] = useState({
    player: {},
    users: [],
    userCount: 0,
  });
  const [jwt, setJwt] = useState(null);
  const [dailySession, setDailySession] = useState(true);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [referralPoints, setReferralPoints] = useState(0);
  const [loadingChest, setLoadingChest] = useState(false);
  const [chestTimeStamp, setChestTimeStamp] = useState(null);
  const [canClaimHourly, setCanClaimHourly] = useState(false);

  // const dummyTasks = [
  //   {
  //     partner: "world-of-dypians",
  //     title: "Watch new WoD Video",
  //     subtitle: "Watch and earn 500 points",
  //     link: "https://www.youtube.com/watch?v=VTiIhZcXLSM",
  //     type: "youtube",
  //     action: "watch",
  //     secretWord: "wod the best",
  //     reward: 500,
  //   },
  //   {
  //     partner: "world-of-dypians",
  //     title: "Follow WoD on X",
  //     subtitle: "Follow WoD on X and earn 750 points",
  //     link: "https://twitter.com/worldofdypians",
  //     type: "twitter",
  //     action: "follow",
  //     reward: 700,
  //   },
  //   {
  //     partner: "openflux",
  //     title: "Follow OpenFlux on X",
  //     subtitle: "Follow OpenFlux on X and earn 750 points",
  //     link: "https://x.com/OpenFluxNFT",
  //     type: "twitter",
  //     action: "follow",
  //     reward: 700,
  //   },
  //   {
  //     partner: "openflux",
  //     title: "Join WoD On Telegram",
  //     subtitle: "oin WoD On Telegram and earn 500 points",
  //     link: "https://x.com/OpenFluxNFT",
  //     type: "telegram",
  //     action: "join",
  //     groupId: "-1001542536650",
  //     reward: 700,
  //   },
  // ];
  // const dummyCompletedTasks = [
  //   {
  //     partner: "world-of-dypians",
  //     title: "Watch new WoD Video",
  //     subtitle: "Watch and earn 500 points",
  //     link: "https://www.youtube.com/watch?v=VTiIhZcXLSM",
  //     type: "youtube",
  //     action: "watch",
  //     secretWord: "wod the best",
  //     reward: 500,
  //   },
  //   {
  //     partner: "world-of-dypians",
  //     title: "Follow WoD on X",
  //     subtitle: "Follow WoD on X and earn 750 points",
  //     link: "https://twitter.com/worldofdypians",
  //     type: "twitter",
  //     action: "follow",
  //     reward: 700,
  //   },
  //   {
  //     partner: "openflux",
  //     title: "Follow OpenFlux on X",
  //     subtitle: "Follow OpenFlux on X and earn 750 points",
  //     link: "https://x.com/OpenFluxNFT",
  //     type: "twitter",
  //     action: "follow",
  //     reward: 700,
  //   },
  //   {
  //     partner: "openflux",
  //     title: "Join WoD On Telegram",
  //     subtitle: "oin WoD On Telegram and earn 500 points",
  //     link: "https://x.com/OpenFluxNFT",
  //     type: "telegram",
  //     action: "join",
  //     groupId: "-1001542536650",
  //     reward: 700,
  //   },
  // ];

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
      // console.log(res);
      setUserData({
        tasks: res.data.userData.availableTasks,
        completedTasks: res.data.userData.completedTasks,
        totalPoints: res.data.userData.totalPoints,
        streakPoints: res.data.userData.streakPoints,
        chestsPoints: res.data.userData.chestsPoints,
        tasksPoints: res.data.userData.tasksPoints,
        streakDay: res.data.userData.streakDay,
        lastStreakDate: res.data.userData.lastStreakDate,
        chestTimeStamp: Date.parse(res.data.userData.lastChestOpened) + 3600000,
      });
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

  const openHourlyChest = async () => {
    setLoadingChest(true);
    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/open-chest`,
        {
          token: jwt,
        }
      );
      setLoadingChest(false);
      alert(res.data.pointsAwarded);
      setUserData((prevState) => ({
        ...prevState,
        totalPoints: res.data.totalPoints,
      }));
      setChestTimeStamp(Date.parse(res.data.nextChestAvailableAt));
      setCanClaimHourly(false);
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
      fetchAllData();
      console.log(res.data);
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

      if (now > lastDate) {
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
              tasks={userData.tasks.slice(0, 4)}
              userData={userData}
              jwt={jwt}
              handleCompleteTask={handleCompleteTask}
              openHourlyChest={openHourlyChest}
              loadingChest={loadingChest}
              chestTimeStamp={chestTimeStamp}
              canClaimHourly={canClaimHourly}
              setCanClaimHourly={setCanClaimHourly}
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
