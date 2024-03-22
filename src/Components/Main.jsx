import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import EmptyBlogs from "./EmptyBlogs";
import createAxiosInstance from "../apiservice/api";
import BlogList from "./BlogList";

const Main = () => {
  const [array, setArray] = useState([]);
  const [end, setEnd] = useState(8);
  const [arrayList, setArrayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLoad = () => {
    setEnd((prev) => prev + 8);
  };
  const getBlogs = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const api = createAxiosInstance(accessToken);
      const response = await api.get(`/api/blog/allblogs`);
      if (response.status == 200) {
        setArrayList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status == 400 || err.response.status == 403)
        navigate("/signin");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/");
    else getBlogs();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/");
    setArrayList((prevList) => {
      return [...prevList, ...array.slice(prevList.length, end)];
    });
  }, [array, end]);
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row px-2 md:px-32">
        <div className="flex-1 flex-grow">
          {!loading ? (
            <div className="w-full flex flex-col p-4 md:p-10 gap-4">
              {arrayList.length > 0 ? (
                <BlogList arrayList={arrayList} />
              ) : (
                <EmptyBlogs />
              )}
            </div>
          ) : (
            <Loader />
          )}
          {!loading && arrayList.length > 8 && (
            <div className="w-full flex justify-center m-auto">
              <button
                onClick={handleLoad}
                className="btn bg-black px-10 py-4 text-white"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
