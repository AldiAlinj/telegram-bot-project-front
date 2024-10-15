import React from 'react'
import { NavLink } from 'react-router-dom'
import './earn.css'
import TaskItem from '../../components/TaskItem/TaskItem'
import telegram from '../../assets/telegram.svg'
import youtube from '../../assets/youtube.svg'
import discord from '../../assets/discord.svg'
import twitter from '../../assets/twitter.svg'


const Earn = () => {

  const tasks = [
    {
        image: twitter,
        title: "Follow [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: telegram,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: discord,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: youtube,
        title: "Subscribe [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: twitter,
        title: "Follow [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: telegram,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: discord,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: youtube,
        title: "Subscribe [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: twitter,
        title: "Follow [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: telegram,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: discord,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: youtube,
        title: "Subscribe [Project Name]",
        reward : "6,000",
        completed: false,
    },
    {
        image: twitter,
        title: "Follow [Project Name]",
        reward : "6,000",
        completed: true,
    },
    {
        image: telegram,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: true,
    },
    {
        image: discord,
        title: "Join [Project Name]",
        reward : "6,000",
        completed: true,
    },
    {
        image: youtube,
        title: "Subscribe [Project Name]",
        reward : "6,000",
        completed: true,
    },

]

  return (
    <div className="container-fluid earn-wrapper pt-4 pb-3">
    <div className="d-flex flex-column gap-2 ">
            <h6 className="home-tasks-title mb-0">Earn</h6>
            <div className="home-tasks-container d-flex flex-column gap-2 position-relative">
               {tasks.map((task, index) => (
                <TaskItem item={task} key={index} />
               ))}            

                <NavLink to={"/earn"}>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Earn