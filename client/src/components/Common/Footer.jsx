import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-10 border-t-1 p-8 flex space-x-4">
      <div className="grid gap-8 grid-cols-1 flex-1 min-[540px]:grid-cols-2 lg:grid-cols-4">
        {/* NewsLetter */}
        <div className="flex flex-col gap-3">
          <h2 className="text-primary text-lg">NewsLetter</h2>
          <p className=" text-tsecondary text-sm">
            Be the first to hear about new products
          </p>
          <p className=" text-tsecondary text-xs">
            Sign up and get 10% off your first order
          </p>
          <form className="w-full">
            <input
              type="text"
              className="rounded-r-lg w-full text-sm rounded-t-lg bg-stroke p-3 outline-none focus:border-primary"
              placeholder="Subscribe "
            />
          </form>
        </div>
        {/* Shop */}
        <div className="flex flex-col text-gray-700 gap-2 text-sm  ">
          <span className="text-lg text-black">Shop</span>

          <Link to="/" className="hover:text-primary">
            Men's Top Wear
          </Link>
          <Link to="/" className="hover:text-primary">
            Women Top Wear
          </Link>
          <Link to="/" className="hover:text-primary">
            Men Bottom Wear
          </Link>
          <Link to="/" className="hover:text-primary">
            Women Bottom Wear
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col text-gray-700 gap-2 text-sm  ">
          <span className="text-lg text-black">Support</span>

          <Link to="/" className="hover:text-primary">
            Contact Us
          </Link>
          <Link to="/" className="hover:text-primary">
            About us
          </Link>
          <Link to="/" className="hover:text-primary">
            Faqs
          </Link>
          <Link to="/" className="hover:text-primary">
            Features
          </Link>
        </div>
        <div className="flex flex-col text-gray-700 gap-2 text-sm  ">
          <span className="text-lg text-black">Call us</span>
          +977-9860270060
        </div>
      </div>
    </footer>
  );
};

export default Footer;
