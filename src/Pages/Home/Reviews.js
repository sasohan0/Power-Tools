import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Reviews = () => {
  const [user, loading] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`https://radiant-fortress-52880.herokuapp.com/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, [reviews]);
  return (
    <div id="reviews">
      <h1 className="text-center text-black text-4xl mt-5">
        Customer Reviews
      </h1>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-red-400 mt-4">
          Scroll to see reviews{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        </p>
      </div>
      <div className="mt-10  scroll-pl-6 bg-slate-600 rounded p-0 sm:p-8 pr-0 sm:pr-4 overflow-y-auto h-96">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card  w-60 sm:w-72 mx-auto bg-base-100 shadow-xl"
            >
              <div className="card-body ">
                <h2 className="card-title">{review.customerName}</h2>
                <p>{review.opinion}</p>
                <p>Rating :{review.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
