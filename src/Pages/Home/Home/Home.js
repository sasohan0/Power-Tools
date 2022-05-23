import React from "react";
import Footer from "../../Shared/Footer";

import Banner from "../Banner";
import BusinessInsight from "../BusinessInsight";
import Sale from "../Sale";
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
      <Sale></Sale>
      <Suggestions></Suggestions>
      <Footer></Footer>
    </div>
  );
};

export default Home;
