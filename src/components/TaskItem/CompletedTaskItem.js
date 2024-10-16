import React from "react";
import check from "../../assets/check.svg";
import getFormattedNumber from "../../hooks/getFormattedNumber";

const CompletedTaskItem = ({ item }) => {
  return (
    <div
      className={`home-task-item completed-task p-2 d-flex w-100 align-items-center justify-content-between`}
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
            Reward: {getFormattedNumber(item.reward, 0)} points
          </span>
        </div>
      </div>
      <img src={check} alt="" />
    </div>
  );
};

export default CompletedTaskItem;
