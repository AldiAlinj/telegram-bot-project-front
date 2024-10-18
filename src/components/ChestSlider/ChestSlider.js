import React, { useState } from "react";
import "./chestslider.css";
import { Swiper, SwiperSlide } from "swiper/react";
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
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const ChestSlider = ({ onClaim, canClaimHourly }) => {
  const [chestIndex, setChestIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const claimChest = (id) => {
    if (canClaimHourly && id === activeIndex) {
      onClaim();
      sessionStorage.setItem("hasOpened", id);
      setChestIndex(id);
    }
  };

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
          nextEl: ".arrow-holder-next",
          prevEl: ".arrow-holder-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track the current slide index
        className="swiper_container"
      >
        {chests.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={
                chestIndex === index ||
                sessionStorage.getItem("hasOpened") === index
                  ? item.openImage
                  : item.image
              }
              className={`${
                canClaimHourly && activeIndex === index ? "shake-img" : ""
              }`}
              style={{
                pointerEvents:
                  canClaimHourly && activeIndex === index ? "auto" : "none",
              }}
              onClick={() => claimChest(index)}
              alt={`chest${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ChestSlider;
