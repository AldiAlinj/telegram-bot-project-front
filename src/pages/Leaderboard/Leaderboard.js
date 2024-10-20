import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import goldMedal from "../../assets/goldMedal.svg";
import silverMedal from "../../assets/silverMedal.svg";
import bronzeMedal from "../../assets/bronzeMedal.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";

const Leaderboard = ({ username, leaderboard }) => {

  const [type, setType] = useState("global")


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid leaderboard-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2">
        <h6 className="leaderboard-main-title">Wall of Fame</h6>
        <div className="user-leaderboard-rank w-100 d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
            <div
              className="name-holder d-flex align-items-center justify-content-center"
              
            >
              <span className="name-initial">{username.slice(0, 1)}</span>
            
            </div>
            <div className="d-flex flex-column">
              <h6 className="user-name mb-0" >
                {username}
              </h6>
              <span className="user-score-amount">
                {getFormattedNumber(leaderboard.player?.points, 0)} Points
              </span>
            </div>
           
          </div>
          {leaderboard.player?.position === 1 ? (
            <img src={goldMedal} alt="gold" />
          ) : leaderboard.player?.position === 2 ? (
            <img src={silverMedal} alt="silver" />
          ) : leaderboard.player?.position === 3 ? (
            <img src={bronzeMedal} alt="bronze" />
          ) : (
            <span className="user-rank">
              #{leaderboard.player?.position}
            </span>
          )}
        </div>
        <div className="d-flex mt-3 align-items-bottom justify-content-between">
          <h6 className="mb-0 wod-total-holders">{getFormattedNumber(leaderboard.userCount, 0)} Holders</h6>
          <span className="top-100">(Top 100)</span>
        </div>
        <div className="leaderboard-tabs position-relative mb-3  d-flex align-items-center justify-content-between w-100">
              <div className={`leaderboard-tab-bg ${type === "weekly" && "move-1"}`}></div>
              <div className="leaderboard-tab p-2 d-flex align-items-center justify-content-center w-50 h-100" onClick={() => setType("global")}>
                <span className={`leaderboard-tab-title ${type === "global" && "leaderboard-tab-title-active"}`}>Global</span>
              </div>
              <div className="leaderboard-tab p-2 d-flex align-items-center justify-content-center w-50 h-100" onClick={() => setType("weekly")}>
                <span className={`leaderboard-tab-title ${type === "weekly" && "leaderboard-tab-title-active"}`}>Weekly</span>
              </div>
            </div>
      </div>
      <div className="players-leaderboard d-flex flex-column">
        {leaderboard.users.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
