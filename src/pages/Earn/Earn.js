import React from "react";
import { NavLink } from "react-router-dom";
import "./earn.css";

import sandTimer from "../../assets/earnAssets/sandTimer.png";
// import PartnerCard from "../../components/PartnerCard/PartnerCard";
import TaskItem from "../../components/TaskItem/TaskItem";
import CompletedTaskItem from "../../components/TaskItem/CompletedTaskItem";

const Earn = ({tasks, completedTasks, handleCompleteTask}) => {

  const homeTasks = tasks.filter((item) => item.partner === "world-of-dypians");


  // const partners = [
  //   {
  //     title: "World of Dypians",
  //     id: "world-of-dypians",
  //     completed: 81,
  //     image: "wodToken",
  //     reward: 250000,
  //   },
  //   {
  //     title: "Dypius",
  //     id: "dypius",
  //     completed: 60,
  //     image: "dypius",
  //     reward: 250000,
  //   },
  //   {
  //     title: "OpenFlux",
  //     id: "openflux",
  //     completed: 42,
  //     image: "openflux",
  //     reward: 250000,
  //   },
  //   {
  //     title: "Partner 1",
  //     id: "partner-1",
  //     completed: 35,
  //     image: null,
  //     reward: 250000,
  //   },
  //   {
  //     title: "Partner 2",
  //     id: "partner-2",
  //     completed: 18,
  //     image: null,
  //     reward: 250000,
  //   },
  //   {
  //     title: "Partner 3",
  //     id: "partner-3",
  //     completed: 100,
  //     image: null,
  //     reward: 250000,
  //   },
  //   {
  //     title: "Partner 4",
  //     id: "partner-4",
  //     completed: 100,
  //     image: null,
  //     reward: 250000,
  //   },
  // ];

  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2 ">
        <h6 className="home-tasks-title mb-0">Earn</h6>
        <NavLink
          to={"/earn/daily-opportunities"}
          className={`daily-opportunities-wrapper p-3 d-flex w-100 justify-content-between align-items-center mb-4`}
        >
          <span className="daily-opportunities-title" style={{fontSize: "18px"}}>Daily Opportunities</span>
          <img src={sandTimer} alt="" />
        </NavLink>
        <h6 className="home-tasks-title mb-0">Tasks</h6>
        <div className="home-tasks-container mb-3 d-flex flex-column gap-2 position-relative">
          {homeTasks.map((task, index) => (
            <TaskItem
              item={task}
              key={index}
              handleCompleteTask={handleCompleteTask}
            />
          ))}
          {completedTasks.map((task, index) => (
            <CompletedTaskItem item={task} key={index} />
          ))}
        </div>
        <h6 className="home-tasks-title mb-0">Partner Tasks</h6>

        <div className="d-flex earn-partners-wrapper flex-column gap-2">
          {/* {partners.map((item, index) => (
            <PartnerCard key={index} item={item} />
          ))} */}
           <div className="d-flex w-100 align-items-center justify-content-center  flex-column mt-5">
                <h6 className="empty-title">Partner tasks are coming soon</h6>
                <h6 className="empty-title">Stay tuned!</h6>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
