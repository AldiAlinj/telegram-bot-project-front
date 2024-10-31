import React, { useState } from "react";
import "./getstarted.css";
import getStartedWod from '../../assets/getStartedWod.png'

const GetStarted = ({ showWelcome, onClose }) => {

  const [isClicked, setIsClicked] = useState(false);


  const handleClose = () => {
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
        onClose()
      }, 200); 
  
  };

  return (
    <div
      className={`get-started-wrapper ${
        !showWelcome && "hide-start"
      } p-4 d-flex flex-column justify-content-between`}
    >
      <div className="d-flex w-100 justify-content-center get-started-logo-wrapper">
        <img src={getStartedWod} className="w-50 position-relative"  alt="" />
      </div>
      <div className="d-flex flex-column gap-3">
        <h1 className="get-started-title mb-0">
          eeeeeeWelcome to <br /> World of Dypians Mini App!
        </h1>
        <p className="get-started-desc mb-3">
          Play, Learn, and Explore with Exciting Tasks!
        </p>
        <button className={`get-started-button ${isClicked ? "animate-colors" : ""} py-3 mb-3`} onClick={handleClose}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
