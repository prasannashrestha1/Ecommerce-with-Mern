import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SortOptions from "./SortOptions";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"];

  //handles the filter affect
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  //updates the url which is used in handlefilter change.
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
      setSearchParams(params);
      navigate(`?${params.toString()}`);
    });
  };

  const handlePriceRange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  //this runs everytime the url changes and updates the filter
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],

      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);
  return (
    <div className=" w-full h-full overflow-y-scroll px-6 py-12">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>
      {/* Categoory Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-50"
            />
            <span className="text-gray-700 text-sm">{category}</span>
          </div>
        ))}
      </div>
      {/* Gender Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-50"
            />
            <span className="text-gray-700 text-sm">{gender}</span>
          </div>
        ))}
      </div>

      {/* Colors Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              style={{ backgroundColor: color.toLowerCase() }}
              className={` ${
                filters.color.includes(color) && "outline-2 outline-primary"
              } w-7 h-7 rounded-full cursor-pointer border border-primary/20 hover:scale-105 transition ease-in duration-150`}
            ></button>
          ))}
        </div>
      </div>
      {/* size filter */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Sizes</label>
        <div className="flex flex-wrap text-sm space-x-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center mb-1 ">
              <input
                type="checkbox"
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700 "> {size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2">Material</label>
        <div className="flex flex-wrap space-x-4 text-sm">
          {materials.map((material) => (
            <div key={material} className="flex items-center mb-0.5 ">
              <input
                type="checkbox"
                name="material"
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700 "> {material}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2">Brand</label>
        <div className=" text-sm gap-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-1 ">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700 "> {brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
