import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Reviews = () => {
  const [user, loading] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://radiant-fortress-52880.herokuapp.com/reviews`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
        });
    }
  }, [user]);
  return (
    <div>
      <h1 className="flex justify-center text-4xl">Customer Reviews</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map((review) => (
          <div key={review._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{review.customerName}</h2>
              <p>{review.opinion}</p>
              <p>Rating :{review.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
