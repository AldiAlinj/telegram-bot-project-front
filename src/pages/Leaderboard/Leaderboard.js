import React, { useEffect } from 'react'
import './leaderboard.css'

const Leaderboard = () => {

  const dummyArray = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));


  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="container-fluid leaderboard-wrapper pt-4 pb-3">
      <div className="d-flex flex-column gap-2">
        <h6 className="leaderboard-main-title">Wall of Fame</h6>
        <div className="user-leaderboard-rank w-100 d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
            <div className="name-holder d-flex align-items-center justify-content-center" style={{background:"#4E8046"}}>
              <span className="name-initial">L</span>
            </div>
              <div className="d-flex flex-column">
                <h6 className="player-name mb-0" style={{color:"#4E8046"}}>Lorena579</h6>
                <span className="player-mumu-amount" style={{color:"#4E8046"}}>126,000 MUMU</span>
              </div>
          </div>
          <span className="player-rank" style={{color:"#4E8046"}}>#250,762</span>
        </div>
        <div className="d-flex mt-3 align-items-bottom justify-content-between">
          <h6 className="mb-0 mumu-total-holders">51,632,343 Holders</h6>
          <span className="top-100">(Top 100)</span>
        </div>
        <div className="players-leaderboard d-flex flex-column">
          {dummyArray.map((item, index) => (
            <div key={index} className="leaderboard-item d-flex align-items-center justify-content-between p-3">
              <div className="d-flex align-items-center gap-2">
            <div className="name-holder d-flex align-items-center justify-content-center">
              <span className="name-initial">L</span>
            </div>
              <div className="d-flex flex-column">
                <h6 className="player-name mb-0">Lorena579</h6>
                <span className="player-mumu-amount">126,000 MUMU</span>
              </div>
          </div>
          <span className="player-rank">#{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
</div>
  )
}

export default Leaderboard