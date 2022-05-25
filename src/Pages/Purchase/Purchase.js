import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const Purchase = () => {
  const [user, loading] = useAuthState(auth);
  const { toolId } = useParams();
  const [toolDetail, setToolDetail] = useState({});
  const [quantity,setQuantity]=useState(0)
  const [disabled,setDisabled]=useState(true)

  useEffect(()=>{
    
      if (quantity <= toolDetail.available && quantity >= toolDetail.minOrder) {
        setDisabled(false);
        console.log(quantity);
        console.log(disabled);
      }
      else if (quantity > toolDetail.available || quantity < toolDetail.minOrder) {
        setDisabled(true);
        console.log(disabled);
        console.log(quantity);
      }
  },[quantity])

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
      userName: user?.displayName,
      img: toolDetail.img,
      email: email,
      address: address,
      phone: phone,
      orderQuantity: orderQuantity,
      totalPrice: parseInt(orderQuantity) * parseInt(toolDetail.price),
      paid: false,
    };

    if (
      orderQuantity >= toolDetail.minOrder &&
      orderQuantity <= toolDetail.available
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
          toast.success("successfully ordered");
        });
    } else {
      toast.error("enter valid quantity");
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto mt-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <h2 className=" text-center text-3xl font-extrabold text-gray-900">
                Book Your Order Now <br />
                <span className="text-success">{user?.displayName}</span>
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
                  onChange={(e)=>{setQuantity(e.target.value)}}
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
                disabled={disabled}
                value="Place Order"
                className="btn btn-dark w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
