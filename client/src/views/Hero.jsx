import React, { useState, useEffect, useRef } from "react";
import HeroImage from "../../public/images/hero.png";
import { MainSlide, SecondarySlide } from "./HeroSlide";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setSlider1(sliderRef1);
    setSlider2(sliderRef2);
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
  };
  return (
    <div className="bg-primary-1 h-[75vh] px-[60px] flex">
      <div className="lg:w-[50%] lg:pt-[50px] w-full">
        <Slider
          {...settings}
          asNavFor={slider2}
          ref={(slider) => (sliderRef1 = slider)}
        >
          <div>
            <MainSlide />
          </div>
          <div>
            <MainSlide />
          </div>
          <div>
            <MainSlide />
          </div>
          <div>
            <MainSlide />
          </div>
        </Slider>
        <Slider
          {...settings2}
          className="relative left-[130%] top-[10%] second-slider"
          asNavFor={slider1}
          ref={(slider) => (sliderRef2 = slider)}
        >
          <div>
            <SecondarySlide />
          </div>
          <div>
            <SecondarySlide />
          </div>
          <div>
            <SecondarySlide />
          </div>
          <div>
            <SecondarySlide />
          </div>
        </Slider>
      </div>
      <div className="hidden lg:flex lg:w-[50%]">
        <img src={HeroImage} className="self-end h-[90%]" />
      </div>
    </div>
  );
};

export default Hero;
