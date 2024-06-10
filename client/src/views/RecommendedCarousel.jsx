import Slider from "react-slick";
import CarouselCard1 from "./Carousels/CarouselCard1";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBookStore } from "../zustand-store/bookStore";

import { useState } from "react";
import { CustomNextArrow1, CustomPrevArrow1 } from "./Custom/Arrows";
import HeadingsAndParagraph from "./HeadingsAndParagraph";

const RecommendedCarousel = () => {
  const { books } = useBookStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const noOfBooks = books.length;

  const heading = "Recommended for you";
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut eveniet eum, obcaecati repellat voluptatem consequuntur velit, delectus itaque iste laboriosam optio nam cum voluptatibus! Repellat, fuga culpa. Facere magnam impedit recusandae praesentium omnis quam et? Labore illum deleniti sint laudantium!";

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
    prevArrow: <CustomPrevArrow1 />,
    nextArrow: <CustomNextArrow1 />,
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
    <HeadingsAndParagraph heading={heading} paragraph={paragraph}>
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
    </HeadingsAndParagraph>
  );
};

export default RecommendedCarousel;
