import React, { useEffect, useState } from "react";
import DailyTaskItem from "../../components/TaskItem/DailyTaskItem";
// import CompletedDailyTaskItem from "../../components/TaskItem/CompletedDailyTaskItem";

const DailyOpportunities = ({ tasks, completedTasks, handleCompleteTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [social, setSocial] = useState("twitter");

  const socials = ["Twitter", "Telegram", "Instagram", "Youtube"];

  const dailyOpportunities = tasks.filter(
    (item) => item.partner === "daily-opportunities"
  );

  useEffect(() => {
    setFilteredTasks(dailyOpportunities);
  }, [dailyOpportunities]);

  const filterTasks = (filter) => {
    setSocial(filter);
    setFilteredTasks(dailyOpportunities.filter((item) => item.type === filter));
  };

  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2 ">
        <h6 className="home-tasks-title mb-0">Daily Opportunities</h6>
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
        <div className="home-tasks-container d-flex flex-column gap-2 position-relative">
          {filteredTasks.map((task, index) => (
            <DailyTaskItem
              item={task}
              key={index}
              handleCompleteTask={handleCompleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyOpportunities;
