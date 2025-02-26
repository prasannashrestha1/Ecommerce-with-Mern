import React, { useEffect, useRef, useState } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import {
  FaClosedCaptioning,
  FaCross,
  FaFilter,
  FaMinus,
  FaRemoveFormat,
} from "react-icons/fa";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "./../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target.value)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Event listner for clicks
    document.addEventListener("mousedown", handleClickOutside);

    //clean event listener
    document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
        {
          _id: 2,
          name: "Product @",
          price: 300,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brands",
            },
          ],
        },
        {
          _id: 3,
          name: "Details",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
        {
          _id: 4,
          name: "Far Better Product",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
        {
          _id: 6,
          name: "Product @",
          price: 300,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brands",
            },
          ],
        },
        {
          _id: 7,
          name: "Details",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
        {
          _id: 8,
          name: "Far Better Product",
          price: 100,
          images: [
            {
              url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
              altText: "Brand",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center lg:flex-row">
      <button
        onClick={toggleSidebar}
        className={` ${
          isSidebarOpen ? "bg-stroke" : ""
        } lg:hidden w-fit border border-stroke p-3 flex justify-center rounded-lg items-center my-4 group hover:bg-stroke`}
      >
        <FaFilter className={` ${isSidebarOpen ? "text-primary" : ""} `} />
      </button>

      {/* Filter Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen min-w-64 z-50 bg-stroke overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        ref={sidebarRef}
      >
        <div
          className={` bg-stone-400 p-2 rounded-full fixed top-5 right-5 lg:hidden `}
        >
          <FaMinus className="" />
        </div>

        <FilterSidebar />
      </div>
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
