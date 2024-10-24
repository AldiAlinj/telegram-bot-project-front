import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CompletedTaskItem from "../../components/TaskItem/CompletedTaskItem";
import TaskItem from "../../components/TaskItem/TaskItem";
import DailyTaskItem from "../../components/TaskItem/DailyTaskItem";
// import CompletedDailyTaskItem from "../../components/TaskItem/CompletedDailyTaskItem";

const EarnPartner = ({ tasks, completedTasks, handleCompleteTask }) => {
  const { partnerId } = useParams();
  function convertString(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);
  const [social, setSocial] = useState("twitter");

  const socials = ["Twitter", "Telegram", "Instagram", "Youtube"];

  useEffect(() => {
    setFilteredTasks(tasks.filter((item) => item.partner === partnerId));
    setFilteredCompleted(
      completedTasks.filter((item) => item.partner === partnerId)
    );
  }, [completedTasks, tasks, partnerId]);


  const filterTasks = (filter) => {
    setSocial(filter)
    setFilteredTasks(filteredTasks.filter((item) => item.type === filter));

  }


  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2 ">
        <h6 className="home-tasks-title mb-0">{convertString(partnerId)}</h6>
        {partnerId === "daily-opportunities" && (
          <div className="daily-socials-grid">
            {socials.map((item, index) => (
              <div
                className={`daily-social-item ${
                  social === item.toLowerCase() && "social-selected"
                } p-2 d-flex align-items-center gap-2`}
                key={index}
                onClick={() => filterTasks(item.toLowerCase())}
              >
                <img
                  src={require(`../../assets/${item.toLowerCase()}.svg`)}
                  width={20}
                  height={20}
                  alt=""
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
        <div className="home-tasks-container d-flex flex-column gap-2 position-relative">
          {partnerId === "daily-opportunities" ? (
            <>
              {filteredTasks.map((task, index) => (
                <DailyTaskItem
                  item={task}
                  key={index}
                  handleCompleteTask={handleCompleteTask}
                />
              ))}
              {/* {filteredCompleted.map((task, index) => (
                <CompletedDailyTaskItem item={task} key={index} />
              ))} */}
            </>
          ) : (
            <>
              {filteredTasks.map((task, index) => (
                <TaskItem
                  item={task}
                  key={index}
                  handleCompleteTask={handleCompleteTask}
                />
              ))}
              {filteredCompleted.map((task, index) => (
                <CompletedTaskItem item={task} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarnPartner;
