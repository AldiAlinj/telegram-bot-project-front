import React, { useEffect } from "react";
import "./play.css";
import ChestSlider from "../../components/ChestSlider/ChestSlider";



const Play = ({
  openHourlyChest,
  chestTimeStamp,
  canClaimHourly,
  setCanClaimHourly,
  loadingChest,
  chestReward,
  setLoadingChest,
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
          className={`d-flex flex-column align-items-center justify-content-center gap-3 inner-play-banner position-relative`}
        >
     
          <ChestSlider
            onClaim={onClaim}
            canClaimHourly={canClaimHourly}
            reward={chestReward}
            loadingChest={loadingChest}
            setLoadingChest={setLoadingChest}
            chestTimeStamp={chestTimeStamp}
            setCanClaimHourly={setCanClaimHourly}
          />
          
        </div>
      </div>
    </>
  );
};

export default Play;
