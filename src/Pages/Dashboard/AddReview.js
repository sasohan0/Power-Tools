import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);
  console.log(user.email);
  useEffect(() => {
    if (user) {
      fetch(
        `https://radiant-fortress-52880.herokuapp.com/userReviews?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
    await fetch("https://radiant-fortress-52880.herokuapp.com/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("successfully added");
      });
  };
  return (
    <div>
      <div className="w-fit mx-auto">
        <h1 className="text-2xl my-4 flex justify-center">Add a review</h1>
        <form
          className=""
          onSubmit={(e) => {
            handlePostReview(e);
          }}
          action=""
        >
          <textarea
            id="review"
            name="review"
            rows="4"
            cols="50"
            maxLength="200"
            className="border-4"
          ></textarea>{" "}
          <br />
          <input
            className="border-4 w-full"
            name="rating"
            type="number"
            placeholder="enter rating out of 5"
          />
          <br />
          <input
            className="btn btn-success text-white w-full"
            type="submit"
            value="Post Review"
          />{" "}
        </form>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2  gap-10">
        {reviews.map((review) => (
          <div>
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{review.customerName}</h2>
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
