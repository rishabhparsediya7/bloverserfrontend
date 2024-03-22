import React from "react";
import Navbar from "../Components/Navbar";
import WriteForm from "../Components/WriteForm";

const Write = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full p-4 md:px-40 md:py-20">
        <WriteForm />
      </div>
    </div>
  );
};

export default Write;
