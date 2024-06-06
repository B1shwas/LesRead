import React from "react";
import Slider from "react-slick";
import logo2 from "/images/logo2.png";
import logo3 from "/images/logo3.png";
import logo4 from "/images/logo4.png";

const SponserCarousel = () => {
  const sponsers = [logo2, logo3, logo4, logo2, logo3, logo2, logo4];
  var settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-[60px] py-[20px]">
      <Slider {...settings} className="w-[80%] m-auto">
        {sponsers.map((item, index) => (
          <div key={index} className="focus-visible:outline-none">
            <img
              src={item}
              className="filter grayscale-100 brightness-0 h-[200px] focus-visible:outline-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SponserCarousel;
