import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
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
