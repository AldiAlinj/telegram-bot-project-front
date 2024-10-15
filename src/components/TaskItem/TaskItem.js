import React from 'react'
import './taskitem.css'
import rightArrow from '../../assets/rightArrow.svg'

const TaskItem = ({item}) => {
  return (
    <div className="home-task-item p-2 d-flex w-100 align-items-center justify-content-between">
    <div className="d-flex align-items-center gap-2">
        <img src={item.image} height={36} width={36} alt="" />
        <div className="d-flex flex-column">
            <span className="home-task-name">{item.title}</span>
            <span className="home-task-reward">Earn {item.reward} WOD</span>
        </div>
    </div>
    <img src={rightArrow} alt="" />
    </div>
  )
}

export default TaskItem