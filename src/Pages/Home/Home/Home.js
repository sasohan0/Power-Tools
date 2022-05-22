import React from "react";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import Banner from "../Banner";
import BusinessInsight from "../BusinessInsight";
import Reviews from "../Reviews";
import Tools from "../Tools";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Tools></Tools>
      <BusinessInsight></BusinessInsight>
      <Reviews></Reviews>
      <Footer></Footer>
    </div>
  );
};

export default Home;
