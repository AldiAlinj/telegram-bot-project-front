import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CompletedTaskItem from '../../components/TaskItem/CompletedTaskItem';
import TaskItem from '../../components/TaskItem/TaskItem';
import { NavLink } from 'react-router-dom';
import backArrow from '../../assets/backArrow.svg';

const EarnPartner = ({tasks, completedTasks, handleCompleteTask}) => {

const {partnerId} = useParams()
function convertString(str) {
  return str
    .split('-') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const [filteredTasks, setFilteredTasks] = useState([])
const [filteredCompleted, setFilteredCompleted] = useState([])

useEffect(() => {
 setFilteredTasks(tasks.filter(item => item.partner === partnerId))
 setFilteredCompleted(completedTasks.filter(item => item.partner === partnerId))
}, [completedTasks, tasks, partnerId])




  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
    <div className="d-flex flex-column gap-2 ">
      <div className="d-flex w-100 align-items-center justify-content-between">
      <h6 className="home-tasks-title mb-0">{convertString(partnerId)}</h6>
    <NavLink to={"/earn"} className={"d-flex align-items-center gap-1"}>
<img src={backArrow}  alt="" />
    
    </NavLink>
      </div>
      <div className="home-tasks-container d-flex flex-column gap-2 position-relative">
        {filteredTasks.map((task, index) => (
          <TaskItem item={task} key={index}  handleCompleteTask={handleCompleteTask} />
        ))}
        {filteredCompleted.map((task, index) => (
          <CompletedTaskItem item={task} key={index} />
        ))}

      
      </div>
  
    </div>
  </div>
  )
}

export default EarnPartner