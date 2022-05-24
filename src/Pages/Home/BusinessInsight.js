import React from "react";
import business from "../../images/Business.jpg";
const BusinessInsight = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${business})`,
      }}
      className="hero min-h-screen"
    >
      <div className="  p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="card w-72 bg-purple-900 bg-opacity-90 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white">Top Manufacturer !</h2>
            <p className="text-slate-200">
              More than 2M supplies last month !!
            </p>
            <div className="card-actions text-white justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="card w-72 bg-purple-900 bg-opacity-90  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white">Best in Quality !</h2>
            <p className="text-slate-200">
              All Products are of best quality !!
            </p>
            <div className="card-actions text-white justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="card w-72 bg-purple-900 bg-opacity-90  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white">Sincere About Your Time !</h2>
            <p className="text-slate-200">On Time shipping !!</p>
            <div className="card-actions text-white justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInsight;
