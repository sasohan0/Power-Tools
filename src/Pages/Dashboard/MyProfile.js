import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(
        `https://radiant-fortress-52880.herokuapp.com/users?email=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProfile(data);
        });
    }
  }, [user, profile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const location = e.target.location.value;
    const phone = e.target.phone.value;
    const education = e.target.education.value;
    const linkedIn = e.target.linkedIn.value;

    const profile = {
      email: email,
      location: location,
      phone: phone,
      education: education,
      linkedIn: linkedIn,
    };

    Swal.fire({
      title: "Are you sure to update?",
      text: "You can update anytime",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://radiant-fortress-52880.herokuapp.com/users?email=${email}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(profile),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Updated!", "Your profile has been updated.", "success");
            toast.success("successfully updated");
          });
      }
    });
  };
  return (
    <div className="my-20">
      <h1 className="text-2xl">
        Welcome to your profile{" "}
        <span className="font-bold">{user?.displayName}</span>{" "}
      </h1>
      <div>
        <div className="card w-64 sm:w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <p>
              <span className="text-purple-900">Email</span> : {user?.email}
            </p>
            <p>
              <span className="text-purple-900">Location</span> :{" "}
              {profile[0]?.location}
            </p>
            <p>
              <span className="text-purple-900">Phone</span> :{" "}
              {profile[0]?.phone}
            </p>
            <p>
              <span className="text-purple-900">Education</span> :{" "}
              {profile[0]?.education}
            </p>
            <p>
              <span className="text-purple-900">LinkedIn Profile</span> :{" "}
              <a
                className="text-red-400"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile[0]?.linkedIn}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl mt-4 flex justify-center">Update Profile</h1>
        <form onSubmit={(e) => handleUpdateProfile(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Email</span>
              <input
                name="email"
                type="text"
                defaultValue={user?.email}
                disabled
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Location</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Location</span>
              <input
                name="location"
                type="text"
                placeholder="your city and district"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Number</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Phone</span>
              <input
                name="phone"
                type="number"
                placeholder="your cell no"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Education</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Education</span>
              <input
                name="education"
                type="text"
                placeholder="your education"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your LinkedIn Profile</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>LinkedIn Profile</span>
              <input
                name="linkedIn"
                type="text"
                placeholder="your LinkedIn Profile"
                className="input input-bordered"
              />
            </label>
          </div>
          <input
            className="btn btn-black w-full mt-4 hover:bg-red-800"
            type="submit"
            value="Update Profile"
          />
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
