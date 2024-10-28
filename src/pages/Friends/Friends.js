import React, { useEffect, useState } from "react";
import giftBox from "../../assets/giftBox.png";
import verified from "../../assets/verified.svg";
import "./friends.css";
import infoTooltip from "../../assets/infoTooltip.svg";
import OutsideClickHandler from "react-outside-click-handler";

const Friends = ({ referredUsers, referralCode }) => {
  // const dummyFriends = [
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //     isPremium: false,
  //   },
  //   {
  //     telegramUsername: "Aldi",
  //     earnedPoints: 1500,
  //     isPremium: true,
  //   },
  //   {
  //     telegramUsername: "Nitu",
  //     earnedPoints: 1500,
  //     isPremium: false,
  //   },
  //   {
  //     telegramUsername: "Gazi",
  //     earnedPoints: 1500,
  //     isPremium: true,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //     isPremium: false,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //     isPremium: true,
  //   },
  //   {
  //     telegramUsername: "Lorena579",
  //     earnedPoints: 1500,
  //     isPremium: false,
  //   },

  // ]

  const [tooltipInfo, setTooltipInfo] = useState(false);

  const appLink = "https://t.me/AldiTestBot_bot/AldiTestBot";
  // const referralLink = `${appLink}?url=${appLink}&startapp=${referralCode}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid friends-wrapper d-flex flex-column justify-content-between p-0">
      <div
        className={`d-flex flex-column align-items-center justify-content-end gap-3 invite-friends-banner position-relative ${
          referredUsers.length > 0 && "invite-friends-banner-small"
        } p-3`}
      >
        <div className="friends-tooltip-position">
          <div className="position-relative d-flex align-items-center justify-content-center">
            <img
              src={infoTooltip}
              width={20}
              height={20}
              style={{ cursor: "pointer" }}
              alt=""
              onClick={() => setTooltipInfo(true)}
            />
            <OutsideClickHandler onOutsideClick={() => setTooltipInfo(false)}>
              <div
                className={`daily-session-tooltip-content-wrapper ${
                  tooltipInfo && "daily-session-tooltip-active"
                }`}
              >
                <span>
                  <b style={{ fontWeight: "800" }}>Friends Referral:</b>
                  <br />
                  Invite friends to earn coins! The more friends you invite, the
                  more you earn. Plus, get extra coins when your invited friends
                  are verified users. Start inviting and boost your rewards!
                </span>
              </div>
            </OutsideClickHandler>
          </div>
        </div>

        <img src={giftBox} className="gift-box" alt="" />
        <div className="d-flex wod-friends-wrapper w-100 justify-content-center"></div>
        <h1 className="invite-friends-title mb-0">
          Invite friends and get more points
        </h1>
        <button
          className="invite-friends-button py-3"
          onClick={() => {
            window.Telegram.WebApp.openTelegramLink(
              `https://t.me/share/url?url=${appLink}?startapp=${referralCode}`
            );
          }}
          style={{ textDecoration: "none" }}
        >
          Invite Friends
        </button>
      </div>
      {referredUsers.length > 0 && (
        <>
          <h6 className="friends-list-title mb-0 my-3 mx-3">
            {referredUsers.length} Friends
          </h6>
          <div className="d-flex flex-column friends-list-wrapper mx-3 mb-3">
            {referredUsers.map((friend, index) => (
              <div
                className="friend-item p-1 d-flex align-items-center justify-content-between"
                key={index}
              >
                <div className="d-flex align-items-center gap-2">
                  <div className="friend-initial-wrapper">
                    <span className="friend-initial">
                      {friend.telegramUsername.slice(0, 1)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <span className="friend-name">
                      {friend.telegramUsername}
                    </span>
                    {friend.isPremium && (
                      <img src={verified} width={20} height={20} alt="" />
                    )}
                  </div>
                </div>
                <span className="friend-reward">
                  +{friend.earnedPoints} Coins
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Friends;
