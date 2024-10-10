import React from 'react'
import './home.css'
import crazeToken from '../../assets/crazeToken.png'
import telegram from '../../assets/telegram.svg'
import youtube from '../../assets/youtube.svg'
import discord from '../../assets/discord.svg'
import twitter from '../../assets/twitter.svg'
import TaskItem from '../../components/TaskItem/TaskItem'
import { NavLink } from 'react-router-dom'

const Home = () => {

    const tasks = [
        {
            image: twitter,
            title: "Follow [Project Name]",
            reward : "6,000",
        },
        {
            image: telegram,
            title: "Join [Project Name]",
            reward : "6,000",
        },
        {
            image: discord,
            title: "Join [Project Name]",
            reward : "6,000",
        },
        {
            image: youtube,
            title: "Subscribe [Project Name]",
            reward : "6,000",
        },

    ]


  return (
    <div className="container-fluid home-wrapper pt-4 pb-3">
        <div className="score-wrapper d-flex flex-column align-items-center justify-content-end px-3 pb-2 pt-5 w-100 position-relative mt-5">
            <img src={crazeToken} className='home-token' alt="" />
            <h6 className="player-score mb-0">53,534,234</h6>
            <span className="player-mumu">MUMU</span>
        </div>
        <div className="home-info-grid mt-3">
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">12,500,000</h6>
                <span className="home-grid-info">Rewards</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">500,000</h6>
                <span className="home-grid-info">Tasks</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">6,000,000</h6>
                <span className="home-grid-info">Invites</span>
            </div>
        </div>
        <div className="mt-5 d-flex justify-content-center align-items-center w-100">
            <button className="play-button py-2 px-4">Play</button>
        </div>
        <div className="d-flex flex-column gap-2 mt-3">
            <h6 className="home-tasks-title mb-0">Tasks</h6>
            <div className="home-tasks-container px-3 pt-3 pb-4 d-flex flex-column gap-2 position-relative">
               {tasks.map((task, index) => (
                <TaskItem item={task} key={index} />
               ))}            

                <NavLink to={"/tasks"}>
                <button className='show-more-button py-1 px-2'>Show more</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Home