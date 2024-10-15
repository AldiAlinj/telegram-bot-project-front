import React from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";
import check from "../../assets/check.svg";

const TaskItem = ({ item }) => {
  return (
    <a
    href={item.link}
      className={`home-task-item ${
        item.completed && "completed-task"
      } p-2 d-flex w-100 align-items-center justify-content-between`}
    >
      <div className="d-flex align-items-center gap-2">
        <img src={require(`../../assets/${item.type}.svg`)} height={36} width={36} alt="" />
        <div className="d-flex flex-column">
          <span className="home-task-name">{item.title}</span>
          <span className="home-task-reward">{item.subtitle}</span>
        </div>
      </div>
      {item.completed ? (
        <img src={check} alt="" />
      ) : (
        <img src={rightArrow} alt="" />
      )}
    </a>
  );
};

export default TaskItem;
