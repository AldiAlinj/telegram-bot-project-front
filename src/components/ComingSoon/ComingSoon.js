import React, { useState } from "react";
import "./comingsoon.css";
import OutsideClickHandler from "react-outside-click-handler";
import airdropBox from "../../assets/airdropBox.svg";
import tooltip from "../../assets/tooltip.svg";

const ComingSoon = ({ show, onClose }) => {
  const [tooltipInfo, setTooltipInfo] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className={`coming-soon-wrapper p-3 d-flex flex-column align-items-center justify-content-center gap-4 ${
          show && "coming-soon-active"
        }`}
      >
        <div className="d-flex flex-column h-100 w-100 align-items-center justify-content-center position-relative gap-2">
          <div className="coming-soon-tooltip-position">
            <div className="position-relative d-flex align-items-center justify-content-center">
              <img
                src={tooltip}
                width={20}
                height={20}
                style={{ cursor: "pointer" }}
                alt=""
                onClick={() => setTooltipInfo(true)}
              />
              <OutsideClickHandler onOutsideClick={() => setTooltipInfo(false)}>
                <div
                  className={`coin-tooltip-content-wrapper ${
                    tooltipInfo && "coin-tooltip-active"
                  }`}
                >
                  <span>
                    Airdrop: The Airdrop is set to deliver unique rewards from
                    partner networks, including exclusive tokens, assets, and
                    more, all directly accessible through the World of Dypians Mini App.
                  </span>
                </div>
              </OutsideClickHandler>
            </div>
          </div>
          <img src={airdropBox} alt="" />
          <h6 className="coming-soon-title mb-0">Coming Soon</h6>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default ComingSoon;
