import React, { useRef, useState } from "react";
import "./chestslider.css";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import chest0 from "../../assets/chestImages/chest0.png";
import chest0open from "../../assets/chestImages/chest0open.png";
import chest1 from "../../assets/chestImages/chest1.png";
import chest1open from "../../assets/chestImages/chest1open.png";
import chest2 from "../../assets/chestImages/chest2.png";
import chest2open from "../../assets/chestImages/chest2open.png";
import chest3 from "../../assets/chestImages/chest3.png";
import chest3open from "../../assets/chestImages/chest3open.png";
import chest4 from "../../assets/chestImages/chest4.png";
import chest4open from "../../assets/chestImages/chest4open.png";
import chest5 from "../../assets/chestImages/chest5.png";
import chest5open from "../../assets/chestImages/chest5open.png";
import chest6 from "../../assets/chestImages/chest6.png";
import chest6open from "../../assets/chestImages/chest6open.png";
import chest7 from "../../assets/chestImages/chest7.png";
import chest7open from "../../assets/chestImages/chest7open.png";
import chest8 from "../../assets/chestImages/chest8.png";
import chest8open from "../../assets/chestImages/chest8open.png";
import chest9 from "../../assets/chestImages/chest9.png";
import chest9open from "../../assets/chestImages/chest9open.png";
import chest10 from "../../assets/chestImages/chest10.png";
import chest10open from "../../assets/chestImages/chest10open.png";
import chest11 from "../../assets/chestImages/chest11.png";
import chest11open from "../../assets/chestImages/chest11open.png";
import getFormattedNumber from "../../hooks/getFormattedNumber";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Countdown from "react-countdown";
import nextArrow from "../../assets/nextArrow.svg";
import prevArrow from "../../assets/prevArrow.svg";

const renderer = ({ minutes, seconds }) => {
  return (
    <span className="time-left">
      {String(minutes).padStart(2, "0")}m:
      {String(seconds).padStart(2, "0")}s
    </span>
  );
};

const ChestSlider = ({
  onClaim,
  canClaimHourly,
  reward,
  loadingChest,
  setLoadingChest,
  setCanClaimHourly,
  chestTimeStamp,
}) => {
  const chests = [
    {
      image: chest0,
      openImage: chest0open,
    },
    {
      image: chest1,
      openImage: chest1open,
    },
    {
      image: chest2,
      openImage: chest2open,
    },
    {
      image: chest3,
      openImage: chest3open,
    },
    {
      image: chest4,
      openImage: chest4open,
    },
    {
      image: chest5,
      openImage: chest5open,
    },
    {
      image: chest6,
      openImage: chest6open,
    },
    {
      image: chest7,
      openImage: chest7open,
    },
    {
      image: chest8,
      openImage: chest8open,
    },
    {
      image: chest9,
      openImage: chest9open,
    },
    {
      image: chest10,
      openImage: chest10open,
    },
    {
      image: chest11,
      openImage: chest11open,
    },
  ];

  const [chestIndex, setChestIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [persistIndex, setPersistIndex] = useState(null);

  const [shuffledChests] = useState(shuffle(chests));
  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (current) => {
      setActiveIndex(current);
    },
  };

  const claimChest = (id) => {
    setLoadingChest(true);
    setTimeout(() => {
      if (canClaimHourly && id === activeIndex) {
        onClaim();
        sessionStorage.setItem("hasOpened", id);
        setChestIndex(id);
        setPersistIndex(id);
      }
    }, 2500);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return (
    <>
      {reward > 0 && persistIndex === activeIndex ? (
        <div className="d-flex flex-column gap-2 align-items-center chest-rewards-position">
          <div className="won-reward">{getFormattedNumber(reward, 0)}</div>
          <span className="you-won-text">Coins</span>
        </div>
      ) : (
        <></>
      )}

      <div className="chest-slider-wrapper d-flex align-items-center justify-content-center w-100">
        <img
          src={prevArrow}
          width={40}
          height={40}
          onClick={prevSlide}
          alt=""
          className="prev-arrow"
        />
        <img
          src={nextArrow}
          width={40}
          height={40}
          onClick={nextSlide}
          alt=""
          className="next-arrow"
        />
        <Slider {...settings} ref={sliderRef}>
          {shuffledChests.map((item, index) => (
            <div
              className="position-relative d-flex align-items-center justify-content-center"
              style={{
                cursor: canClaimHourly && activeIndex === index && "pointer",
                pointerEvents:
                  canClaimHourly && activeIndex === index ? "auto" : "none",
              }}
              key={index}
              onClick={() =>
                canClaimHourly && activeIndex === index && claimChest(index)
              }
            >
              <img
                src={
                  chestIndex === index ||
                  sessionStorage.getItem("hasOpened") === index
                    ? item.openImage
                    : item.image
                }
                className={`${
                  activeIndex === index && loadingChest && canClaimHourly
                    ? "chest-img shake-img"
                    : "chest-img "
                }`}
                style={{
                  pointerEvents:
                    canClaimHourly && activeIndex === index ? "auto" : "none",
                }}
                alt={`chest${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      {canClaimHourly && !loadingChest ? (
        <button
          className={`play-page-button chest-button ${
            !canClaimHourly || loadingChest ? "play-page-button-disabled" : ""
          } py-2 px-4`}
          onClick={() => claimChest(activeIndex)}
        >
          Claim
        </button>
      ) : canClaimHourly && loadingChest ? (
        <button className={`play-page-button chest-button  py-2 px-4`} disabled>
          <div
            className="spinner-border spinner-border-sm text-info loading-chest-color"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </button>
      ) : !canClaimHourly ? (
        <button
          className={`play-page-button countdown-button d-flex align-items-center justify-content-between chest-button  py-2 px-4`}
          disabled={true}
        >
          Next in
          <Countdown
            renderer={renderer}
            date={chestTimeStamp}
            onComplete={() => {
              setCanClaimHourly(true);
            }}
          />
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChestSlider;
