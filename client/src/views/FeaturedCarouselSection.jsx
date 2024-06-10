import Slider from "react-slick";
import { useBookStore } from "../zustand-store/bookStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadingsAndParagraph from "./HeadingsAndParagraph";
import { MainSlide } from "./HeroSlide";

const FeaturedCarouselSection = () => {
  const { books } = useBookStore();
  const heading = "Featured Product";
  const paragraph =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis nisi, sed tempore magni suscipit libero delectus quia nemo debitis illo iure rerum voluptas fugit earum deserunt consectetur cupiditate inventore aperiam placeat. Aut fugiat nisi quaerat quas nam corrupti eos atque?";

  var settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "200px",
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 950,
        settings: {
          centerMode: false,
        },
      },
    ],
  };
  return (
    <HeadingsAndParagraph heading={heading} paragraph={paragraph}>
      <Slider {...settings} className="featuredProducts">
        {books
          .filter((book) => book.hype === "New Release")
          .map((book, index) => (
            <div key={index}>
              <div className="flex gap-[32px] flex-col sm:flex-row">
                <img
                  src={book.image}
                  className="h-[100px] w-[100%] sm:h-[300px] sm:w-[200px] rounded-md object-cover"
                />

                <div>
                  <MainSlide
                    book={book}
                    hypeStyle="text-xs tracking-[4px] text-black"
                    titleStyle="text-3xl text-black tracking-[1px]"
                    spanStyle="text-black/80"
                    descriptionStyle="text-black/80 text-sm"
                    priceStyle="text-lg"
                    cutPriceStyle="text-red font-medium"
                    buttonSpanStyle="bg-[#f0f0f0]"
                    buyBtnVariant="secondary2"
                    detailsBtnVariant="outline2"
                    divStyle="text-center sm:text-start"
                    lowerDivStyle="justify-center sm:justify-start"
                  />
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </HeadingsAndParagraph>
  );
};

export default FeaturedCarouselSection;
