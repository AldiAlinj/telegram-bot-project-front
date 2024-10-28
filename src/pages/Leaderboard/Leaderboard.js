import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import goldMedal from "../../assets/goldMedal.svg";
import silverMedal from "../../assets/silverMedal.svg";
import bronzeMedal from "../../assets/bronzeMedal.svg";
import usdt from "../../assets/usdt.svg";

import getFormattedNumber from "../../hooks/getFormattedNumber";

const Leaderboard = ({
  username,
  leaderboard,
  weeklyLeaderboard,
  totalPoints,
  weeklyPoints
}) => {
  const [type, setType] = useState("global");
  const [weeklyState, setWeeklyState] = useState("current");
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [globalUser, setGlobalUser] = useState({});
  const [weeklySorted, setWeeklySorted] = useState([]);
  const [weeklyUser, setWeeklyUser] = useState({})

  const usdtPrizes = [
    200, 180, 160, 140, 120, 100, 100, 100, 100, 100, 90, 80, 70, 60, 50, 50,
    50, 50, 50, 50, 20, 20, 20, 20, 20,
  ];

  const updateUserScoreAndSort = (array, username, totalPoints) => {
    // Check if the user exists in the array
    const userExists = array.some((user) => user.username === username);

    // If user exists, update the score and sort the array
    if (userExists) {
      const updatedArray = array.map((user) =>
        user.username === username
          ? { ...user, totalPoints: totalPoints }
          : user
      );
      const sortedArray = updatedArray.sort(
        (a, b) => b.totalPoints - a.totalPoints
      ).map((user, index) => ({ ...user, rank: index + 1 }));

      // Find the updated user
      const updatedUser = sortedArray.find(
        (user) => user.username === username
      );

      // Return both the sorted array and the updated user
      return { sortedArray, updatedUser };
    }

    return { sortedArray: array, updatedUser: null };
  };
  const updateUserScoreAndSortWeekly = (array, username, weeklyPoints) => {
    // Check if the user exists in the array
    const userExists = array.some((user) => user.username === username);

    // If user exists, update the score and sort the array
    if (userExists) {
      const updatedArray = array.map((user) =>
        user.username === username
          ? { ...user, weeklyPoints: weeklyPoints }
          : user
      );
      const sortedWeekly = updatedArray.sort(
        (a, b) => b.weeklyPoints - a.weeklyPoints
      ).map((user, index) => ({ ...user, rank: index + 1 }));

      // Find the updated user
      const updatedUserWeekly = sortedWeekly.find(
        (user) => user.username === username
      );

      // Return both the sorted array and the updated user
      return { sortedWeekly, updatedUserWeekly };
    }

    return { sortedWeekly: array, updatedUserWeekly: null };
  };

  useEffect(() => {
    const {sortedArray, updatedUser} = updateUserScoreAndSort(
      leaderboard.users,
      username,
      totalPoints
    );
    const {sortedWeekly, updatedUserWeekly} = updateUserScoreAndSortWeekly(
      weeklyLeaderboard.weeklyUsers,
      username,
      weeklyPoints
    )
    setGlobalLeaderboard(sortedArray);
    setGlobalUser(updatedUser);
    setWeeklySorted(sortedWeekly)
    setWeeklyUser(updatedUserWeekly)
  }, [leaderboard, totalPoints, username, weeklyLeaderboard, weeklyPoints]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className="container-fluid leaderboard-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2">
        <h6 className="leaderboard-main-title">Wall of Fame</h6>
        <div
          className={`${
            type === "global"
              ? "user-leaderboard-rank"
              : "user-leaderboard-rank-weekly"
          } w-100 d-flex align-items-center justify-content-between p-3`}
        >
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                type === "global" ? "name-holder" : "name-holder-weekly"
              } d-flex align-items-center justify-content-center`}
            >
              <span className="name-initial">{username.slice(0, 1)}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="user-name mb-0">{username}</h6>
              {type === "global" ? (
                <span className="user-score-amount">
                  {getFormattedNumber(totalPoints, 0)} Coins
                </span>
              ) : type === "weekly" && weeklyState === "current" ? (
                <span className="user-score-amount">
                  {getFormattedNumber(
                    weeklyPoints,
                    0
                  )}{" "}
                  Coins
                </span>
              ) : type === "weekly" && weeklyState === "previous" ? (
                <span className="user-score-amount">
                  {getFormattedNumber(
                    weeklyLeaderboard.prevPlayer?.weeklyPoints,
                    0
                  )}{" "}
                  Coins
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          {type === "global" ? (
            globalUser?.rank === 1 ? (
              <img src={goldMedal} alt="gold" />
            ) : globalUser?.rank === 2 ? (
              <img src={silverMedal} alt="silver" />
            ) : globalUser?.rank === 3 ? (
              <img src={bronzeMedal} alt="bronze" />
            ) : (
              <span className="user-rank">#{globalUser?.rank}</span>
            )
          ) : type === "weekly" && weeklyState === "current" ? (
            weeklyUser?.rank === 1 ? (
              <img src={goldMedal} alt="gold" />
            ) : weeklyUser?.rank === 2 ? (
              <img src={silverMedal} alt="silver" />
            ) : weeklyUser?.rank === 3 ? (
              <img src={bronzeMedal} alt="bronze" />
            ) : (
              <span className="user-rank">
                #{weeklyUser?.rank}
              </span>
            )
          ) : type === "weekly" && weeklyState === "previous" ? (
            <>
              {weeklyLeaderboard.prevPlayer?.rank === 1 ? (
                <img src={goldMedal} alt="gold" />
              ) : weeklyLeaderboard.prevPlayer?.rank === 2 ? (
                <img src={silverMedal} alt="silver" />
              ) : weeklyLeaderboard.prevPlayer?.rank === 3 ? (
                <img src={bronzeMedal} alt="bronze" />
              ) : (
                <span className="user-rank">
                  #{weeklyLeaderboard.prevPlayer?.rank}
                </span>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex mt-3 align-items-bottom justify-content-between">
          <h6 className="mb-0 wod-total-holders">
            {getFormattedNumber(leaderboard.userCount, 0)} Holders
          </h6>
          <span className="top-100">
            {type === "global" ? "(Top 100)" : "(Top 25)"}
          </span>
        </div>
        <div className="leaderboard-tabs position-relative mb-3  d-flex align-items-center justify-content-between w-100">
          <div
            className={`leaderboard-tab-bg ${type === "weekly" && "move-1"}`}
          ></div>
          <div
            className="leaderboard-tab p-2 d-flex align-items-center justify-content-center w-50 h-100"
            onClick={() => setType("global")}
          >
            <span
              className={`leaderboard-tab-title ${
                type === "global" && "leaderboard-tab-title-active"
              }`}
            >
              Future Airdrop
            </span>
          </div>
          <div
            className="leaderboard-tab p-2 d-flex align-items-center justify-content-center w-50 h-100"
            onClick={() => setType("weekly")}
          >
            <span
              className={`leaderboard-tab-title ${
                type === "weekly" && "leaderboard-tab-title-active"
              }`}
            >
              Weekly
            </span>
          </div>
        </div>
        {type === "weekly" && (
        <div className="leaderboard-tabs position-relative mt-3 p-2  d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center w-100 gap-2 justify-content-between">
            <span className="view-previus-txt">View previous winners </span>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                value={weeklyState}
                style={{ cursor: "pointer" }}
                onChange={() => {
                  setWeeklyState(
                    weeklyState === "current" ? "previous" : "current"
                  );
                }}
              />
            </div>
          </div>
          {/* <div
              className={`leaderboard-tab-bg ${
                weeklyState === "previous" && "move-1"
              }`}
            ></div>
            <div
              className="leaderboard-tab p-1 d-flex align-items-center justify-content-center w-50 h-100"
              onClick={() => setWeeklyState("current")}
            >
              <span
                className={`leaderboard-tab-title ${
                  weeklyState === "current" && "leaderboard-tab-title-active"
                }`}
              >
                Current Week
              </span>
            </div>
            <div
              className="leaderboard-tab p-1 d-flex align-items-center justify-content-center w-50 h-100"
              onClick={() => setWeeklyState("previous")}
            >
              <span
                className={`leaderboard-tab-title ${
                  weeklyState === "previous" && "leaderboard-tab-title-active"
                }`}
              >
                Previous Week
              </span>
            </div> */}
        </div>
      )}
      </div>
      <div className="players-leaderboard d-flex flex-column">
        {type === "global"
          ? globalLeaderboard.map((item, index) => (
              <div
                key={index}
                className="leaderboard-item d-flex align-items-center justify-content-between px-3 py-2"
              >
                <div className="d-flex align-items-center gap-2">
                  <div className="name-holder d-flex align-items-center justify-content-center">
                    <span className="name-initial">
                      {item.username.slice(0, 1)}
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="player-name mb-0">{item.username}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="player-score-amount">
                    {getFormattedNumber(item.totalPoints, 0)} Coins
                  </span>
                  {index + 1 === 1 ? (
                    <img src={goldMedal} alt="" />
                  ) : index + 1 === 2 ? (
                    <img src={silverMedal} alt="" />
                  ) : index + 1 === 3 ? (
                    <img src={bronzeMedal} alt="" />
                  ) : (
                    <span className="player-rank">#{index + 1}</span>
                  )}
                </div>
              </div>
            ))
          : weeklyState === "current"
          ? weeklySorted.map((item, index) => (
              <div
                key={index}
                className="leaderboard-item d-flex align-items-center justify-content-between px-3 py-2"
              >
                <div className="d-flex align-items-center gap-2 col-4">
                  <div className="name-holder d-flex align-items-center justify-content-center">
                    <span className="name-initial">
                      {item.username.slice(0, 1)}
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="player-name mb-0">{item.username}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 justify-content-center col-4">
                  <img src={usdt} alt="" />
                  <span className="player-usdt-amount">
                    {getFormattedNumber(usdtPrizes[index], 0)}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 justify-content-end col-4">
                  <span className="player-score-amount">
                    {getFormattedNumber(item.weeklyPoints, 0)} Coins
                  </span>
                  {index + 1 === 1 ? (
                    <img src={goldMedal} alt="" />
                  ) : index + 1 === 2 ? (
                    <img src={silverMedal} alt="" />
                  ) : index + 1 === 3 ? (
                    <img src={bronzeMedal} alt="" />
                  ) : (
                    <span className="player-rank">#{index + 1}</span>
                  )}
                </div>
              </div>
            ))
          : weeklyLeaderboard.prevWeeklyUsers.map((item, index) => (
              <div
                key={index}
                className="leaderboard-item d-flex align-items-center justify-content-between px-3 py-2"
              >
                <div className="d-flex align-items-center gap-2 col-4">
                  <div className="name-holder d-flex align-items-center justify-content-center">
                    <span className="name-initial">
                      {item.username.slice(0, 1)}
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="player-name mb-0">{item.username}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 justify-content-center col-4">
                  <img src={usdt} alt="" />
                  <span className="player-usdt-amount">
                    {getFormattedNumber(usdtPrizes[index], 0)}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 justify-content-end col-4">
                  <span className="player-score-amount">
                    {getFormattedNumber(item.weeklyPoints, 0)} Coins
                  </span>
                  {index + 1 === 1 ? (
                    <img src={goldMedal} alt="" />
                  ) : index + 1 === 2 ? (
                    <img src={silverMedal} alt="" />
                  ) : index + 1 === 3 ? (
                    <img src={bronzeMedal} alt="" />
                  ) : (
                    <span className="player-rank">#{index + 1}</span>
                  )}
                </div>
              </div>
            ))}
      </div>
   
    </div>
  );
};

export default Leaderboard;
