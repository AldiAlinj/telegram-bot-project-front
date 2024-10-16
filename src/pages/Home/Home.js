import React, { useEffect, useState } from "react";
import "./home.css";
import coin from "../../assets/dailySession/coin.png";
import TaskItem from "../../components/TaskItem/TaskItem";
import { NavLink } from "react-router-dom";
import playBanner from "../../assets/playBanner.png";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import Countdown from "react-countdown";

const renderer = ({ hours, minutes }) => {
  return (
    <span className="time-left">
      {hours}:{minutes}
    </span>
  );
};

const Home = ({
  username,
  tasks,
  userData,
  handleCompleteTask,
  referralPoints,
  openHourlyChest,
  loadingChest,
  chestTimeStamp
}) => {
  const dummyTasks = [
    {
      title: "Follow World of Dypians",
      link: "#",
      _id: 1,
      type: "twitter",
      reward: 700,
    },
    {
      title: "Follow World of Dypians",
      link: "#",
      _id: 1,
      type: "discord",
      reward: 5000,
    },
    {
      title: "Follow World of Dypians",
      link: "#",
      _id: 1,
      type: "youtube",
      reward: 700,
    },
    {
      title: "Follow World of Dypians",
      link: "#",
      _id: 1,
      type: "telegram",
      reward: 12000,
    },
  ];

  const [canClaim, setCanClaim] = useState(false);

  const lastClaimTime = Date.parse(chestTimeStamp); // or new Date(lastClaimTimestamp).getTime()
  const oneHourInMs = 3600000;
  const countdownEndTime = lastClaimTime + oneHourInMs;



  useEffect(() => {
    const now = Date.now();
    if (now >= countdownEndTime) {
      setCanClaim(true);
    }
    alert(now, "now")
    alert(countdownEndTime, "end")
  }, [countdownEndTime]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid home-wrapper pt-4 pb-3">
      <div className="d-flex align-items-center justify-content-between w-100">
        <span className="hello-user">Hello, {username}!</span>
        <div className="total-coins-wrapper d-flex align-items-center gap-2 p-1">
          <span className="user-total-coins">
            {getFormattedNumber(userData.totalPoints, 0)}
          </span>
          <div className="home-coin-wrapper d-flex align-items-center justify-content-center">
            <img src={coin} width={20} height={20} alt="" />
          </div>
        </div>
      </div>
      <div className="my-progress-wrapper d-flex flex-column gap-2 p-3 mt-3">
        <h6 className="my-progress-title mb-0">My Progress</h6>
        <div className="home-info-grid">
          <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
            <span className="home-grid-value">
              {getFormattedNumber(
                userData.streakPoints + userData.chestsPoints,
                0
              )}
            </span>
            <span className="home-grid-info">Game</span>
          </div>
          <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
            <span className="home-grid-value">
              {getFormattedNumber(userData.tasksPoints, 0)}
            </span>
            <span className="home-grid-info">Tasks</span>
          </div>
          <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
            <span className="home-grid-value">
              {getFormattedNumber(referralPoints, 0)}
            </span>
            <span className="home-grid-info">Invites</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column mt-3 mb-5 play-banner-wrapper">
        <img src={playBanner} alt="" style={{ borderRadius: "10px" }} />
        <button
          className={`play-button ${
            canClaim === false && "play-button-disabled"
          } py-2 px-4`}
          onClick={openHourlyChest}
          disabled={!canClaim || loadingChest}
        >
          {loadingChest ? (
            <div
              class="spinner-border spinner-border-sm text-info"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : canClaim ? (
            "Claim"
          ) : (
            <Countdown
              renderer={renderer}
              date={countdownEndTime}
              onComplete={() => setCanClaim(true)}
            />
          )}
        </button>
      </div>
      <div className="d-flex flex-column gap-2 mt-3">
        <h6 className="home-tasks-title mb-0">Earn</h6>
        <div className="home-tasks-container d-flex flex-column gap-2 position-relative mb-4">
          {dummyTasks.map((task, index) => (
            <TaskItem
              item={task}
              key={index}
              handleCompleteTask={handleCompleteTask}
            />
          ))}

          <NavLink to={"/earn"}>
            <button className="show-more-button py-1 px-2">Show more</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
