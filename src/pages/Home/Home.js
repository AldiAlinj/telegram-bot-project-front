import React, { useEffect } from 'react'
import './home.css'
import wodToken from '../../assets/wodToken.svg'
// import telegram from '../../assets/telegram.svg'
// import youtube from '../../assets/youtube.svg'
// import discord from '../../assets/discord.svg'
// import twitter from '../../assets/twitter.svg'
import TaskItem from '../../components/TaskItem/TaskItem'
import { NavLink } from 'react-router-dom'
import playBanner from '../../assets/playBanner.png'
import getFormattedNumber from '../../hooks/getFormattedNumber'

const Home = ({username, tasks, userData, jwt, handleCompleteTask}) => {

   

    
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="container-fluid home-wrapper pt-4 pb-3">
        <span className="hello-user">Hello, {username}!</span>
        <div className="score-wrapper d-flex flex-column align-items-center justify-content-end px-3 pb-2 pt-5 w-100 position-relative mt-5">
            <img src={wodToken} className='home-token' alt="" />
            <h6 className="player-score mb-0">{getFormattedNumber(userData.totalPoints, 0)}</h6>
            <span className="player-wod">WOD</span>
        </div>
        <div className="home-info-grid mt-3">
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">{getFormattedNumber(userData.streakPoints + userData.chestsPoints, 0)}</h6>
                <span className="home-grid-info">Rewards</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">{getFormattedNumber(userData.tasksPoints, 0)}</h6>
                <span className="home-grid-info">Tasks</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column  py-3  justify-content-center align-items-center gap-1">
                <h6 className="home-grid-value mb-0">6,000,000</h6>
                <span className="home-grid-info">Invites</span>
            </div>
        </div>
        <div className="d-flex flex-column mt-3 mb-5 play-banner-wrapper">
            <img src={playBanner} alt="" style={{borderRadius: "10px"}} />
            <button className="play-button py-2 px-4">Play</button>
        </div>
        <div className="d-flex flex-column gap-2 mt-3">
            <h6 className="home-tasks-title mb-0">Earn</h6>
            <div className="home-tasks-container d-flex flex-column gap-2 position-relative mb-4">
               {tasks.map((task, index) => (
                <TaskItem item={task} key={index} handleCompleteTask={handleCompleteTask} />
               ))}            

                <NavLink to={"/earn"}>
                <button className='show-more-button py-1 px-2'>Show more</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Home