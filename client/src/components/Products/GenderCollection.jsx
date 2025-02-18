import React from "react";
import Men from "./../../assets/Men.png";
import Female from "./../../assets/Female.jpg";

const GenderCollection = () => {
  return (
    <section className="flex gap-8 py-16 px-4">
      <div className="flex flex-1 relative">
        <img
          src={Men}
          alt="Menns collection"
          className="h-[600px] grow object-cover"
        />
      </div>
      <div className="flex flex-1">
        <img src={Female} className="h-[600px] grow object-cover" />
      </div>
    </section>
  );
};

export default GenderCollection;
