import { FaStar } from "react-icons/fa6";
import book from "/images/atomicHabit.jpeg";

const CarouselCard2 = ({ book }) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <img
          src={book.image}
          className="h-[250px] w-[180px] rounded-sm shadow-sm object-cover m-auto sm:m-0"
        />
        <h3 className="font-bold tracking-wide text-base text-center sm:text-start">
          {book.title}
        </h3>
        <p className="uppercase text-secondary-1 text-xs text-center sm:text-start">
          {book.genre}
        </p>
      </div>
      <div className="flex justify-between w-[180px] m-auto sm:m-0 mt-3 sm:mt-4  ">
        <div className="flex gap-[4px] text-secondary-1">
          <FaStar className="text-secondary-1 " />
          <p className="text-xs">{book.rating}</p>
        </div>
        <div className="flex gap-[4px]">
          <p className="font-bold text-sm last:">{book.cutPrice}</p>
          <strike className="font-bold text-gray-400 text-xs self-end">
            {book.price}
          </strike>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard2;
