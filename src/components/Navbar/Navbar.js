import React from 'react'
import './navbar.css'
import cupIcon from '../../assets/cupIcon.svg'
import cupIconActive from '../../assets/cupIconActive.svg'
import friendsIcon from '../../assets/friendsIcon.svg'
import friendsIconActive from '../../assets/friendsIconActive.svg'
import houseIcon from '../../assets/houseIcon.svg'
import houseIconActive from '../../assets/houseIconActive.svg'
import giftIcon from '../../assets/giftIcon.svg'
import giftIconActive from '../../assets/giftIconActive.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar p-3 w-100'>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${isActive ? 'active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? houseIconActive : houseIcon} width={24} height={24} alt="Home Icon" />
            <span className={`navbar-span ${isActive && "span-active"}`}>Home</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/leaderboard" 
        className={({ isActive }) => 
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${isActive ? 'active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? cupIconActive : cupIcon} width={24} height={24} alt="Cup Icon" />
            <span className={`navbar-span ${isActive && "span-active"}`}>Rank</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/friends" 
        className={({ isActive }) => 
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${isActive ? 'active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? friendsIconActive : friendsIcon} width={24} height={24} alt="Friends Icon" />
            <span className={`navbar-span ${isActive && "span-active"}`}>Friends</span>
          </>
        )}
      </NavLink>
      <NavLink 
        to="/airdrop" 
        className={({ isActive }) => 
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${isActive ? 'active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? giftIconActive : giftIcon} width={24} height={24} alt="Tasks Icon" />
            <span className={`navbar-span ${isActive && "span-active"}`}>Airdrop</span>
          </>
        )}
      </NavLink>
    </div>
  )
}

export default Navbar
