import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ arrayList }) => {
  return (
    <div>
      {arrayList.map((e, index) => {
        const blob = new Blob([Int8Array.from(e.image.data.data)], {
          type: e.image.contentType,
        });
        const imageSrc = window.URL.createObjectURL(blob);
        const date = new Date(e.createdAt.toString()).toLocaleDateString();
        const time = new Date(e.createdAt.toString()).toLocaleTimeString();
        return (
          <div
            key={index}
            className="w-full mb-2 flex flex-col shadow-md md:flex-row h-[28rem] md:h-52"
          >
            <div className="w-full md:w-60 h-[14rem] md:h-full m-auto">
              <img
                className="w-full h-full custom-radius min-w-[10rem] md:custom-radius"
                src={imageSrc}
                alt={e.title}
              />
            </div>
            <div className="w-full py-2 h-full flex flex-col flex-grow m-auto px-2 sm:px-4 gap-2">
              <Link className="underline" to={`/blog/${e._id}`}>
                <h2 className="text-2xl sm:text-4xl truncate sm:w-[30rem] lg:font-bold">
                  {e.title}
                </h2>
              </Link>
              <p
                dangerouslySetInnerHTML={{ __html: e.description }}
                className="text-justify w-full overflow-y-hidden flex-grow text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  lineHeight: "30px",
                }}
              />
              <div className="flex items-center z-10">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={imageSrc}
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {e.author_name == "null" ? `Anonymous` : e.author_name}
                  </p>
                  <p className="text-gray-600">
                    {date} <small className="italic">{time}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
