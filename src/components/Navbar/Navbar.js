import React from "react";
import "./navbar.css";
import cupIcon from "../../assets/cupIcon.svg";
import cupIconActive from "../../assets/cupIconActive.svg";
import friendsIcon from "../../assets/friendsIcon.svg";
import friendsIconActive from "../../assets/friendsIconActive.svg";
import houseIcon from "../../assets/houseIcon.svg";
import houseIconActive from "../../assets/houseIconActive.svg";
import taskIcon from "../../assets/taskIcon.svg";
import taskIconActive from "../../assets/taskIconActive.svg";
import gameIcon from "../../assets/gameIcon.svg";
import gameIconActive from "../../assets/gameIconActive.svg";
import giftIcon from "../../assets/giftIcon.svg";
import { NavLink } from "react-router-dom";

const Navbar = ({showAirdrop}) => {
  return (
    <div className="navbar px-3 py-0 w-100">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? houseIconActive : houseIcon}
              width={24}
              height={24}
              alt="Home Icon"
            />
            <span className={`navbar-span ${isActive && "span-active"}`}>
              Home
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="/play"
        className={({ isActive }) =>
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? gameIconActive : gameIcon}
              width={24}
              height={24}
              alt="Game Icon"
            />
            <span className={`navbar-span ${isActive && "span-active"}`}>
              Game
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="/earn"
        className={({ isActive }) =>
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? taskIconActive : taskIcon}
              width={24}
              height={24}
              alt="Task Icon"
            />
            <span className={`navbar-span ${isActive && "span-active"}`}>
              Earn
            </span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/leaderboard"
        className={({ isActive }) =>
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? cupIconActive : cupIcon}
              width={24}
              height={24}
              alt="Cup Icon"
            />
            <span className={`navbar-span ${isActive && "span-active"}`}>
              Rank
            </span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) =>
          `navbar-item p-2 d-flex flex-column align-items-center justify-content-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? friendsIconActive : friendsIcon}
              width={24}
              height={24}
              alt="Friends Icon"
            />
            <span className={`navbar-span ${isActive && "span-active"}`}>
              Friends
            </span>
          </>
        )}
      </NavLink>
      <div className="navbar-item p-2 d-flex flex-column align-items-center justify-content-center" style={{cursor: "pointer"}} onClick={showAirdrop}>
        <img src={giftIcon} width={24} height={24} alt="Tasks Icon" />
        <span className={`navbar-span`}>Airdrop</span>
      </div>
    </div>
  );
};

export default Navbar;
