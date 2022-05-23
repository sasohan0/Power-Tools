import React, { useEffect, useState } from "react";
import Tool from "./Tool";

const Tools = () => {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch("https://radiant-fortress-52880.herokuapp.com/tools")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  return (
    <div id="products" className="my-28">
      <div className="text-center">
        <h3 className="text-primary  text-4xl font-bold uppercase mb-5">
          Our Products
        </h3>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tools.map((tool) => (
          <Tool key={tool._id} tool={tool}></Tool>
        ))}
      </div>
    </div>
  );
};

export default Tools;
