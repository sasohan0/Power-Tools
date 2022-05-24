import React from "react";
import { useNavigate } from "react-router-dom";

const Tool = ({ tool }) => {
  const navigate = useNavigate();
  const handleBuyNow = (id) => {
    navigate(`/tools/${id}`);
  };
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={tool.img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{tool.name}</h2>
        <p>{tool.shortDescription}</p>
        <p>Minimum Order: {tool.minOrder} Pieces</p>
        <p>Available: {tool.available} Pieces</p>
        <p>Price: $ {tool.price}</p>
        <button
          onClick={() => handleBuyNow(tool._id)}
          className=" btn btn-dark text-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Tool;
