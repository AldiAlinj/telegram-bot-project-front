import React, { useEffect } from "react";
import giftBox from '../../assets/giftBox.png';
import "./friends.css";

const Friends = ({referredUsers, referralCode}) => {
 

  // const dummyFriends = [
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Aldi",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Nitu",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Gazi",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //   },

  // ]

  const appLink = "https://t.me/AldiTestBot_bot/AldiTestBot"
  // const referralLink = `${appLink}?url=${appLink}&startapp=${referralCode}`;

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <div className="container-fluid friends-wrapper d-flex flex-column justify-content-between p-0">
      <div className={`d-flex flex-column align-items-center justify-content-end gap-3 invite-friends-banner ${referredUsers.length > 0 && "invite-friends-banner-small"} p-3`}>
        <img src={giftBox} className="gift-box" alt="" />
      <div className="d-flex wod-friends-wrapper w-100 justify-content-center">
      </div>
      <h1 className="invite-friends-title mb-0">
        Invite friends and get more points
      </h1>
      <button
  className="invite-friends-button py-3"
  onClick={() => {

    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${appLink}?startapp=${referralCode}`);
  }}
  style={{ textDecoration: "none" }}
>
  Invite Friends
</button>
      </div>
      {referredUsers.length > 0 &&
      <>
      <h6 className="friends-list-title mb-0 my-3 mx-3">
        {referredUsers.length} Friends
      </h6>
        <div className="d-flex flex-column friends-list-wrapper mx-3 mb-3">
          {referredUsers.map((friend, index) => (
            <div className="friend-item p-1 d-flex align-items-center justify-content-between" key={index}>
                <div className="d-flex align-items-center gap-2">
              <div className="friend-initial-wrapper">
                <span className="friend-initial">{friend.telegramUsername.slice(0, 1)}</span>
              </div>
                  <span className="friend-name">{friend.telegramUsername}</span>
                </div>
                <span className="friend-reward">+{friend.earnedPoints} Coins</span>
            </div>
          ))}
        </div>
      </>
      }
    </div>
  );
};

export default Friends;
