import React, { useEffect } from "react";
import "./play.css";
import Countdown from "react-countdown";
import ChestSlider from "../../components/ChestSlider/ChestSlider";
import OutsideClickHandler from "react-outside-click-handler";
import coin from "../../assets/dailySession/coin.png";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import closeReward from "../../assets/closeReward.svg";

const renderer = ({ hours, minutes }) => {
  return (
    <span className="time-left">
      {hours}:{minutes}
    </span>
  );
};

const Play = ({
  openHourlyChest,
  chestTimeStamp,
  canClaimHourly,
  setCanClaimHourly,
  loadingChest,
  rewardPopup,
  setRewardPopup,
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
          <ChestSlider onClaim={onClaim} canClaimHourly={canClaimHourly} />
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
          ) : chestTimeStamp ? (
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
          ) : <></>}
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setRewardPopup(false)}>
        <div
          className={`hourly-chest-reward ${
            rewardPopup && "hourly-reward-active"
          } d-flex flex-column gap-2 px-3 pb-4 pt-2 align-items-center justify-content-center`}
        >
          <div className="d-flex w-100 justify-content-end">
            <img
              src={closeReward}
              alt=""
              onClick={() => setRewardPopup(false)}
            />
          </div>
          <h6 className="you-won-title ">You won</h6>
          <div className="d-flex align-items-center gap-2">
            <div className="chest-reward-wrapper d-flex align-items-center gap-1 px-2">
              <img src={coin} width={40} height={40} alt="" />
              <span className="chest-reward-amount">
                +{getFormattedNumber(chestReward, 0)}
              </span>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Play;
