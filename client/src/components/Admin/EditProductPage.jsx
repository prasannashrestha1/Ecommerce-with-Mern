import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const EditProductPage = () => {
  const [image, setImage] = useState([]);
  const [productData, setProductData] = useState({
    _id: 13232,
    name: "shirt",
    description: "shirt",
    price: 110,
    sku: "11123",
    countInStock: 0,
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://randomwordgenerator.com/img/picture-generator/5ee0d3454a56b10ff3d8992cc12c30771037dbf85257714d742d7ed5964b_640.jpg",
      },
      {
        url: "https://randomwordgenerator.com/img/picture-generator/5ee0d3454a56b10ff3d8992cc12c30771037dbf85257714d742d7ed5964b_640.jpg",
      },
    ],
  });

  const handleChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const imageUrl = e.target.files[0];
    console.log(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/*  */}
        <div className="flex mb-6 flex-col w-full gap-4 sm:flex-row">
          {/* name */}
          <div className=" grow">
            <label className="block font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="inpt"
              required
            />
          </div>
          {/* sizes */}
          <div className="grow">
            <label className="block font-semibold mb-2">
              Sizes (comma-seperated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(",")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                })
              }
              className="inpt"
              required
            />
          </div>
        </div>
        {/* Description */}
        <div className=" grow">
          <label className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            rows={4}
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="inpt"
            required
          />
        </div>
        {/* Price & sizes */}
        <div className="flex mb-6 flex-col w-full gap-4 sm:flex-row">
          {/* Price */}
          <div className=" grow">
            <label className="block font-semibold mb-2">Product Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="inpt"
              required
            />
          </div>
          {/* sku */}
          <div className="grow">
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="inpt"
              required
            />
          </div>
        </div>
        {/* Countin stock and sizes */}
        <div className="flex mb-6 flex-col w-full gap-4 sm:flex-row">
          {/* count in stock */}
          <div className=" grow">
            <label className="block font-semibold mb-2">Count in stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="inpt"
              required
            />
          </div>
          {/* sizes */}
          <div className="grow">
            <label className="block font-semibold mb-2">
              colors (comma-seperated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(",")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                })
              }
              className="inpt"
              required
            />
          </div>
        </div>
        {/* Image Upload*/}
        <div className=" grow">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} required />
          <div className="flex gap-4 mt-4">
            {productData.images.map((img, index) => (
              <div key={index} className="relative w-20 group h-20 shadow-md">
                <img
                  src={img.url}
                  className="object-cover w-full h-full rounded-2xl  border border-tsecondary"
                />
                {/* remove image from the product */}
                <div className="absolute top-0  items-center justify-center w-full h-full hidden group-hover:flex group-hover:bg-black/20 rounded-2xl">
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black/80 mt-3 text-white rounded-md p-2 hover:bg-black transition-colors cursor-pointer"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
