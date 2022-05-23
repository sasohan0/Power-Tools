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
      <div className="overflow-x-auto ">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>

              <th className="sm:hidden  ">Product</th>
              <th className="sm:hidden">Quantity</th>
              <th>Total</th>
              <th>Payment</th>
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
                  {order?.totalPrice && order?.paid && (
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
