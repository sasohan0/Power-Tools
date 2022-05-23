import React from "react";
import Countdown from "react-countdown";

const Sale = () => {
  return (
    <div className="mt-10">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Mid Year Sale Ends In</h1>
            <Countdown
              className="countdown font-mono text-5xl mt-5"
              date={Date.now() + 1000000000}
            />{" "}
            <br />
            <a href="#products " className="btn btn-dark mt-5">
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;