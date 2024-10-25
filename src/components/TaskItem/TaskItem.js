import React, { useState } from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import coin from "../../assets/dailySession/coin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskItem = ({ item, handleCompleteTask }) => {
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const completeTask = (id) => {
    setLoading(true);
    setTimeout(() => {
      if (check) {
        handleCompleteTask(id);
        setLoading(false);
      } else {
        setLoading(false);
        toast("You have not completed the task!", {
          className: "custom-toast",
          progressClassName: "custom-progress",
        });
      }
    }, 4000);
  };

  const handleRedirect = (url) => {
    window.Telegram.WebApp.openLink(url);
  };

  return (
    <div className="d-flex flex-column">
      <div
        onClick={() => {
          handleRedirect(item.link);
          setCheck(true);
        }}
        style={{
          textDecoration: "none",
          pointerEvents: loading ? "none" : "auto",
        }}
        className={`home-task-item p-2 d-flex w-100 align-items-center justify-content-between`}
      >
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
      <div
        className="completed-reward-wrapper d-flex align-items-center p-1 gap-1 mt-1"
        style={{
          width: "fit-content",
          cursor: "pointer",
          background: "#5690ff",
        }}
        onClick={() => completeTask(item._id)}
      >
        <span className="check-task">Check</span>
      </div>
  
    </div>
  );
};

export default TaskItem;
