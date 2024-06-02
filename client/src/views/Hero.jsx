import React from "react";
import { Button } from "../components/ui/button";
import HeroImage from "../../public/images/hero.png";

const Hero = () => {
  return (
    <div className="bg-primary-1 h-[75vh] px-[60px] flex">
      <div className="lg:w-[50%] flex flex-col gap-[32px] lg:pt-[50px]">
        <div>
          <p className="text-text-2 tracking-[12px] uppercase mb-3">
            BEST SELLER
          </p>
          <h1 className="text-white font-extrabold text-4xl tracking-widest mb-2">
            Think and Grow Rich
          </h1>
          <div className="text-white/80">
            <span className="mr-4">Napolean Hill</span>
            <span>Business & Strategy</span>
          </div>
        </div>
        <div className="px-6 border-l-2 border-button-pink text-white/40">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam quod
          alias unde consectetur molestiae autem blanditiis nulla, facilis nobis
          odio sint quisquam veniam! Earum placeat dicta itaque eveniet ut
          doloribus officiis adipisci.
        </div>
        <div>
          <div className="flex gap-5 mb-4">
            <h1 className="text-white text-2xl font-bold">$9.5</h1>
            <strike className="text-primary-2 text-sm font-bold self-end">
              $12.99
            </strike>
            <p className="bg-span-pink px-2 py-0.5 rounded-sm text-[12px] font-medium text-white self-center">
              20% OFF
            </p>
          </div>
          <div className="flex gap-6">
            <Button variant="secondary">Buy Now</Button>
            <Button variant="outline">See Details</Button>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden">
        <img src={HeroImage} className="self-end h-[90%]" />
      </div>
    </div>
  );
};

export default Hero;
