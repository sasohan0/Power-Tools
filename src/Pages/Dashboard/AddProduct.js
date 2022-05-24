import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const product = {
      name: data.name,
      img: data.image,
      shortDescription: data.shortDescription,
      minOrder: parseInt(data.minOrder),
      available: parseInt(data.available),
      price: parseInt(data.price),
    };
    Swal.fire({
      title: "Are you sure to add product?",
      text: "You can delete it anytime!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://radiant-fortress-52880.herokuapp.com/tools", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((inserted) => {
            if (inserted.insertedId) {
              Swal.fire("Added!", "Your Product has been added.", "success");
              toast.success("Product added successfully");
              reset();
            } else {
              toast.error("Failed to add the Product");
            }
          });
      }
    });
    // send to your database
  };

  return (
    <div>
      <h2 className="text-2xl">Add a New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image Link</span>
          </label>
          <input
            type="text"
            placeholder="Image link"
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Image link is Required",
              },
            })}
          />
          <label className="label">
            {errors.image?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.image.message}
              </span>
            )}
          </label>
        </div>
        {/* Details */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Short Description</span>
          </label>
          <input
            type="text"
            placeholder="Short Description"
            className="input input-bordered w-full max-w-xs"
            {...register("shortDescription", {
              required: {
                value: true,
                message: "shortDescription is Required",
              },
            })}
          />
          <label className="label">
            {errors.shortDescription?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.shortDescription.message}
              </span>
            )}
          </label>
        </div>
        {/* Minimum Order */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Minimum Order</span>
          </label>
          <input
            type="number"
            placeholder="Minimum Order"
            className="input input-bordered w-full max-w-xs"
            {...register("minOrder", {
              required: {
                value: true,
                message: "Minimum Order is Required",
              },
            })}
          />
          <label className="label">
            {errors.minOrder?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.minOrder.message}
              </span>
            )}
          </label>
        </div>
        {/* Available */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Available</span>
          </label>
          <input
            type="number"
            placeholder="Maximum Order"
            className="input input-bordered w-full max-w-xs"
            {...register("available", {
              required: {
                value: true,
                message: "Available is Required",
              },
            })}
          />
          <label className="label">
            {errors.available?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.available.message}
              </span>
            )}
          </label>
        </div>
        {/* Price */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            placeholder="enter price"
            className="input input-bordered w-full max-w-xs"
            {...register("price", {
              required: {
                value: true,
                message: "price is Required",
              },
            })}
          />
          <label className="label">
            {errors.price?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.price.message}
              </span>
            )}
          </label>
        </div>

        <input
          className="btn w-full max-w-xs text-white"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddProduct;
