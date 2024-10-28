import React, { useEffect, useState } from "react";
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
        toast.error("You have not completed the task!", {
          className: "custom-toast",
          progressClassName: "custom-progress",
        });
      }
    }, 4000);
  };

  useEffect(() => {
    if (item.type === "telegram") {
      setCheck(true);
    }
  }, [item]);

  const handleRedirect = (url) => {
    window.Telegram.WebApp.openLink(url);
  };

  return (
    <div className="d-flex flex-column" style={{ cursor: "pointer" }}>
      <div
        style={{
          textDecoration: "none",
          pointerEvents: loading ? "none" : "auto",
        }}
        className={`home-task-item p-2 d-flex w-100 align-items-center justify-content-between`}
      >
        <div
          className="d-flex align-items-center gap-2"
          onClick={() => {
            handleRedirect(item.link);
            setCheck(true);
          }}
        >
          <div className="position-relative">
            <img
              src={require(`../../assets/${item.partner}.svg`)}
              height={36}
              width={36}
              alt=""
            />
            <img
              src={require(`../../assets/${item.type}.svg`)}
              alt=""
              className="type-icon"
            />
          </div>
          <div className="d-flex flex-column gap-2 ps-3">
            <span
              className="home-task-name"
              style={{ textDecoration: "none", color: "#46557B" }}
            >
              {item.title.length < 30
                ? item.title
                : item.title?.slice(0, 20) + "..."}
            </span>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <div className="task-reward-wrapper d-flex align-items-center gap-1">
                  <img src={coin} width={20} height={20} alt="" />
                  <span className="task-reward-amount">
                    +{getFormattedNumber(item.reward, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div class="spinner-border spinner-border-sm text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <div
              className="check-button d-flex align-items-center py-1 gap-1 px-2"
           
              onClick={() => completeTask(item._id)}
            >
              <span className="check-task">Check</span>
            </div>
            <img src={rightArrow} alt="rightarrow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
