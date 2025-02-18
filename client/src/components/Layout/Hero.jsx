import React from "react";
import hero from "../../assets/hero.webp";

const Hero = () => {
  return (
    <section className="relative">
      <img src={hero} className="h-[400px] md:h-[600px] w-full object-cover" />
      <div className="absolute top-0 w-full  h-full bg-black/20 gap-6 text-center flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-9xl font-semibold uppercase">
          Vacation Ready
        </h1>
        <p className="text-sm md:text-xl">
          Explore our vaction-ready outfits with fast worldwide shipping
        </p>
        <button className="px-4 py-1 bg-primary"> Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;
