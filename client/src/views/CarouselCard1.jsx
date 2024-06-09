import { Button } from "../components/ui/button";
const CarouselCard1 = ({ book, currentSlide, index, bookLength }) => {
  let imageClassName = "h-[200px] w-[150px] object-fit rounded-sm";
  let divClassName = "flex justify-center";

  if (index === currentSlide) {
    imageClassName = "h-[300px] w-[225px] object-fit rounded-sm px-2";
  } else if (index === currentSlide - 1) {
    imageClassName = "h-[250px] w-[175px] object-fit rounded-sm";
  } else if (index === currentSlide + 1) {
    imageClassName = "h-[250px] w-[175px] object-fit rounded-sm";
  } else if (
    (currentSlide === 0 && index === bookLength - 1) ||
    (currentSlide === bookLength - 1 && index === 0)
  ) {
    imageClassName = "h-[250px] w-[175px] object-fit rounded-sm";
  }

  return (
    <div className={divClassName}>
      <div className="flex flex-col w-fit text-center gap-6">
        <img src={book?.image} className={imageClassName} alt={book?.title} />
        <div className="flex flex-col gap-2 w-full">
          {currentSlide === index && (
            <>
              <h1 className="font-bold text-[18px]">{book.title}</h1>
              <p className="text-secondary-1">${book.cutPrice}</p>
              <Button variant="cart" className="w-[70%] m-auto">
                Add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselCard1;
