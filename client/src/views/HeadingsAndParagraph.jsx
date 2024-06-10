const HeadingsAndParagraph = ({
  children,
  heading,
  paragraph,
  fullBodyStyle = "",
  headingSectionStyle = "",
}) => {
  return (
    <div className={`bg-carousel-1 px-[60px] py-[50px] ${fullBodyStyle}`}>
      <div className={`m-auto w-full sm:w-[50%] ${headingSectionStyle}`}>
        <h2 className="capitalize text-center text-2xl font-bold font-sans">
          {heading}
        </h2>
        <p className="text-center text-xs text-black/60 mt-[20px]">
          {paragraph}
        </p>
      </div>
      <div className="mt-[50px]">{children}</div>
    </div>
  );
};

export default HeadingsAndParagraph;
