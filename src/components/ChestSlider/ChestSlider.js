import React, { useState } from "react";
import "./chestslider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import chest0 from "../../assets/chestImages/chest0.png";
import chest0open from '../../assets/chestImages/chest0open.png';
import chest1 from "../../assets/chestImages/chest1.png";
import chest1open from '../../assets/chestImages/chest1open.png';
import chest2 from "../../assets/chestImages/chest2.png";
import chest2open from '../../assets/chestImages/chest2open.png';
import chest3 from "../../assets/chestImages/chest3.png";
import chest3open from '../../assets/chestImages/chest3open.png';
import chest4 from "../../assets/chestImages/chest4.png";
import chest4open from '../../assets/chestImages/chest4open.png';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import arrow from '../../assets/arrow.svg'

const ChestSlider = ({ onClaim, canClaimHourly }) => {
  const [chestIndex, setChestIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);  // Track the active slide index

  const claimChest = (index) => {
    if (canClaimHourly && index === activeIndex) {
      onClaim();
      sessionStorage.setItem("hasOpened", index);
      const hasOpened = sessionStorage.getItem("hasOpened");
      setChestIndex(hasOpened);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center gap-2 w-100">
      <Swiper
        effect={`coverflow`}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={5}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: '.arrow-holder-next',
          prevEl: '.arrow-holder-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}  // Track the current slide index
        className="swiper_container"
      >
        <SwiperSlide>
          <img
            src={chestIndex === 0 ? chest0open : chest0}
            className={`${canClaimHourly && activeIndex === 0 ? "shake-img" : ""}`}
            style={{ pointerEvents: canClaimHourly && activeIndex === 0 ? "auto" : "none" }}
            onClick={() => claimChest(0)}
            alt="chest0"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={chestIndex === 1 ? chest1open : chest1}
            className={`${canClaimHourly && activeIndex === 1 ? "shake-img" : ""}`}
            style={{ pointerEvents: canClaimHourly && activeIndex === 1 ? "auto" : "none" }}
            onClick={() => claimChest(1)}
            alt="chest1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={chestIndex === 2 ? chest2open : chest2}
            className={`${canClaimHourly && activeIndex === 2 ? "shake-img" : ""}`}
            style={{ pointerEvents: canClaimHourly && activeIndex === 2 ? "auto" : "none" }}
            onClick={() => claimChest(2)}
            alt="chest2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={chestIndex === 3 ? chest3open : chest3}
            className={`${canClaimHourly && activeIndex === 3 ? "shake-img" : ""}`}
            style={{ pointerEvents: canClaimHourly && activeIndex === 3 ? "auto" : "none" }}
            onClick={() => claimChest(3)}
            alt="chest3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={chestIndex === 4 ? chest4open : chest4}
            className={`${canClaimHourly && activeIndex === 4 ? "shake-img" : ""}`}
            style={{ pointerEvents: canClaimHourly && activeIndex === 4 ? "auto" : "none" }}
            onClick={() => claimChest(4)}
            alt="chest4"
          />
        </SwiperSlide>
      </Swiper>
      <div className="d-flex align-items-center  justify-content-between w-100">
        <div className="arrow-holder-prev" style={{ zIndex: 50 }}>
         <img src={arrow} style={{rotate: "180deg"}} alt="" />
        </div>
        <div className="arrow-holder-next" style={{ zIndex: 50 }}>
         <img src={arrow}  alt="" />
          
        </div>
      </div>
    </div>
  );
};

export default ChestSlider;
