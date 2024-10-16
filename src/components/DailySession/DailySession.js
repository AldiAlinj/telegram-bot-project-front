import React from "react";
import "./dailysession.css";
import coin from "../../assets/dailySession/coin.png";
import calendar from "../../assets/dailySession/calendar.png";
import fire from "../../assets/dailySession/fire.png";
import closeDaily from '../../assets/dailySession/closeDaily.svg'

const DailySession = ({
  canClaimToday,
  streakDay,
  claimDailySession,
  loadingClaim,
  onClose,
  show
}) => {

  return (
    <div className={`daily-session-outer-wrapper ${show && "daily-session-active"} p-3 d-flex flex-column align-items-center gap-2`}>
      <div className="d-flex align-items-center justify-content-end w-100">
        <img src={closeDaily} onClick={onClose} alt="" />
      </div>
      <div className="daily-session-inner-wrapper d-flex flex-column gap-4 align-items-center justify-content-end">
        <img src={fire} alt="" style={{ width: "200px" }} />
        <div className="d-flex flex-column gap-2 align-items-center">
          <h6 className="mb-0 daily-streak-amount">2</h6>
          <span className="daily-streak-span">Daily Streak</span>
          <p className="daily-streak-desc mb-0">
            Earn points by logging into the game daily
          </p>
        </div>
        <div className="row mx-0 w-100">
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 0
                  ? "active-session"
                  : streakDay > 0
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 0
                    ? "active-day"
                    : streakDay > 0
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 1
              </span>
              <div
                className={`daily-session-reward-wrapper  ${
                  streakDay === 0
                    ? "active-reward"
                    : streakDay > 0
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 1
                  ? "active-session"
                  : streakDay > 1
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 1
                    ? "active-day"
                    : streakDay > 1
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 2
              </span>
              <div
                className={`daily-session-reward-wrapper ${
                  streakDay === 1
                    ? "active-reward"
                    : streakDay > 1
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 2
                  ? "active-session"
                  : streakDay > 2
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 2
                    ? "active-day"
                    : streakDay > 2
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 3
              </span>
              <div
                className={`daily-session-reward-wrapper ${
                  streakDay === 2
                    ? "active-reward"
                    : streakDay > 2
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 3
                  ? "active-session"
                  : streakDay > 3
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 3
                    ? "active-day"
                    : streakDay > 3
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 4
              </span>
              <div
                className={`daily-session-reward-wrapper ${
                  streakDay === 3
                    ? "active-reward"
                    : streakDay > 3
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 4
                  ? "active-session"
                  : streakDay > 4
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 4
                    ? "active-day"
                    : streakDay > 4
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 5
              </span>
              <div
                className={`daily-session-reward-wrapper ${
                  streakDay === 4
                    ? "active-reward"
                    : streakDay > 4
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-4 px-1">
            <div
              className={`daily-streak-item ${
                streakDay === 5
                  ? "active-session"
                  : streakDay > 5
                  ? "completed-session"
                  : ""
              } w-100 px-1 py-2 d-flex flex-column align-items-center gap-1 mb-2`}
            >
              <span
                className={`daily-streak-day ${
                  streakDay === 5
                    ? "active-day"
                    : streakDay > 5
                    ? "completed-day"
                    : ""
                }`}
              >
                Day 6
              </span>
              <div
                className={`daily-session-reward-wrapper ${
                  streakDay === 5
                    ? "active-reward"
                    : streakDay > 5
                    ? "completed-reward"
                    : ""
                } px-2 py-1 d-flex align-items-center gap-1`}
              >
                <img src={coin} width={15} height={15} alt="" />
                <span className="daily-session-reward-amount">+25,000</span>
              </div>
            </div>
          </div>
          <div className="col-12 px-1">
            <div
              className={`daily-streak-item w-100 ${
                streakDay === 6
                  ? "active-session"
                  : streakDay > 6
                  ? "completed-session"
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
                  <span className="daily-session-reward-amount">+25,000</span>
                </div>
              </div>
              <img src={calendar} className="w-25" alt="" />
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
