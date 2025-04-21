import React, { useEffect, useRef, useState } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import { FaClosedCaptioning, FaCross, FaFilter, FaMinus } from "react-icons/fa";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "./../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target.value)) {
      setIsSidebarOpen(false);
    }
  };

  // useEffect(() => {
  //   // Event listner for clicks
  //   document.addEventListener("mousedown", handleClickOutside);

  //   //clean event listener
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="flex flex-col  lg:flex-row">
      <button
        onClick={toggleSidebar}
        className={` ${
          isSidebarOpen ? "bg-stroke" : ""
        } lg:hidden min-w-[200px]  border border-stroke ml-auto p-3 flex justify-center rounded-lg items-center my-4 group hover:bg-stroke`}
      >
        <FaFilter className={` ${isSidebarOpen ? "text-primary" : ""} `} />
      </button>

      {/* Filter Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen grow max-w-64 z-50 bg-stroke overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        ref={sidebarRef}
      >
        <div
          className={` bg-stone-200 p-2 rounded-full cursor-pointer fixed top-5 right-5 lg:hidden `}
        >
          <FaMinus onClick={handleClickOutside} />
        </div>

        <FilterSidebar />
      </div>
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
