import React, { useEffect, useState } from "react";
import Form from "../Components/Form";
import Navbar from "../Components/Navbar";
const EditProfile = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full p-4 md:px-40 md:py-20">
        <Form />
      </div>
    </div>
  );
};

export default EditProfile;
