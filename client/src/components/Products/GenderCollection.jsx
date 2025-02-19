import React from "react";
import Men from "./../../assets/Men.png";
import Female from "./../../assets/Female.jpg";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="flex flex-col md:flex-row  gap-8 py-16 px-8">
      <Link
        to="/collections/all?gender=Men"
        className="flex flex-1 relative group cursor-pointer"
      >
        <img
          src={Men}
          alt="Menns collection"
          className="h-[400px] md:h-[600px] grow object-cover "
        />
        <div className="absolute group-hover:bg-black/20 left-5 bottom-5 bg-white p-6 grow md:w-75 ">
          <h3 className="text-xl mb-3 group-hover:text-white">
            Men's Collection
          </h3>
          <p className="text-sm group-hover:text-white underline tracking-tighter">
            Shop Now
          </p>
        </div>
      </Link>
      <Link
        to="/collections/all?gender=Women"
        className="flex flex-1 relative group cursor-pointer"
      >
        <img
          src={Female}
          alt="Menns collection"
          className="h-[400px] md:h-[600px] grow object-cover "
        />
        <div className="absolute group-hover:bg-black/20 left-5 bottom-5 bg-white p-6 md:w-75">
          <h3 className="text-xl mb-3 group-hover:text-white">
            Women's Collection
          </h3>
          <p className="text-sm group-hover:text-white underline tracking-tighter">
            Shop Now
          </p>
        </div>
      </Link>
    </section>
  );
};

export default GenderCollection;
