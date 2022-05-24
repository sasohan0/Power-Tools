import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";

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
    return <Loading></Loading>;
  }

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://radiant-fortress-52880.herokuapp.com/tools/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            toast.success("Product deleted");
            console.log(data);
          });
      }
    });
  };
  return (
    <div>
      <h2 className="flex justify-center text-3xl">
        All Products: {tools.length}
      </h2>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>

              <th className=" hidden sm:flex"></th>
              <th className="hidden sm:flex"></th>
              <th className="hidden sm:flex"></th>
              <th>Manage</th>
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

                <td className="hidden sm:flex"> {tool?.name}</td>
                <td className="hidden sm:flex ">${tool?.price}</td>
                <td className="hidden sm:flex">available {tool?.available}</td>
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
