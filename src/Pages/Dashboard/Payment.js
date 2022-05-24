import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L2VoOB8aLgAG5B05GlyAHhMSChwwquIJuxdO2hRMwK7TAH1gjMeeTFuF4wSOtFmAJEUYJmTGODvxLfWH8cqRauh00Mxhy0MGV"
);

const Payment = () => {
  const { id } = useParams();
  const url = `https://radiant-fortress-52880.herokuapp.com/orders/${id}`;

  const { data: order, isLoading } = useQuery(["orders", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className=" font-bold">
            Greetings,{" "}
            <span className="text-2xl text-purple-900">{order.userName}</span>
          </p>
          <h2 className="card-title">Please Pay for {order.name}</h2>
          <p>
            <img src={order.img} alt="" />
          </p>
          <p>Shipment address {order.address} pieces</p>
          <p>You ordered :{order.orderQuantity} pieces</p>
          <p>Please pay: ${order.totalPrice}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
