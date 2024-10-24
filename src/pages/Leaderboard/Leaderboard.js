import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import goldMedal from "../../assets/goldMedal.svg";
import silverMedal from "../../assets/silverMedal.svg";
import bronzeMedal from "../../assets/bronzeMedal.svg";
import usdt from "../../assets/usdt.svg";

import getFormattedNumber from "../../hooks/getFormattedNumber";

const Leaderboard = ({ username, leaderboard, weeklyLeaderboard }) => {
  const [type, setType] = useState("global");
  const [weeklyState, setWeeklyState] = useState("current");

  const usdtPrizes = [
    200, 180, 160, 140, 120, 100, 100, 100, 100, 100, 90, 80, 70, 60, 50, 50,
    50, 50, 50, 50, 20, 20, 20, 20, 20,
  ];

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
                  {getFormattedNumber(leaderboard.player?.points, 0)} Points
                </span>
              ) : (
                <span className="user-score-amount">
                  {getFormattedNumber(
                    weeklyLeaderboard.player?.weeklyPoints,
                    0
                  )}{" "}
                  Points
                </span>
              )}
            </div>
          </div>
          {type === "global" ? (
            leaderboard.player?.position === 1 ? (
              <img src={goldMedal} alt="gold" />
            ) : leaderboard.player?.position === 2 ? (
              <img src={silverMedal} alt="silver" />
            ) : leaderboard.player?.position === 3 ? (
              <img src={bronzeMedal} alt="bronze" />
            ) : (
              <span className="user-rank">#{leaderboard.player?.position}</span>
            )
          ) : weeklyLeaderboard.player?.rank === 1 ? (
            <img src={goldMedal} alt="gold" />
          ) : weeklyLeaderboard.player?.rank === 2 ? (
            <img src={silverMedal} alt="silver" />
          ) : weeklyLeaderboard.player?.rank === 3 ? (
            <img src={bronzeMedal} alt="bronze" />
          ) : (
            <span className="user-rank">#{weeklyLeaderboard.player?.rank}</span>
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
      </div>
      <div className="players-leaderboard d-flex flex-column">
        {type === "global"
          ? leaderboard.users.map((item, index) => (
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
                    {getFormattedNumber(item.totalPoints, 0)} Points
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
          ? weeklyLeaderboard.weeklyUsers.map((item, index) => (
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
                  <img src={usdt} alt=""/>
                  <span className="player-usdt-amount">
                    {getFormattedNumber(usdtPrizes[index], 0)}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="player-score-amount">
                    {getFormattedNumber(item.weeklyPoints, 0)} Points
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
                  <img src={usdt} alt=""/>
                  <span className="player-usdt-amount">
                    {getFormattedNumber(usdtPrizes[index], 0)}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {/* <span className="player-score-amount">
                  {getFormattedNumber(item.weeklyPoints, 0)} Points
                </span> */}
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
  );
};

export default Leaderboard;
