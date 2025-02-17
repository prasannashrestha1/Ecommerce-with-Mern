import React, { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdCloseCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsOpen(false);
      setSearchTerm("");
    } catch (error) {
      toast.error(error.message);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-full  ${
        isOpen ? "absolute top-0 left-0 w-full bg-stroke h-28 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="w-screen flex justify-between items-center"
        >
          <div className="w-1/2 relative mx-auto">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search"
              className="bg-gray-100 text-sm rounded-lg outline-none focus:border-primary w-full p-2 border-2 border-gray-200"
            />
            <button
              type="submit"
              className="absolute cursor-pointer right-6 top-3 "
            >
              <FaSearch />
            </button>
          </div>
          <button
            onClick={handleChange}
            className="block rounded-full cursor-pointer p-2 mr-4"
          >
            <IoMdCloseCircle className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleChange}
          className="block rounded-full cursor-pointer p-2"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
