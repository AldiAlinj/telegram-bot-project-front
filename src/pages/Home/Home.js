import React, { useEffect, useState } from "react";
import "./home.css";
import coin from "../../assets/dailySession/coin.png";
import TaskItem from "../../components/TaskItem/TaskItem";
import { NavLink } from "react-router-dom";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import walletIcon from "../../assets/walletIcon.svg";
import playBanner from "../../assets/playBanner.png";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "../../assets/xMark.svg";
import { shortAddress } from "../../hooks/shortAddress";
import tooltip from "../../assets/tooltip.svg";
import { toast } from "react-toastify";

const Home = ({
  username,
  tasks,
  userData,
  handleCompleteTask,
  referralPoints,
  postWalletAddress,
  walletAddress,
  error,
  loadingWallet,
  setLoadingWallet,
  connectPopup,
  setConnectPopup,
}) => {
  const [inputData, setInputData] = useState("");
  const [tooltipInfo, setTooltipInfo] = useState(false);
  const [coinTooltip, setCoinTooltip] = useState(false);

  const homeTasks = tasks.filter((item) => item.partner === "world-of-dypians");
  const dailyOpportunities = tasks.filter(
    (item) => item.partner === "daily-opportunities"
  );

  // const dummyTasks = [
  //   {
  //     type: "discord",
  //     link: "https://x.com/KuCoinCom",
  //     title: "Follow KuCoin on Twitter",
  //     partner: "kucoin",
  //     reward: 1500,
  //     _id: "kucoin"
  //   },
  //   {
  //     type: "telegram",
  //     link: "https://x.com/worldofdypians",
  //     title: "Follow World of Dypians on Twitter",
  //     partner: "world-of-dypians",
  //     reward: 750,
  //     _id: "wod"
  //   },
  //   {
  //     type: "twitter",
  //     link: "https://x.com/worldofdypians",
  //     title: "Connect World of Dypians on Telegram",
  //     partner: "world-of-dypians",
  //     reward: 750,
  //     _id: "wod"
  //   },
  //   {
  //     type: "youtube",
  //     link: "https://x.com/worldofdypians",
  //     title: "Follow World of Dypians on Instagram",
  //     partner: "world-of-dypians",
  //     reward: 750,
  //     _id: "wod"
  //   },
  // ]

  const handlePopup = () => {
    if (walletAddress) {
      toast.error("You have already associated your wallet", {
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
    } else {
      setConnectPopup(true);
    }
  };

  const handleWalletPost = (wallet) => {
    postWalletAddress(wallet);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container-fluid home-wrapper pt-4 pb-3">
        <div className="d-flex align-items-center justify-content-between w-100">
          <span className="hello-user">Hello, {username}!</span>
          <div
            className="connect-wallet-wrapper px-2 d-flex align-items-center gap-1"
            onClick={handlePopup}
          >
            <img src={walletIcon} height={16} width={16} alt="" />
            <span className="user-total-coins ps-1">
              {walletAddress ? shortAddress(walletAddress) : "Add Wallet"}
            </span>
          </div>
        </div>
        <div className="my-progress-wrapper d-flex flex-column gap-2 p-3 mt-3">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <h6 className="my-progress-title mb-0">My Progress</h6>
            <div className="total-coins-wrapper d-flex align-items-center gap-2 p-1">
              <span
                className="user-total-coins ps-1"
                style={{ fontSize: "18px" }}
              >
                {getFormattedNumber(userData.totalPoints, 0)} Coins
              </span>
              <div className="home-coin-wrapper d-flex align-items-center justify-content-center position-relative">
                <img
                  src={coin}
                  width={24}
                  height={24}
                  alt=""
                  onClick={() => setCoinTooltip(true)}
                />
                <OutsideClickHandler
                  onOutsideClick={() => setCoinTooltip(false)}
                >
                  <div
                    className={`coin-tooltip-content-wrapper ${
                      coinTooltip && "coin-tooltip-active"
                    }`}
                  >
                    <span>
                      This precious coin represents your progress! Accumulate
                      coins through various activities, including completing
                      tasks, participating in daily sessions, interacting with
                      the game, and inviting friends. Your coins allow you to
                      unlock rewards, access exclusive in-game features, and
                      participate in upcoming airdrops. Keep collecting and see
                      where your efforts take you!
                    </span>
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
          </div>
          <div className="home-info-grid">
            <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
              <span className="home-grid-value ">
                {getFormattedNumber(
                  userData.streakPoints + userData.chestsPoints,
                  0
                )}
              </span>
              <span className="home-grid-info">Game</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
              <span className="home-grid-value">
                {getFormattedNumber(userData.tasksPoints, 0)}
              </span>
              <span className="home-grid-info">Tasks</span>
            </div>
            <div className="home-info-grid-item d-flex flex-column align-items-center gap-1 py-2">
              <span className="home-grid-value">
                {getFormattedNumber(referralPoints, 0)}
              </span>
              <span className="home-grid-info">Invites</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 mb-5 play-banner-wrapper">
          {/* <ChestSlider onClaim={onClaim} canClaimHourly={canClaimHourly} /> */}
          <img src={playBanner} style={{ borderRadius: "10px" }} alt="" />
          <NavLink to={"/play"}>
            <button className={`play-button  py-2 px-4`}>Play</button>
          </NavLink>
        </div>
        <div className="d-flex flex-column gap-2 mt-3">
          <h6 className="home-tasks-title mb-0">Earn</h6>
          <div className="home-tasks-container d-flex flex-column gap-2 position-relative mb-4">
            {homeTasks.length > 0 ? (
              homeTasks
                .slice(0, 4)
                .map((task, index) => (
                  <TaskItem
                    item={task}
                    key={index}
                    handleCompleteTask={handleCompleteTask}
                  />
                ))
            ) : dailyOpportunities.length > 0 ? (
              <>
                {dailyOpportunities.slice(0, 4).map((task, index) => (
                  <TaskItem
                    item={task}
                    key={index}
                    handleCompleteTask={handleCompleteTask}
                  />
                ))}
              </>
            ) : (
              <div className="d-flex flex-column gap-2 w-100 align-items-center justify-content-center  flex-column mt-5">
                <h6 className="empty-title">Hey! Well done for today, don't forget to play the game or invite more friends to earn more points</h6>
                <NavLink to={"/friends"}>
            <button className={`play-button  py-2 px-4 position-relative`}>Invite Friends</button>
          </NavLink>
              </div>
            )}

            {homeTasks.length >= 4 || dailyOpportunities.length >= 4 ? (
              <NavLink to={"/earn"}>
                <button className="show-more-button py-1 px-2">
                  Show more
                </button>
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setConnectPopup(false)}>
        <div
          className={`connect-popup d-flex flex-column gap-2 align-items-center ${
            connectPopup && "connect-popup-active"
          } p-3`}
        >
          <div className="d-flex w-100 align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <h6
                className="associate-wallet-title mb-0"
                style={{ color: "#4F5F90" }}
              >
                Associate Wallet
              </h6>
              <div className="position-relative d-flex align-items-center justify-content-center">
                <img
                  src={tooltip}
                  width={20}
                  height={20}
                  style={{ cursor: "pointer" }}
                  alt=""
                  onClick={() => setTooltipInfo(true)}
                />
                <OutsideClickHandler
                  onOutsideClick={() => setTooltipInfo(false)}
                >
                  <div
                    className={`wallet-tooltip-content-wrapper ${
                      tooltipInfo && "wallet-tooltip-active"
                    }`}
                  >
                    <span>
                      Associate a wallet to this account for the chance of
                      future rewards
                    </span>
                    <br />
                    <span>(EVM Compatible Wallets Only!)</span>
                    <br />
                    <span style={{ color: "#FF8168" }}>
                      NOTE: The wallet address cannot be changed so please be
                      careful when you associate it
                    </span>
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
            <img
              src={xMark}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => setConnectPopup(false)}
            />
          </div>
          <input
            type="text"
            placeholder="0x1234..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="px-2 associate-wallet-input w-100"
            style={{ border: error !== "" && "1px solid #FF8168" }}
          />
          {error !== "" && <span style={{ color: "#FF8168" }}>{error}</span>}
          <button
            className="submit-wallet-button py-2 px-3"
            disabled={loadingWallet}
            onClick={() => handleWalletPost(inputData)}
          >
            {loadingWallet ? (
              <div
                className="spinner-border spinner-border-sm text-info"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Home;
