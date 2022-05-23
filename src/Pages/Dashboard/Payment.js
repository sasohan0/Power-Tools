import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KzgdMJVa6zVY99CaGts94G8qqJirQWPMAET7VBqrec0wWSxhuuRtgQNPA3SuwzjQKOv6QWwjgMWEfZ83N1qLNUU00IX1ciL6e"
);

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/orders/${id}`;

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
      <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div class="card-body">
          <p className="text-success font-bold">Hello, {order.email}</p>
          <h2 class="card-title">Please Pay for {order.name}</h2>
          <p>
            <img src={order.img} alt="" />
          </p>
          <p>Shipment address {order.address} pieces</p>
          <p>You ordered :{order.orderQuantity} pieces</p>
          <p>Please pay: ${order.totalPrice}</p>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointment={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
