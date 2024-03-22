import React, { useState } from "react";
import SignIn from "./SignIn";
import logo from "../assets/LOGO.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const nav = [
    { name: "Home", href: "/home" },
    { name: "Write", href: "/write" },
    { name: "Profile", href: "/profile" },
  ];
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  return (
    <nav className="flex bg-white items-center justify-between flex-wrap shadow-md p-4">
      <Link to="/" className="flex items-center flex-shrink-0 text-black mr-6">
        <img className="w-12 h-12" src={logo} alt="" />
        <span className="font-semibold text-2xl tracking-tight">BlogVerse</span>
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-black border-black "
          onClick={toggleNav}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <div
        className={`w-full bg-white z-50 block flex-grow lg:flex lg:items-center lg:w-auto ${
          isNavOpen ? "" : "hidden"
        }`}
      >
        <div className="text-sm z-50 bg-white lg:flex-grow">
          {nav.map((e, index) => (
            <a
              key={index}
              href={e.href}
              className="block mt-4 lg:inline-block p-4 rounded-md lg:mt-0 text-black hover:bg-black hover:text-white mr-4"
            >
              {e.name}
            </a>
          ))}
        </div>
        <SignIn />
      </div>
    </nav>
  );
};

export default Navbar;
