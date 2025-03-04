import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className=" w-full flex py-4 justify-end bg-red-50 ">
      <select
        name=""
        onChange={handleSortChange}
        className="border border-gray-200 p-2 text-sm rounded-md focus:outline-none"
        id="sort"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity"> Popularity </option>
      </select>
    </div>
  );
};

export default SortOptions;
