import React from "react";
import Hero from "./../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />
    </>
  );
};

export default Home;
