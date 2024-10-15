import React, { useEffect } from "react";
import "./friends.css";
import wodToken from "../../assets/wodToken.svg";

const Friends = () => {
  const dummyFriends = [
    {
      name: "Lorena579",
      reward: "1,200"
    },
    {
      name: "AldiPogradec69",
      reward: "220"
    },
    {
      name: "Tekooo",
      reward: "650"
    },
    {
      name: "Bekuu28",
      reward: "265"
    },
    {
      name: "Bekuu28",
      reward: "265"
    },
    {
      name: "Bekuu28",
      reward: "265"
    },
    {
      name: "Bekuu28",
      reward: "265"
    },
  ];


  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <div className="container-fluid friends-wrapper d-flex flex-column justify-content-between pt-4 pb-5">
      <div className="d-flex wod-friends-wrapper w-100 justify-content-center mt-5">
        <img src={wodToken} alt="" className="wod-friends" />
      </div>
      <h1 className="invite-friends-title mb-0">
        Invite friends and get more WOD
      </h1>
      <button className="invite-friends-button py-3">Invite Friends</button>
      {dummyFriends.length > 0 &&
      <>
      <h6 className="friends-list-title mb-0 my-3">
        {dummyFriends.length} Friends
      </h6>
        <div className="d-flex flex-column friends-list-wrapper">
          {dummyFriends.map((friend, index) => (
            <div className="friend-item p-1 d-flex align-items-center justify-content-between" key={index}>
                <div className="d-flex align-items-center gap-2">
              <div className="friend-initial-wrapper">
                <span className="friend-initial">{friend.name.slice(0, 1)}</span>
              </div>
                  <span className="friend-name">{friend.name}</span>
                </div>
                <span className="friend-reward">+{friend.reward} WOD</span>
            </div>
          ))}
        </div>
      </>
      }
    </div>
  );
};

export default Friends;
