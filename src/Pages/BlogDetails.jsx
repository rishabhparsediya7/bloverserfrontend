import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Comments from "../Components/Comments";
import Loader from "../Components/Loader";
import createAxiosInstance from "../apiservice/api";
const BlogDetails = () => {
  const { blogid } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [blogState, setBlogState] = useState({
    title: "",
    description: "",
    image: null,
    createdBy: "",
    createdAt: "",
    uid: "",
  });
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("access_token");
        const api = createAxiosInstance(accessToken);
        const response = await api.get(`/api/blog/getBlog/${blogid}`);
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          return response.data.blog;
        } else {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    const getDetails = async () => {
      const [blogs] = await Promise.all([getBlog()]);
      const { title, author_name, createdAt, description, _id } = blogs;
      const blob = new Blob([Int8Array.from(blogs.image.data.data)], {
        type: blogs.image.contentType,
      });
      const imageSrc = window.URL.createObjectURL(blob);
      const date = new Date(createdAt.toString()).toLocaleDateString();
      const time = new Date(createdAt.toString()).toLocaleTimeString();
      setBlogState({
        ...blogState,
        title: title,
        createdAt: date + ", " + time,
        createdBy: author_name,
        description: description,
        imageSrc: imageSrc,
        _id: _id,
      });
      document.title = title;
    };
    if (localStorage.getItem("access_token") && localStorage.getItem("uuid")) {
      getDetails();
    } else {
      navigate("/");
    }
  }, [blogid]);
  return (
    <div>
      <Navbar />
      <div className="w-full px-6 sm:px-40 py-20">
        {loading ? (
          <Loader />
        ) : (
          <div className="shadow-md">
            <div className="w-full flex flex-col">
              <div className="">
                {blogState.imageSrc && (
                  <img
                    className="h-60 w-full rounded-md"
                    src={blogState.imageSrc}
                    alt=""
                  />
                )}
              </div>
              <div className="wholeblog flex flex-col gap-4 p-4">
                <h1 className="text-2xl sm:text-6xl font-bold">
                  {blogState.title}
                </h1>
                {blogState.createdBy && (
                  <p className="italic">
                    <small>Written by:</small>
                    {blogState.createdBy == null
                      ? `Anonymous`
                      : blogState.createdBy}
                  </p>
                )}
                <p>{blogState.createdAt}</p>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: blogState.description }}
                />
              </div>
              {blogState.title && (
                <Comments blogId={blogid} title={blogState.title} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
