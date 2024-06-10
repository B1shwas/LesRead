import React, { useState, useEffect, useRef } from "react";
import HeroImage from "/images/hero.png";
import { MainSlide, SecondarySlide } from "./HeroSlide";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllBooks } from "../utils/getApi";
import logo2 from "/images/logo2.png";
import logo3 from "/images/logo3.png";
import logo4 from "/images/logo4.png";
import { useBookStore } from "../zustand-store/bookStore";

const Hero = () => {
  const { books, fetchBook } = useBookStore();
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  // const [bookList, setBookList] = useState(null);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    fetchBook();
  }, []);

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
    autoplay: true,
    draggable: false,
    autoplaySpeed: 6000,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    focusOnSelect: true,
    lazyLoad: true,
  };
  return (
    <div className="bg-primary-1 h-[75vh] px-[60px] flex relative">
      <div className="lg:w-[50%] md:pt-[50px] w-full">
        <Slider
          {...settings}
          asNavFor={slider2}
          ref={(slider) => (sliderRef1 = slider)}
        >
          {books
            ?.filter((book) => book.hype === "New Release")
            .map((book, index) => (
              <div key={index}>
                <MainSlide book={book} />
              </div>
            ))}
        </Slider>
        <Slider
          {...settings2}
          className="relative left-[130%] top-[10%] second-slider hidden lg:block"
          asNavFor={slider1}
          ref={(slider) => (sliderRef2 = slider)}
        >
          {books
            ?.filter((book) => book.hype === "New Release")
            .map((book, index) => (
              <div key={index}>
                <SecondarySlide book={book} />
              </div>
            ))}
        </Slider>
        <div className="block mt-[20px]  md:absolute bottom-[5%] md:bottom-[10%]">
          <p className="text-xs text-slate-500/80">Our partner</p>
          <div className="flex gap-10 mt-2">
            <img
              src={logo2}
              className="filter grayscale-100 brightness-0 invert h-[90px]"
            />

            <img
              src={logo3}
              className="filter grayscale-100 brightness-0 invert h-[90px]"
            />

            <img
              src={logo4}
              className="filter grayscale-100 brightness-0 invert h-[90px]"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[50%]">
        <img src={HeroImage} className="self-end h-[90%]" />
      </div>
    </div>
  );
};

export default Hero;
