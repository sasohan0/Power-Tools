import React from "react";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import Banner from "../Banner";
import BusinessInsight from "../BusinessInsight";
import Reviews from "../Reviews";
import Suggestions from "../Suggestions";
import Tools from "../Tools";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Tools></Tools>
      <BusinessInsight></BusinessInsight>
      <Reviews></Reviews>
      <Suggestions></Suggestions>
      <Footer></Footer>
    </div>
  );
};

export default Home;
