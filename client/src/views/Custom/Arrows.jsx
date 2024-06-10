import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
export const CustomPrevArrow1 = (props) => {
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
export const CustomNextArrow1 = (props) => {
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

export const CustomNextArrow2 = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="bg-secondary-1 p-2 text-black w-fit absolute top-[95px] z-10 right-0 rounded-full  md:right-[20px] md:-top-[45px] "
      style={{
        ...style,
        display: "block",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      <GrNext className="text-[12px] text-white" />
    </div>
  );
};
export const CustomPrevArrow2 = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="bg-secondary-1  p-2 text-black w-fit absolute top-[95px] z-10 rounded-full  md:right-[80px] md:-top-[45px]"
      style={{
        ...style,
        display: "block",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      <GrPrevious className="text-[12px] text-white" />
    </div>
  );
};
