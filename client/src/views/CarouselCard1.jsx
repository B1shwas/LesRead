import { Button } from "../components/ui/button";

const CarouselCard1 = ({ book }) => {
  return (
    <div className="flex flex-col w-fit text-center gap-6">
      <img
        src={book?.image}
        className="h-[300px] w-[250px] object-fit rounded-sm"
      />
      <div className={`flex flex-col gap-2 w-full `}>
        <h1 className="font-bold text-[18px]">{book.title}</h1>
        <p className="text-secondary-1">${book.cutPrice}</p>
        <Button variant="cart" className="w-[70%] m-auto">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default CarouselCard1;
