import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { IoMdClose } from "react-icons/io";
import CartDrawer from "../Layout/CartDrawer";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };
  const handleNavDrawerToggle = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <div className="w-full bg-primary/5 h-fit text-center text-black relative">
      <div className="mx-auto flex justify-between px-8 lg:px-16 py-4 uppercase font-medium">
        <p className="text-lg">Ecommerce</p>
        <div className="hidden md:flex gap-4 text-sm items-center ">
          <NavLink to="/" className="hover:text-primary">
            Men
          </NavLink>
          <NavLink to="/" className="hover:text-primary">
            Women
          </NavLink>
          <NavLink to="/" className="hover:text-primary">
            Top Wear
          </NavLink>
          <NavLink to="/" className="hover:text-primary">
            Bottom Wear
          </NavLink>
        </div>
        <div className="hidden md:flex gap-4 text-sm items-center">
          <Link to="/profile" className="hover:text-primary ">
            <BsPersonFill className="w-4 h-4" />
          </Link>
          <div
            onClick={() => setCartOpen(true)}
            className="hover:text-primary relative"
          >
            <IoCart className="w-5 h-5" />
            <div className="absolute bg-red-500 px-[4px] py-[2px] left-2.5 top-[12px] rounded-full text-white text-[8px]">
              4
            </div>
          </div>
          <SearchBar />
        </div>
        <button
          onClick={handleNavDrawerToggle}
          className="block md:hidden rounded-full cursor-pointer bg-stroke p-2"
        >
          <HiBars3BottomRight className="w-4 h-4" />
        </button>
      </div>

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        handleCartToggle={handleCartToggle}
      />

      {/* Mobile Navigation */}
      <div
        className={` cart-container w-screen sm:w-[300px] ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between  cursor-pointer">
          <h1 className="  font-semibold text-xl">Menu</h1>
          <IoMdClose className="w-6 h-6" onClick={handleNavDrawerToggle} />
        </div>
        <div className="flex flex-col gap-4 text-md items-center ">
          <NavLink
            to="/"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Men
          </NavLink>
          <NavLink
            to="/"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Women
          </NavLink>
          <NavLink
            to="/"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Bottom Wear
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
