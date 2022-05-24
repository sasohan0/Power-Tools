import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://radiant-fortress-52880.herokuapp.com/adminOrders`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => setOrders(data));
    }
  }, [user, orders]);

  const handleShipped = async (id, order) => {
    const shipped = {
      order: id,
      transactionId: order.transactionId,
      address: order.address,
    };
    const confirmed = window.confirm("sure to approve?");
    if (confirmed) {
      await fetch(
        `https://radiant-fortress-52880.herokuapp.com/adminOrders/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(shipped),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("order approved for shipping");
          console.log(data);
        });
    }
  };

  const handleOrderCancel = (id) => {
    const confirmed = window.confirm("Sure to cancel?");
    if (confirmed) {
      fetch(`https://radiant-fortress-52880.herokuapp.com/orders/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("canceled order");
          console.log(data);
        });
    }
  };

  return (
    <div>
      <h2 className="flex justify-center text-3xl">
        All Orders: {orders.length}
      </h2>
      <p className="text-red-600 block sm:hidden ">
        Please scroll right to manage orders
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </p>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>

              <th className="sm:hidden  ">Product</th>
              <th className="sm:hidden">Quantity</th>
              <th>Total</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={order?.img}
                    alt=""
                  />
                </td>

                <td className="sm:hidden ">{order?.name}</td>
                <td className="sm:hidden ">{order?.orderQuantity}</td>
                <td>{order?.totalPrice}</td>
                <td>
                  {order?.totalPrice && !order?.paid && (
                    <>
                      <p className="btn btn-xs btn-red-100">Unpaid</p>
                      <button
                        onClick={() => handleOrderCancel(order._id)}
                        className="btn text-black btn-xs bg-red-500"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {order?.totalPrice && order?.paid && !order?.shipped && (
                    <div>
                      <p>
                        <span className="text-success">Pending</span>
                      </p>
                      <p>
                        Transaction id: <br />
                        <span className="text-red-400">
                          {order.transactionId}
                        </span>
                      </p>
                      <button
                        onClick={() => handleShipped(order._id, order)}
                        className="btn text-black btn-xs bg-green-500"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                  {order?.shipped && (
                    <div>
                      <p>
                        <span className="text-success">
                          Approved for Shipping
                        </span>
                      </p>
                      <p>
                        Transaction id: <br />
                        <span className="text-red-400">
                          {order.transactionId}
                        </span>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
