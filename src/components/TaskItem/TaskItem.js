import React from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";

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
          <span
            className="home-task-reward"
            style={{ textDecoration: "none", color: "#B9B3D8" }}
          >
            {item.subtitle}
          </span>
        </div>
      </div>
        <img src={rightArrow} alt="" />
    </a>
  );
};

export default TaskItem;
