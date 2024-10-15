import React, { useEffect } from "react";
import "./friends.css";
import wodToken from "../../assets/wodToken.svg";

const Friends = ({referredUsers, referralCode}) => {
 


  const appLink = "https://t.me/AldiTestBot_bot/AldiTestBot"



  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <div className="container-fluid friends-wrapper d-flex flex-column justify-content-between pt-4 pb-3">
      <div className="d-flex flex-column align-items-center gap-3">
      <div className="d-flex wod-friends-wrapper w-100 justify-content-center ">
        <img src={wodToken} alt="" className="wod-friends" />
      </div>
      <h1 className="invite-friends-title mb-0">
        Invite friends and get more WOD
      </h1>
      <button className="invite-friends-button py-3" style={{textDecoration: "none"}}>
        <a href={`https://t.me/share/url?url=${appLink}?startapp=${referralCode}`} style={{textDecoration: "none"}}>Invite Friends</a>
     </button>
      </div>
      {referredUsers.length > 0 &&
      <>
      <h6 className="friends-list-title mb-0 my-3">
        {referredUsers.length} Friends
      </h6>
        <div className="d-flex flex-column friends-list-wrapper">
          {referredUsers.map((friend, index) => (
            <div className="friend-item p-1 d-flex align-items-center justify-content-between" key={index}>
                <div className="d-flex align-items-center gap-2">
              <div className="friend-initial-wrapper">
                <span className="friend-initial">{friend.telegramUsername.slice(0, 1)}</span>
              </div>
                  <span className="friend-name">{friend.telegramUsername}</span>
                </div>
                <span className="friend-reward">+{friend.earnedPoints} WOD</span>
            </div>
          ))}
        </div>
      </>
      }
    </div>
  );
};

export default Friends;
