import React, { useEffect, useState } from "react";
import "./play.css";
import Countdown from "react-countdown";
import ChestSlider from "../../components/ChestSlider/ChestSlider";


const renderer = ({ hours, minutes }) => {
  return (
    <span className="time-left">
      {hours}:{minutes}
    </span>
  );
};


const Play = ({ openHourlyChest, chestTimeStamp, canClaimHourly, setCanClaimHourly, loadingChest }) => {
  const [disableAll, setDisableAll] = useState(false);

  const onClaim = () => {
    openHourlyChest();
    setDisableAll(true);
    if (chestTimeStamp !== null) {
      setDisableAll(false);
    }
  };

  useEffect(() => {
    setDisableAll(true);
    if (chestTimeStamp !== null) {
      setDisableAll(false);
    }
  }, [chestTimeStamp, openHourlyChest]);

  return (
    <div className="container-fluid play-wrapper d-flex flex-column justify-content-between p-0">
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 inner-play-banner`}
      >
        <ChestSlider onClaim={onClaim} canClaimHourly={canClaimHourly} />
        {!disableAll && (
          <button
            className={`play-button ${
              !canClaimHourly || loadingChest ? "play-button-disabled" : ""
            }  py-2 px-4`}
            disabled={!canClaimHourly || loadingChest}
          >
            {loadingChest ? (
              <div
                class="spinner-border spinner-border-sm text-info"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : canClaimHourly ? (
              "Ready to Claim"
            ) : (
              <Countdown
                renderer={renderer}
                date={chestTimeStamp}
                onComplete={() => {
                  setCanClaimHourly(true);
                }}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Play;
