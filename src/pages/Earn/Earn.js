import React from "react";
import { NavLink } from "react-router-dom";
import "./earn.css";
import TaskItem from "../../components/TaskItem/TaskItem";
import CompletedTaskItem from "../../components/TaskItem/CompletedTaskItem";

const Earn = ({ tasks, jwt, completedTasks, handleCompleteTask }) => {
  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2 ">
        <h6 className="home-tasks-title mb-0">Earn</h6>
        <div className="home-tasks-container d-flex flex-column gap-2 position-relative">
          {tasks.map((task, index) => (
            <TaskItem item={task} key={index} jwt={jwt} handleCompleteTask={handleCompleteTask} />
          ))}
          {completedTasks.map((task, index) => (
            <CompletedTaskItem item={task} key={index} />
          ))}

          <NavLink to={"/earn"}></NavLink>
        </div>
      </div>
    </div>
  );
};

export default Earn;
