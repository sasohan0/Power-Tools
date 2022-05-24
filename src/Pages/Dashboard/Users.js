import React from "react";
import { useQuery } from "react-query";

import User from "./User";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://radiant-fortress-52880.herokuapp.com/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <p>loading....</p>;
  }
  return (
    <div>
      <h2 className="text-2xl text-center mb-4">All Users: {users.length}</h2>
      <p className="text-red-600 block sm:hidden ">
        Please scroll right to assign role
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
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <User
                key={user._id}
                index={index}
                user={user}
                refetch={refetch}
              ></User>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
