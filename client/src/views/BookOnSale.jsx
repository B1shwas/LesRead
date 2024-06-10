import Slider from "react-slick";
import CarouselCard2 from "./Carousels/CarouselCard2";
import { useBookStore } from "../zustand-store/bookStore";

const BookOnSale = () => {
  const { books } = useBookStore();
  var settings = {
    slidesToShow: 6,
    infinite: true,
    dots: true,
    speed: 500,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="p-[60px] flex flex-col justify-center">
      <h1 className="text-4xl font-extrabold text-center md:text-start">
        Book On Sale
      </h1>
      <div className="mt-[32px]">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index}>
              <CarouselCard2 book={book} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookOnSale;
