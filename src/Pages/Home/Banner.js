import React from "react";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage: `url("banner3.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-white font-bold">
            Welcome To Power Tools
          </h1>
          <p className="mb-5 text-slate-100">
            We are a manufacturing company. We manufacture quality products and
            provide service on time
          </p>
          <a href="#reviews" className="btn btn-dark text-white">
            See Reviews
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
