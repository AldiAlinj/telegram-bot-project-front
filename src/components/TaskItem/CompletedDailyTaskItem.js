import React from "react";
import "./taskitem.css";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import coin from "../../assets/dailySession/coin.png";
import check from "../../assets/check.svg";


const CompletedDailyTaskItem = ({ item }) => {
  return (
    <div className={`home-task-item completed-task d-flex flex-column`}>
       {item.banner_url !== "" && (
        <img src={item.banner_url} alt="" className="task-banner" />
      )}
      <div className=" p-2 d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            src={require(`../../assets/${item.partner}.svg`)}
            height={36}
            width={36}
            alt=""
          />
          <div className="d-flex flex-column">
            <span
              className="home-task-name"
              style={{ textDecoration: "none", color: "#46557B" }}
            >
              {item.title.length < 30
                ? item.title
                : item.title?.slice(0, 20) + "..."}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
      <div className="d-flex align-items-center gap-2">
        <div className="completed-reward-wrapper d-flex align-items-center gap-1">
            <img src={coin} width={20} height={20} alt="" />
            <span className="completed-reward-amount">+{getFormattedNumber(item.reward, 0)}</span>
        </div>
      
      </div>
        <img src={check} alt="" />
      </div>
      </div>
    </div>
  );
};

export default CompletedDailyTaskItem;
