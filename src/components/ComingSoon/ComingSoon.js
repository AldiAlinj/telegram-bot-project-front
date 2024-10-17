import React from "react";
import "./comingsoon.css";
import OutsideClickHandler from 'react-outside-click-handler';
import airdropBox from '../../assets/airdropBox.svg'

const ComingSoon = ({show, onClose}) => {
  return (
   <OutsideClickHandler onOutsideClick={onClose}>
     <div className={`coming-soon-wrapper p-3 d-flex flex-column align-items-center justify-content-center gap-4 ${show && "coming-soon-active"}`}>
      <div className="d-flex flex-column align-items-center gap-2">
        <img src={airdropBox} alt="" />
        <h6 className="coming-soon-title mb-0">Coming Soon</h6>
      </div>
    </div>
   </OutsideClickHandler>
  );
};

export default ComingSoon;
