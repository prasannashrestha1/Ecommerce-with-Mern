import React, { useEffect, useState } from "react";
import Hero from "./../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

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
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    // fetch products for a specific colleciton
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENE_URL}/api/product/getBestSellerProduct`
        );
        setBestSellerProduct(response.data.bestSeller);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4 ">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading Best seller product</p>
      )}

      <div className=" my-5 mx-auto p-4">
        <h2 className="mx-auto text-2xl font-medium text-center my-8">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </>
  );
};

export default Home;
