import React, { useState } from "react";
import "./dailysession.css";
import coin from "../../assets/dailySession/coin.png";
import calendar from "../../assets/dailySession/calendar.png";
import fire from "../../assets/dailySession/fire.png";
import xMark from "../../assets/xMark.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import OutsideClickHandler from "react-outside-click-handler";
import tooltip from "../../assets/tooltip.svg";

const DailySession = ({
  canClaimToday,
  streakDay,
  claimDailySession,
  loadingClaim,
  onClose,
  show,
}) => {
  const days = [
    {
      title: "Day 1",
      reward: 100,
    },
    {
      title: "Day 2",
      reward: 400,
    },
    {
      title: "Day 3",
      reward: 800,
    },
    {
      title: "Day 4",
      reward: 1000,
    },
    {
      title: "Day 5",
      reward: 1500,
    },
    {
      title: "Day 6",
      reward: 2000,
    },
  ];

  const [isClicked, setIsClicked] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState(false);

  const handleClick = () => {
    if (canClaimToday) {
      setIsClicked(true);
      claimDailySession();

      // Reset the animation after a delay (e.g., 500ms)
      setTimeout(() => {
        setIsClicked(false);
      }, 500); // Adjust timing as needed
    } else {
      console.log("Cannot claim");
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className={`daily-session-outer-wrapper ${
          show && "daily-session-active"
        } p-3 d-flex flex-column align-items-center gap-2`}
      >
        <div className="daily-session-inner-wrapper d-flex flex-column gap-4 align-items-center justify-content-end position-relative">
          <div
            className="d-flex align-items-center justify-content-between w-100 px-2"
            style={{ position: "absolute", top: "10px" }}
          >
            <div className="position-relative d-flex align-items-center justify-content-center">
              <img
                src={tooltip}
                width={20}
                height={20}
                style={{ cursor: "pointer" }}
                alt=""
                onClick={() => setTooltipInfo(true)}
              />
              <OutsideClickHandler onOutsideClick={() => setTooltipInfo(false)}>
                <div
                  className={`daily-session-tooltip-content-wrapper ${
                    tooltipInfo && "daily-session-tooltip-active"
                  }`}
                >
                  <span>
                  <b style={{fontWeight: "800"}}>Daily Reward Streak:</b>
                  <br />
                  Earn coins every day by logging in! Keep your streak going to collect bigger rewards. Miss a day, and your streak resets to Day 1. Don’t forget to check in daily for the best rewards!
                  </span>
                </div>
              </OutsideClickHandler>
            </div>

            <img
              src={xMark}
              onClick={onClose}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="daily-session-fire-wrapper w-100 d-flex justify-content-center align-items-center">
            <img src={fire} alt="" className="fire-img" />
          </div>
          <div className="daily-session-lower-wrapper d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-2 align-items-center">
              <h6 className="mb-0 daily-streak-amount">{streakDay}</h6>
              <span className="daily-streak-span">Daily Streak</span>
              <p className="daily-streak-desc mb-0">
                Earn coins by logging into the game daily
              </p>
            </div>
            <div className="row mx-0 w-100">
              {days.map((day, index) => (
                <div className="col-4 px-1" key={index}>
                  <div
                    className={`daily-streak-item ${
                      streakDay === index
                        ? "active-session"
                        : streakDay > index
                        ? "completed-session"
                        : ""
                    } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
                  >
                    <span
                      className={`daily-streak-day ${
                        streakDay === index
                          ? "active-day"
                          : streakDay > index
                          ? "completed-day"
                          : ""
                      }`}
                    >
                      {day.title}
                    </span>
                    <div
                      className={`daily-session-reward-wrapper  ${
                        streakDay === index
                          ? "active-reward"
                          : streakDay > index
                          ? "completed-reward"
                          : ""
                      } px-2 py-1 d-flex align-items-center gap-1`}
                    >
                      <img src={coin} width={15} height={15} alt="" />
                      <span className="daily-session-reward-amount">
                        +{getFormattedNumber(day.reward, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12 px-1">
                <div
                  className={`daily-streak-item w-100 ${
                    streakDay === 6
                      ? "active-session"
                      : streakDay > 6
                      ? "completed-session-7"
                      : ""
                  } px-1 py-2 d-flex align-items-center justify-content-between gap-1 mb-2`}
                >
                  <div className="d-flex flex-column align-items-start gap-1 ps-2">
                    <span
                      className={`daily-streak-day ${
                        streakDay === 6
                          ? "active-day"
                          : streakDay > 6
                          ? "completed-day"
                          : ""
                      }`}
                    >
                      Day 7
                    </span>
                    <div
                      className={`daily-session-reward-wrapper ${
                        streakDay === 6
                          ? "active-reward"
                          : streakDay > 6
                          ? "completed-reward"
                          : ""
                      } px-2 py-1 d-flex align-items-center gap-1`}
                    >
                      <img src={coin} width={15} height={15} alt="" />
                      <span className="daily-session-reward-amount">
                        +3,000
                      </span>
                    </div>
                  </div>
                  <img src={calendar} className="w-25" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`daily-session-button py-3 mb-3 ${
            !canClaimToday && "cant-claim"
          } ${isClicked ? "animate-colors" : ""}`}
          disabled={!canClaimToday}
          onClick={handleClick}
        >
          {loadingClaim ? (
            <div
              className="spinner-border spinner-border-sm text-info"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : canClaimToday ? (
            "Claim"
          ) : (
            "Claimed"
          )}
        </button>
      </div>
    </OutsideClickHandler>
  );
};

export default DailySession;
