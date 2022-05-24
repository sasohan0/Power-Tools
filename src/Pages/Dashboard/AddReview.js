import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(
        `https://radiant-fortress-52880.herokuapp.com/userReviews?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
        });
    }
  }, [user, reviews]);
  const handlePostReview = async (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;
    const rating = e.target.rating.value;
    const review = {
      email: user?.email,
      customerName: user?.displayName,
      opinion: reviewText,
      rating: rating,
    };
    if (rating > 5) {
      toast.error("Maximum Rating is 5");
    } else if (rating < 1) {
      toast.error("Minimum rating is 1");
    } else if (!reviewText) {
      toast.error("Please give short opinion");
    } else {
      await fetch("https://radiant-fortress-52880.herokuapp.com/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Added Review Successfully");
        });
    }
  };
  return (
    <div className="w-56 sm:w-full ">
      <div className="sm:w-fit mx-auto">
        <h1 className="text-2xl my-4 flex justify-center">Add a review</h1>
        <form
          className=""
          onSubmit={(e) => {
            handlePostReview(e);
          }}
          action=""
        >
          <input
            type="text"
            id="review"
            name="review"
            rows="4"
            cols="50"
            maxLength="200"
            placeholder="your opinion here"
            className="border-4 w-full h-32 mb-4"
          ></input>{" "}
          <br />
          <input
            className="border-4 w-full"
            name="rating"
            type="number"
            placeholder="enter rating out of 5"
          />
          <br />
          <input
            className="btn btn-black text-white w-full"
            type="submit"
            value="Post Review"
          />{" "}
        </form>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2  gap-10">
        {reviews.map((review) => (
          <div key={review._id}>
            <div className="card w56 sm:w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{review.customerName}</h2>
                <p>{review.opinion}</p>
                <p>Rating :{review.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddReview;
