import React, { useEffect, useState } from "react";

const SearchBlog = ({ list }) => {
  const [searchString, setSearchString] = useState("");
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    setBlogList(list);
  }, [list]);
  useEffect(() => {
    setBlogList(() =>
      list.filter((l) =>
        l.title.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  },[searchString]);

  return (
    <div className="w-96 p-5">
      <div className="w-full flex flex-col">
        <input
          className="shadow appearance-none border border-t-0 border-l-0 border-r-0 border-slate-500 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-2"
          id="username"
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search blog"
        />
        <div className="cus-h">
          <ul className="flex flex-col h-full custom-scrollbar overflow-y-scroll gap-1 py-2">
            {blogList.map((e, index) => {
              const blob = new Blob([Int8Array.from(e.image.data.data)], {
                type: e.image.contentType,
              });
              const imageSrc = window.URL.createObjectURL(blob);
              const date = new Date(
                e.createdAt.toString()
              ).toLocaleDateString();
              const time = new Date(
                e.createdAt.toString()
              ).toLocaleTimeString();
              return (
                <li className="p-2 bg-gray-300 mr-2 rounded-md" key={index}>
                  <div className="w-full h-full flex items-center">
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={imageSrc}
                      alt={e.title}
                    />
                    <div className="text-sm w-full">
                      <p className="text-gray-900 w-60 font-bold truncate text-lg leading-none">
                        {e.title}
                      </p>
                      <p className="w-full text-gray-600 text-cust-font flex justify-between">
                        {date} <small>{time}</small>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBlog;
