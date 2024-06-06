import Slider from "react-slick";
import CarouselCard1 from "./CarouselCard1";
import { useBookStore } from "../zustand-store/bookStore";

const RecommendedCarousel = () => {
  const { books } = useBookStore();

  const settings = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 5,
    draggable: false,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    arrows: true,
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
            <CarouselCard1 book={book} key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecommendedCarousel;
