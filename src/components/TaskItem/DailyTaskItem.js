import React, { useState } from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import coin from "../../assets/dailySession/coin.png";

const DailyTaskItem = ({ item, handleCompleteTask }) => {
  const [loading, setLoading] = useState(false);

  const completeTask = (id) => {
    setLoading(true);
    setTimeout(() => {
      handleCompleteTask(id);
      setLoading(false);
    }, 4000);
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      onClick={() => completeTask(item._id)}
      style={{
        textDecoration: "none",
        pointerEvents: loading ? "none" : "auto",
      }}
      className={`home-task-item d-flex flex-column`}
    >
      {item.banner_url !== "" && (
        <img src={item.banner_url} alt="" className="task-banner" />
      )}
      <div className=" p-2 d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            src={require(`../../assets/world-of-dypians.svg`).default}
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
        {loading ? (
          <div class="spinner-border spinner-border-sm text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <div className="task-reward-wrapper d-flex align-items-center gap-1">
                <img src={coin} width={20} height={20} alt="" />
                <span className="task-reward-amount">
                  +{getFormattedNumber(item.reward, 0)}
                </span>
              </div>
            </div>
            <img src={rightArrow} alt="rightarrow" />
          </div>
        )}
      </div>
    </a>
  );
};

export default DailyTaskItem;
