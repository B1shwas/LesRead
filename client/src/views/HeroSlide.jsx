import { Button } from "../components/ui/button";
import Rating from "react-rating";
import { GoStarFill } from "react-icons/go";

const MainSlide = ({ book }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <div>
        <p className="text-text-2 tracking-[12px] uppercase mb-3">
          {book.hype}
        </p>
        <h1 className="text-white font-extrabold text-4xl tracking-widest mb-2">
          {book.title}
        </h1>
        <div className="text-white/80">
          <span className="mr-4">{book.author}</span>
          <span>{book.genre}</span>
        </div>
      </div>
      <div className="px-6 border-l-2 border-button-pink text-white/40">
        {book.description}
      </div>
      <div>
        <div className="flex gap-5 mb-4">
          <h1 className="text-white text-2xl font-bold">${book.cutPrice}</h1>
          <strike className="text-primary-2 text-sm font-bold self-end">
            ${book.price}
          </strike>
          <p className="bg-span-pink px-2 py-0.5 rounded-sm text-[12px] font-medium text-white self-center">
            {book.discount}
          </p>
        </div>
        <div className="flex gap-6">
          <Button variant="secondary">Buy Now</Button>
          <Button variant="outline">See Details</Button>
        </div>
      </div>
    </div>
  );
};

const SecondarySlide = ({ book }) => {
  return (
    <div className="bg-white h-fit w-[95%] p-2 rounded-md  flex gap-2">
      <img
        src={book.image}
        className="h-[100px] w-[100px] object-cover rounded-md"
      />
      <div className="p-2 w-[98%]">
        <h3 className="flex text-[16px] font-semibold text-nowrap">
          {book.title}
        </h3>
        <p className="text-xs text-black/60">By {book.author}</p>
        <div className="flex justify-between mt-1">
          <span className="font-semibold text-[14px]">${book.cutPrice}</span>
          <Rating
            initialRating={book.rating}
            readonly="true"
            fractions={2}
            emptySymbol={<GoStarFill color="#C3C3C3" size="15px" />}
            fullSymbol={<GoStarFill color="#FF754C" size="15px" />}
          />
        </div>
      </div>
    </div>
  );
};

export { MainSlide, SecondarySlide };
