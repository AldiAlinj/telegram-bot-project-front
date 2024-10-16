import React from "react";
import "./taskitem.css";
import rightArrow from "../../assets/rightArrow.svg";
import check from "../../assets/check.svg";
import axios from "axios";

const TaskItem = ({ item, jwt}) => {
  // const [check, setCheck] = useState(false)

  const handleCompleteTask = async (taskId) => {
    let body = {
      token: jwt,
      taskId: taskId,
    };

    try {
      const res = await axios.post(
        `https://api.worldofdypians.com/api/complete-task`,
        body
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      onClick={() => handleCompleteTask(item._id)}
      className={`home-task-item ${
        item.completed && "completed-task"
      } p-2 d-flex w-100 align-items-center justify-content-between`}
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
      {item.completed ? (
        <img src={check} alt="" />
      ) : (
        <img src={rightArrow} alt="" />
      )}
    </a>
  );
};

export default TaskItem;
