import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createAxiosInstance from "../apiservice/api";

const CustomModal = ({ state, blogId, toggleModal, setModalOpen }) => {
  const handleDelete = async () => {
    if (blogId) {
      try {
        const accessToken = localStorage.getItem("access_token");
        const api = createAxiosInstance(accessToken);
        const response = await api.delete(`/api/blog/delete`, {
          data: { blogId },
        });
        if (response.status == 200) {
          window.location.reload();
        }
      } catch (e) {
        console.log("error: ", e);
      }
    } else {
      console.log("No blog to delete!");
    }
  };
  return (
    <div className="border-2 bg-white shadow-md h-40 w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md z-50">
      <div className="flex justify-start flex-col align-middle py-2 px-6">
        <div
          className="flex cursor-pointer justify-end"
          onClick={() => setModalOpen(false)}
        >
          &#10060;
        </div>
        <div className="flex">
          <ul>
            <li className="bg-neutral-50/50 cursor-pointer rounded-md p-2">
              <Link to={`/edit-blog/${blogId}`}>Edit</Link>
            </li>
            <li
              className="bg-neutral-50/50 cursor-pointer rounded-md p-2"
              onClick={handleDelete}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
