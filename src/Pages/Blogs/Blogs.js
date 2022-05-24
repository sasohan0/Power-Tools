import React from "react";

const Blogs = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600">
            How will you improve the performance of a React Application?
          </h2>
          <p>
            I will Keep component state local where needed. Using components to
            minimize repeated actions. Dynamic import() and code splitting. Load
            images in lazy loading. Using production build before development. I
            will avoid anonymous functions.
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <p>
            Different types of states are: Local state, Global state, Server
            state, URL state,etc Local states are usually managed by useState
            hook. Global state data is managed across multiple components.
            Server states comes from external server . Managing it is quite
            hard. useEffect is used for reading updates of state. Context api is
            also a way of managing state
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600">
            How does prototypical inheritance work?
          </h2>
          <p>
            It is a javascript feature. It is used for adding methods and
            properties in objects. By this method an object can inherit the
            properties and methods of another object. Traditionally, in order to
            get and set the [[Prototype]] of an object, we use Object.
            getPrototypeOf and Object.setPrototypeOf. But today it is done by
            __proto__
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600">
            Why you do not set the state directly in React. For example, if you
            have const [products, setProducts] = useState([]). Why you do not
            set products = [...] instead, you use the setProducts ?
          </h2>
          <p>
            Because React only works in one way render. When we call setProducts
            it changes the state of products and tells react to re-render the
            state of products. If our products are in an object initially and we
            need to change only one element we can call and change the value of
            that property using setProducts but doing it manually needs to
            declare the entire object.
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600">
            You have an array of products. Each product has a name, price,
            description, etc. How will you implement a search to find products
            by name?
          </h2>
          <p>
            i will use the array.find() function to search a product by name.
            like below.
            <pre>
              {`let arr = [
{ name:"product 1", price:200, 
description: "product 1 description" },
{ name:"product 2", price:3200,
description: "product 2 description" }   
];

let obj =
 arr.find(o => o.name === 'string 1');

console.log(obj)`}
            </pre>
          </p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-red-600 ">
            What is a unit test? Why should write unit tests?
          </h2>
          <p>
            Unit testing is a testing method . This means verifying the output
            of a function or component for a given input. For React components,
            this means checking that the component renders correctly for the
            specified props. Writing unit tests means that we write code that
            verifies that our code works as expected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
