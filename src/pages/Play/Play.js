import React, { useEffect } from "react";
import "./play.css";
import Countdown from "react-countdown";
import ChestSlider from "../../components/ChestSlider/ChestSlider";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <span className="time-left">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};

const Play = ({
  openHourlyChest,
  chestTimeStamp,
  canClaimHourly,
  setCanClaimHourly,
  loadingChest,
  chestReward,
}) => {
  const onClaim = () => {
    openHourlyChest();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container-fluid play-wrapper d-flex flex-column justify-content-between p-0">
        <div
          className={`d-flex flex-column align-items-center justify-content-center gap-3 inner-play-banner`}
        >
          <div className="d-flex flex-column align-items-center gap-2 px-3">
            <h6 className="mb-0 play-title">Chest Rewards</h6>
            <span className="play-desc">
              Select a chest and tap to open it. You can open one every hour.
            </span>
          </div>
          <ChestSlider
            onClaim={onClaim}
            canClaimHourly={canClaimHourly}
            reward={chestReward}
          />
          {canClaimHourly ? (
            <button
              className={`play-page-button ${
                !canClaimHourly || loadingChest
                  ? "play-page-button-disabled"
                  : ""
              } py-2 px-4`}
              disabled={!canClaimHourly || loadingChest}
            >
              {loadingChest ? (
                <div
                  className="spinner-border spinner-border-sm text-info"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Ready to Claim"
              )}
            </button>
          ) : (
            <button
              className={`play-page-button play-page-button-disabled  py-2 px-4`}
              disabled={true}
            >
              <Countdown
                renderer={renderer}
                date={chestTimeStamp}
                onComplete={() => {
                  setCanClaimHourly(true);
                }}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Play;
