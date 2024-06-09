import Slider from "react-slick";
import CarouselCard1 from "./CarouselCard1";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBookStore } from "../zustand-store/bookStore";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

const RecommendedCarousel = () => {
  const { books } = useBookStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const noOfBooks = books.length;

  const CustomPrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className="bg-white p-2 text-black w-fit absolute z-10 rounded-md top-[125px] -left-3"
        style={{
          ...style,
          display: "block",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={onClick}
      >
        <FaArrowLeftLong className="text-[16px]" />
      </div>
    );
  };
  const CustomNextArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className="bg-white p-2 text-black w-fit absolute z-10 rounded-md -right-1 top-[120px]"
        style={{
          ...style,
          display: "block",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={onClick}
      >
        <FaArrowRightLong className="text-[16px]" />
      </div>
    );
  };

  const settings = {
    dots: false,
    speed: 50,
    infinite: true,
    slidesToShow: 5,
    draggable: false,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-carousel-1 px-[60px] py-[50px]">
      <div className="m-auto w-[50%]">
        <h2 className="capitalize text-center text-2xl font-bold font-sans">
          Recomended for you
        </h2>
        <p className="text-center text-xs text-black/60 mt-[20px] ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat ab
          assumenda suscipit sequi sint. Corporis, rem? Laudantium, quidem?
          Adipisci optio laborum reprehenderit placeat non. Neque porro aliquid
          maiores.
        </p>
      </div>
      <div className="mt-[50px]">
        <Slider {...settings} className="recomend">
          {books.map((book, index) => (
            <CarouselCard1
              book={book}
              key={index}
              index={index}
              currentSlide={currentSlide}
              bookLength={noOfBooks}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecommendedCarousel;
