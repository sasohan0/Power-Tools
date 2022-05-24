import React from "react";
import background from "../../images/portfolio.jpg";

const Portfolio = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content  text-neutral-content">
        <div className="max-w-md text-white ">
          <h1 className="mb-5 text-5xl text-red-200 font-bold text-center">
            Greetings
          </h1>
          <small className="text-red-300 ml-8">I am</small>
          <h2 className="text-3xl text-red-300 font-bold ml-8">
            Solih Ahmad Sohan
          </h2>
          <p className="ml-8 mt-4 ">
            {" "}
            <span className="text-red-200 font-bold ">Email</span> :
            sasohanme@gmail.com
          </p>
          <p className="ml-8 mt-4">
            <span className="text-red-200 font-bold">Education</span> :{" "}
          </p>
          <p className="text-center">
            BSS Hons 2nd Year <br />
            HSC in Science (5.00) <br />
            SSC in Science (5.00)
          </p>

          <p className="ml-8 mt-4">
            <span className="text-red-200 font-bold">Expertise</span> :{" "}
          </p>
          <p className="text-center">
            MongoDB,ExpressJS, <br /> ReactJS , NodeJS (MERN Stack), <br />
            Bootstrap, Tailwind ,Stripe,etc
          </p>

          <p className="ml-8 mt-4">
            <span className="text-red-200 font-bold">My Projects</span> :{" "}
            <span className=" ml-20 flex flex-col  align-center ">
              <a
                className=" text-red-300 text-center bg-black p-1 rounded-lg"
                href="https://book-verse-8b615.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Book Verse
              </a>{" "}
              <br />
              <a
                className=" text-red-300 text-center bg-black p-1 rounded-lg"
                href="https://photophilia-4e65a.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                PhotoPhilia
              </a>{" "}
              <br />{" "}
              <a
                className=" text-red-300 text-center bg-black p-1 rounded-lg"
                href="https://do-be-done-final.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                DoBeDone (simple)
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
