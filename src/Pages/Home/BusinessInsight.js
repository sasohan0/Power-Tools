import React from "react";

const BusinessInsight = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">Top Manufacturer !</h2>
        <p className="text-green-600">More than 2M supplies last month !!</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInsight;
