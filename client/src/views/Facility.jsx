import React from "react";
import { RiSecurePaymentFill, RiThunderstormsFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Facility = () => {
  const facilities = [
    {
      icon: RiThunderstormsFill,
      name: "Quick Delivery",
      description: "We deliver to your doorstep in less than 24 hours",
    },
    {
      icon: RiSecurePaymentFill,
      name: "Secure Payment",
      description: "We accept all major credit cards",
    },
    {
      icon: FaThumbsUp,
      name: "Best Quality",
      description: "We offer the best quality products",
    },
    {
      icon: FaStar,
      name: "Return Guarentee",
      description: "We offer a 30-day return guarantee",
    },
  ];
  let icon = FaStar;
  return (
    <div className="p-[60px] flex flex-col md:flex-row gap-2 justify-center">
      {facilities.map((facility, index) => (
        <div key={index} className="flex flex-col gap-2 p-4">
          <div className="bg-secondary-1 bg-opacity-10 inline-block p-3 rounded-md m-auto">
            <facility.icon className="text-secondary-1" size="23px" />
          </div>
          <h2 className="text-[15px] font-bold text-center">{facility.name}</h2>
          <p className="text-xs text-black/75 text-center">
            {facility.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Facility;
