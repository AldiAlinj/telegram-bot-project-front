import React from "react";
import "./getstarted.css";

const GetStarted = ({ showWelcome, onClose }) => {
  return (
    <div
      className={`get-started-wrapper ${
        !showWelcome && "hide-start"
      } p-4 d-flex flex-column justify-content-end`}
    >
      <div className="d-flex flex-column gap-3">
        <h1 className="get-started-title mb-0">
          Welcome to <br /> World of Dypians!
        </h1>
        <p className="get-started-desc mb-3">
          Play, Learn, and Explore with Exciting Tasks!
        </p>
        <button className="get-started-button py-3 mb-3" onClick={onClose}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
