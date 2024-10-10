import React from 'react'
import './getstarted.css'
import craze from '../../assets/craze.png'

const GetStarted = ({showWelcome,
    onClose}) => {
  return (
    <div className={`get-started-wrapper ${!showWelcome && "hide-start"} p-4 d-flex flex-column justify-content-end`}>
        <img src={craze} alt="craze" className="welcome-craze" />
        <div className="d-flex flex-column gap-3">
            <h1 className="get-started-title mb-0">Welcome to FarmCraze!</h1>
            <p className="get-started-desc mb-0">Play, Learn, and Explore with Exciting
            Quizzes!</p>
            <button className="get-started-button py-3" onClick={onClose}>Get Started</button>
        </div>
    </div>
  )
}

export default GetStarted