import React from "react";
import emptycart from "../assets/emptycart.jpg";
import { Link } from "react-router-dom";
const EmptyBlogs = () => {
  return (
    <div className="w-full text-center ">
      <div className="flex flex-col justify-center align-middle">
        <img className="w-[25rem] m-auto" src={emptycart} alt="" />
        <h1 className="text-indigo-600 font-bold">
          No blogs to show. Add one. <Link to="/write" className="underline">Write a blog</Link>
        </h1>
      </div>
    </div>
  );
};

export default EmptyBlogs;
