import React from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import coin from '../../assets/dailySession/coin.png'

const TaskItem = ({ item, handleCompleteTask }) => {


  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      onClick={() => handleCompleteTask(item._id)}
      style={{ textDecoration: "none" }}
      className={`home-task-item p-2 d-flex w-100 align-items-center justify-content-between`}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src={require(`../../assets/${item.type}.svg`)}
          height={36}
          width={36}
          alt=""
        />
        <div className="d-flex flex-column">
          <span
            className="home-task-name"
            style={{ textDecoration: "none", color: "#46557B" }}
          >
            {item.title}
          </span>
         
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="task-reward-wrapper d-flex align-items-center gap-1">
            <img src={coin} width={20} height={20} alt="" />
            <span className="task-reward-amount">+{getFormattedNumber(item.reward, 0)}</span>
        </div>
      
      </div>
        <img src={rightArrow} alt="" />
    </a>
  );
};

export default TaskItem;
