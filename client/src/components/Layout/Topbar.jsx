import React from "react";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaMeta } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="w-full bg-primary text-center text-white">
      <div className="mx-auto flex justify-between px-8 lg:px-16 py-4">
        <div className="hidden sm:flex gap-4 items-center">
          <a href="#" className="hover:text-stroke">
            <BsTwitterX className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-stroke">
            {" "}
            <FaInstagram className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-stroke">
            <FaMeta className="w-4 h-4" />
          </a>
        </div>
        <p className="text-sm grow">
          We ship worldwide - Fast and reliable shipping
        </p>
        <a className="hidden sm:flex text-sm" href="tel:+977-9860270060">
          +977-9860270060
        </a>
      </div>
    </div>
  );
};

export default Topbar;
