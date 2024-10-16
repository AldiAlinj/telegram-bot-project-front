import React, { useEffect } from "react";
import "./leaderboard.css";
import goldMedal from "../../assets/goldMedal.svg";
import silverMedal from "../../assets/silverMedal.svg";
import bronzeMedal from "../../assets/bronzeMedal.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";

const Leaderboard = ({ username, leaderboard, userPosition }) => {
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
              style={{ background: "#7037CA" }}
            >
              <span className="name-initial">{username.slice(0, 1)}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="player-name mb-0" style={{ color: "#46557B" }}>
                {username}
              </h6>
              <span className="player-wod-amount" style={{ color: "#46557B" }}>
                {getFormattedNumber(userPosition?.points, 0)} WOD
              </span>
            </div>
          </div>
          {userPosition?.position === 1 ? (
            <img src={goldMedal} alt="gold" />
          ) : userPosition?.position === 2 ? (
            <img src={silverMedal} alt="silver" />
          ) : userPosition?.position === 3 ? (
            <img src={bronzeMedal} alt="bronze" />
          ) : (
            <span className="player-rank" style={{ color: "#46557B" }}>
              {userPosition?.position}
            </span>
          )}
        </div>
        <div className="d-flex mt-3 align-items-bottom justify-content-between">
          <h6 className="mb-0 wod-total-holders">51,632,343 Holders</h6>
          <span className="top-100">(Top 100)</span>
        </div>
      </div>
      <div className="players-leaderboard d-flex flex-column">
        {leaderboard.map((item, index) => (
          <div
            key={index}
            className="leaderboard-item d-flex align-items-center justify-content-between p-3"
          >
            <div className="d-flex align-items-center gap-2">
              <div className="name-holder d-flex align-items-center justify-content-center">
                <span className="name-initial">
                  {item.username.slice(0, 1)}
                </span>
              </div>
              <div className="d-flex flex-column">
                <h6 className="player-name mb-0">{item.username}</h6>
                <span className="player-wod-amount">
                  {getFormattedNumber(item.totalPoints, 0)} WOD
                </span>
              </div>
            </div>
            {item.rank === 1 ? (
              <img src={goldMedal} alt="" />
            ) : item.rank === 2 ? (
              <img src={silverMedal} alt="" />
            ) : item.rank === 3 ? (
              <img src={bronzeMedal} alt="" />
            ) : (
              <span className="player-rank">#{item.rank}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
