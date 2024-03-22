import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {}, []);
  return (
    <div className="bg-white">
      {!localStorage.getItem("access_token") ? (
        <div className="bg-white">
          <Link
            to="/signin"
            className="inline-block text-sm p-4 leading-none border rounded text-black border-black hover:text-white hover:bg-black mt-4 lg:mt-0"
          >
            Sign in
          </Link>
          <a
            href="/signup"
            className="inline-block text-sm p-4 leading-none border rounded text-white border-white bg-black mt-4 ml-2 lg:mt-0"
          >
            Sign Up
          </a>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="inline-block text-sm p-4 leading-none border rounded text-white border-white bg-black mt-4 ml-2 lg:mt-0"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default SignIn;
