import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileBlogs = ({ allBlogs, toggleModal }) => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className="h-[16rem] grid grid-cols-3 gap-1">
      {allBlogs.map((e, index) => {
        const blob = new Blob([Int8Array.from(e.image.data.data)], {
          type: e.image.contentType,
        });
        const imageSrc = window.URL.createObjectURL(blob);
        return (
          <div
            onClick={() => handleNavigate(e._id)}
            className="flex relative h-[10rem] sm:h-[18rem]"
            key={index}
          >
            <div
              className="absolute z-40 right-2 cursor-pointer top-2"
              onClick={(event) => {
                event.stopPropagation();
                toggleModal(e._id);
              }}
            >
              <span className="hidden">{e._id}</span>
              <div className="bg-slate-100/50 w-8 h-8 rounded-full flex justify-center align-middle">
                <i className="bi bi-three-dots-vertical text-xl"></i>
              </div>
            </div>
            <img className="w-full" src={imageSrc} alt="" />
            <div className="absolute bg-slate-900/50 h-full w-full px-2 py-3 md:p-12">
              <h1 className="text-sm sm:text-2xl font-bold text-white">
                {e.title}
              </h1>
              <h3 className="text-sm sm:text-xl text-white">{e.User}</h3>
              <h5 className="text-sm sm:text-base text-white italic">
                {e.date}
              </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileBlogs;
