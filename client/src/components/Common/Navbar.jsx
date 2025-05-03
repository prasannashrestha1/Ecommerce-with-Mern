import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { IoMdClose } from "react-icons/io";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };
  const handleNavDrawerToggle = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const cartItemCount = cart?.products?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="w-full bg-primary/5 h-fit text-center text-black relative">
      <div className="mx-auto flex justify-between px-8 lg:px-16 py-4 uppercase font-medium">
        <Link to="/" className="text-lg">
          Ecommerce
        </Link>
        <div className="hidden md:flex gap-4 text-sm items-center ">
          <NavLink
            to="/collections/all?gender=Men"
            className="hover:text-primary"
          >
            Men
          </NavLink>
          <NavLink
            to="/collections/all?gender=Women"
            className="hover:text-primary"
          >
            Women
          </NavLink>
          <NavLink
            to="/collections/all?category=Top Wear"
            className="hover:text-primary"
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/collections/all?category=Bottom Wear"
            className="hover:text-primary"
          >
            Bottom Wear
          </NavLink>
        </div>
        {/* right icons */}
        <div className="flex space-x-4 ">
          <div className="flex gap-4 text-sm items-center">
            {user && user?.role === "admin" ? (
              <Link
                to="/admin"
                className="bg-black text-white text-xs px-2 py-1"
              >
                Admin
              </Link>
            ) : (
              ""
            )}

            {user ? (
              <Link to="/profile" className="hover:text-primary ">
                <BsPersonFill className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-2 py-[2px] block bg-primary text-white"
              >
                Login
              </Link>
            )}

            <div
              onClick={() => setCartOpen(true)}
              className="hover:text-primary relative"
            >
              <IoCart className="w-5 h-5" />
              <div className="absolute bg-red-500 px-[4px] py-[2px] left-2.5 top-[12px] rounded-full text-white text-[8px]">
                {cartItemCount}
              </div>
            </div>
            <SearchBar />
          </div>
          <button
            onClick={handleNavDrawerToggle}
            className="block md:hidden h-fit rounded-full cursor-pointer bg-stroke p-2"
          >
            <HiBars3BottomRight className="w-4 h-4" />
          </button>
        </div>
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
            to="/collections/all?gender=Men"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Men
          </NavLink>
          <NavLink
            to="/collections/all?gender=Women"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Women
          </NavLink>
          <NavLink
            to="/collections/all?category=Top Wear"
            onClick={handleNavDrawerToggle}
            className="hover:text-primary"
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/collections/all?category=Bottom Wear"
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
