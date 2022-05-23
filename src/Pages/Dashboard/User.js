import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";

const User = ({ user, refetch }) => {
  const [user1] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user1);
  const { email, role } = user;
  const handleMakeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("failed! only admin can do this");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Admin assigned successfully`);
        }
      });
  };
  return (
    <tr>
      <th>1</th>
      <td>{email}</td>
      <td>
        {role !== "admin" ? (
          <button onClick={handleMakeAdmin} className="btn btn-xs">
            Assign Admin
          </button>
        ) : (
          <button className="btn btn-xs bg-red-800">ADMIN</button>
        )}
      </td>
      <td>
        <button className="btn btn-xs">Remove User</button>
      </td>
    </tr>
  );
};

export default User;
