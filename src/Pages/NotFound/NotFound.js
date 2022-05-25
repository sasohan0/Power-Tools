import React from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import notfound from '../../images/NotFound.jpg'


const NotFound = () => {

    const navigate=useNavigate()
    Swal.fire({
      title: "Oops 404 Not Found!",
      text: "Maybe You mistyped of entered wrong url",
      imageUrl: "https://i.ibb.co/GxryLC5/shutterstock-314579021-400x200.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Return to home",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    return (
      <div
        className="hero min-h-screen"
        style={{backgroundImage: `url(${notfound})`}}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Page Doesn't Exist</h1>
            
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    );
};

export default NotFound;