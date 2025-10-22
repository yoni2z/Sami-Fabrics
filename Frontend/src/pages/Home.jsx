import React from "react";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import AboutUs from "../components/AboutUs";
import RecentProducts from "../components/RecentProducts";

const Home = () => {

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <AboutUs />
      <RecentProducts />
    </>
  );
};

export default Home;
