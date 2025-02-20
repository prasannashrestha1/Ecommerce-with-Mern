import React from "react";
import Hero from "./../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = [
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

const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4 ">Best Seller</h2>
      <ProductDetails />
      <div className=" my-5 mx-auto p-4">
        <h2 className="mx-auto text-2xl font-medium text-center my-8">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </>
  );
};

export default Home;
