import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [user1] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user1);

  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery("tools", () =>
    fetch("https://radiant-fortress-52880.herokuapp.com/tools", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <p>loading....</p>;
  }

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm("Sure to delete?");
    if (confirmed) {
      fetch(`https://radiant-fortress-52880.herokuapp.com/tools/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          console.log(data);
          toast.success("successfully deleted");
        });
    }
  };
  return (
    <div>
      <h2 className="flex justify-center text-3xl">
        All Product: {tools.length}
      </h2>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>

              <th className="  ">Product</th>
              <th className="sm:hidden">Quantity</th>
              <th>available</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, index) => (
              <tr key={tool._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={tool?.img}
                    alt=""
                  />
                </td>

                <td className=" ">{tool?.name}</td>
                <td className="sm:hidden ">{tool?.price}</td>
                <td>{tool?.available}</td>
                <td>
                  <button
                    onClick={() => handleDeleteProduct(tool._id)}
                    className="btn text-black btn-xs bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
