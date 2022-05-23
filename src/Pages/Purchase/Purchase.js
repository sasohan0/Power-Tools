import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Purchase = () => {
  const [user, loading] = useAuthState(auth);
  const { toolId } = useParams();
  const [toolDetail, setToolDetail] = useState({});

  useEffect(() => {
    const url = `https://radiant-fortress-52880.herokuapp.com/tools/${toolId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setToolDetail(data));
  }, [toolId]);

  const handlePlaceOrder = async (e, toolDetail, toolId) => {
    e.preventDefault();
    const email = e.target?.email.value;
    const address = e.target?.address.value;
    const phone = e.target?.phone.value;
    const orderQuantity = e.target?.orderQuantity.value;
    const order = {
      name: toolDetail.name,
      img: toolDetail.img,
      email: email,
      address: address,
      phone: phone,
      orderQuantity: orderQuantity,
      totalPrice: parseInt(orderQuantity) * parseInt(toolDetail.price),
      paid: false,
    };

    if (
      orderQuantity > toolDetail.minOrder &&
      orderQuantity < toolDetail.available
    ) {
      let { available, ...rest } = toolDetail;
      available = parseInt(available) - parseInt(orderQuantity);

      const newToolDetail = { available, ...rest };

      setToolDetail(newToolDetail);
      const updatedQuantity = { available };
      await fetch(
        `https://radiant-fortress-52880.herokuapp.com/tools/${toolId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedQuantity),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      await fetch("https://radiant-fortress-52880.herokuapp.com/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("successfully added");
        });
    } else {
      alert("enter valid quantity");
    }
  };
  return (
    <div className="">
      <div className="card mx-auto lg:max-w-lg bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={toolDetail.img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{toolDetail.name}</h2>
          <p>{toolDetail.shortDescription}</p>
          <p>Minimum Order: {toolDetail.minOrder} Pieces</p>
          <p>Available: {toolDetail.available} Pieces</p>
          <p>Price: $ {toolDetail.price}</p>
        </div>
      </div>
      <div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Book Your Order Now
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                handlePlaceOrder(e, toolDetail, toolId);
              }}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm -space-y-px ">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  defaultValue={user?.email}
                />

                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Address"
                />

                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="current-phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Phone Number"
                />

                <input
                  id="order-quantity"
                  name="orderQuantity"
                  type="number"
                  autoComplete="order-quantity"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Order Quantity"
                />
              </div>

              <input
                type="submit"
                value="Place Order"
                className="btn btn-secondary w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
