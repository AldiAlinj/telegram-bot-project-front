import React from "react";
import "./dailysession.css";
import coin from "../../assets/dailySession/coin.png";
import calendar from "../../assets/dailySession/calendar.png";
import fire from "../../assets/dailySession/fire.png";
import closeDaily from "../../assets/dailySession/closeDaily.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";

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
      reward: 10000,
    },
    {
      title: "Day 2",
      reward: 25000,
    },
    {
      title: "Day 3",
      reward: 45000,
    },
    {
      title: "Day 4",
      reward: 70000,
    },
    {
      title: "Day 5",
      reward: 100000,
    },
    {
      title: "Day 6",
      reward: 200000,
    },
  ];

  return (
    <div
      className={`daily-session-outer-wrapper ${
        show && "daily-session-active"
      } p-3 d-flex flex-column align-items-center gap-2`}
    >
      <div className="d-flex align-items-center justify-content-end w-100">
        <img src={closeDaily} onClick={onClose} alt="" />
      </div>
      <div className="daily-session-inner-wrapper d-flex flex-column gap-4 align-items-center justify-content-end">
          <div className="daily-session-fire-wrapper w-100 d-flex justify-content-center align-items-center">
          <img src={fire} alt="" className="w-50" />
          </div>
       <div className="daily-session-lower-wrapper d-flex flex-column gap-2">
       <div className="d-flex flex-column gap-2 align-items-center">
          <h6 className="mb-0 daily-streak-amount">2</h6>
          <span className="daily-streak-span">Daily Streak</span>
          <p className="daily-streak-desc mb-0">
            Earn points by logging into the game daily
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
                  <span className="daily-session-reward-amount">+250,000</span>
                </div>
              </div>
              <img src={calendar} className="w-25" alt="" />
            </div>
          </div>
        </div>
       </div>
      </div>
      <button
        className={`daily-session-button py-3 ${
          !canClaimToday && "cant-claim"
        } mb-3`}
        disabled={!canClaimToday}
        onClick={() => {
          canClaimToday ? claimDailySession() : console.log("Cannot claim");
        }}
      >
        {loadingClaim ? (
          <div class="spinner-border spinner-border-sm text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : canClaimToday ? (
          "Claim"
        ) : (
          "Claimed"
        )}
      </button>
    </div>
  );
};

export default DailySession;
