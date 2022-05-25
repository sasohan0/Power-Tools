import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(
        `https://radiant-fortress-52880.herokuapp.com/orders?email=${user.email}`,
        {
          method: "GET",
          headers: {
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
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
    Swal.fire({
      title: "Are you sure to cancel order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://radiant-fortress-52880.herokuapp.com/orders/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        Swal.fire("Canceled!", "Your order has been canceled.", "success");
      }
    });
  };

  return (
    <div>
      <h2 className="flex justify-center text-3xl mb-4">
        My Orders: {orders.length}
      </h2>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>

              <th className="hidden sm:flex"></th>
              <th className="hidden sm:flex"></th>
              <th className="hidden sm:flex"></th>
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

                <td className="hidden sm:flex">{order?.name}</td>
                <td className="hidden sm:flex">{order?.orderQuantity} pieces</td>
                <td className="hidden sm:flex"> ${order?.totalPrice}</td>
                <td>
                  {order?.totalPrice && !order?.paid && (
                    <>
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="btn btn-xs btn-success">
                          Payment
                        </button>
                      </Link>
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
                        <span className="text-success">{order?.shipped? 'Approved for shipping':'Already Paid' }</span>
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

export default MyOrders;
