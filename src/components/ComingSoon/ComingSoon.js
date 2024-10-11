import React from "react";
import "./comingsoon.css";
import OutsideClickHandler from 'react-outside-click-handler';

const ComingSoon = ({show, onClose}) => {
  return (
   <OutsideClickHandler onOutsideClick={onClose}>
     <div className={`coming-soon-wrapper p-3 d-flex flex-column align-items-center justify-content-center gap-4 ${show && "coming-soon-active"}`}>
      <div className="d-flex flex-column align-items-center gap-2">
        <h6 className="coming-soon-title mb-0">Airdrop coming soon.</h6>
        <h6 className="coming-soon-title mb-0">Stay Tuned!</h6>
      </div>
      <button className="coming-soon-button py-2" onClick={onClose}>Close</button>
    </div>
   </OutsideClickHandler>
  );
};

export default ComingSoon;
