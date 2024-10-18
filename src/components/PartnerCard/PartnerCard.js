import React from "react";
import "./partnercard.css";
import { NavLink } from "react-router-dom";
import dummyPartner from "../../assets/earnAssets/dummyPartner.png";
import CircularProgress from "../CircularProgress/CircularProgress";
import rightArrow from "../../assets/rightArrow.svg";
import coin from "../../assets/dailySession/coin.png";
import getFormattedNumber from "../../hooks/getFormattedNumber";

const PartnerCard = ({ item }) => {
  return (
    <NavLink
      to={`/earn/${item.id}`}
      className={`partner-card ${
        item.completed === 100 && "partner-completed"
      } d-flex align-items-center justify-content-between w-100 p-3`}
    >
      <div className="d-flex align-items-center gap-2">
        {item.image ? (
          <img
            src={require(`../../assets/earnAssets/${item.image}.svg`)}
            width={36}
            height={36}
            alt={item.image}
          />
        ) : (
          <img src={dummyPartner} alt="dummy partner" />
        )}
        <span className="partner-title">{item.title}</span>
      </div>
      {item.completed < 100 ? (
        <div className="d-flex align-items-center gap-2">
          <CircularProgress value={item.completed} />
          <img src={rightArrow} alt="" />
        </div>
      ) : (
        <div className="partner-reward-wrapper d-flex align-items-center gap-1">
          <img src={coin} width={20} height={20} alt="" />
          <span className="partner-reward-amount">
            +{getFormattedNumber(item.reward, 0)}
          </span>
        </div>
      )}
    </NavLink>
  );
};

export default PartnerCard;
