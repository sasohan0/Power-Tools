import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import auth from "../../firebase.init";

const Suggestions = () => {
  const [user, loading] = useAuthState(auth);
  const handleSuggestion = async (e) => {
    const email = e.target.email.value;
    const opinion = e.target.opinion.value;
    const suggestion = {
      email: email,
      opinion: opinion,
    };
    e.preventDefault();
    if (email && opinion) {
      await fetch("https://radiant-fortress-52880.herokuapp.com/suggestions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(suggestion),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          toast.success("suggestion added.You are awesome !");
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out the form first",
      });
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("suggestion.jpg")`,
      }}
      className="hero min-h-screen bg-base-200 mt-10 bg-opacity-80"
    >
      <div className=" hero-overlay bg-opacity-30"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className=" p-4 sm:p-8 text-white max-w-80 text-center lg:text-left bg-gradient-to-r from-slate-500 to-transparent  rounded-lg">
          <h1 className=" text-2xl  sm:text-5xl font-bold">Your Suggestions</h1>
          <p className="py-6">Suggest Us How to Improve.</p>
        </div>
        <div className="card flex-shrink-0 w-full sm:max-w-sm shadow-2xl bg-base-100">
          <form
            className="text-black w-52 sm:w-full"
            onSubmit={(e) => handleSuggestion(e)}
            action=""
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your email or name</span>
                </label>
                <input
                  type="text"
                  name="email"
                  defaultValue={user && user.email}
                  placeholder="email or name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Suggestion</span>
                </label>
                <textarea
                  type="text"
                  name="opinion"
                  placeholder="suggestion"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-dark"
                  type="submit"
                  value="Send Suggestion"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
