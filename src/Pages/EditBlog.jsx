import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import ReactQuill from "react-quill";
import createAxiosInstance from "../apiservice/api";

const EditBlog = () => {
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();
  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (blogId) {
      console.log(blogId);
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("access_token");
        const api = createAxiosInstance(accessToken);
        const response = await api.put(`/api/blog/editBlog`, {
          _id: blogId,
          title: heading,
          description: editorHtml,
        });
        console.log(response);
        if (response.status == 200) {
          navigate("/");
        } else {
          setError(response.data.message);
        }
      } catch (e) {
        console.log("error: ", e);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No blog to edit!");
    }
  };
  useEffect(() => {
    const getBlogData = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("access_token");
        const api = createAxiosInstance(accessToken);
        const response = await api.get(`/api/blog/getBlog/${blogId}`);
        if (response.status == 200) {
          const tempData = response.data.blog;
          const bData = tempData.image.data.data;
          const blob = new Blob([Int8Array.from(bData)], {
            type: tempData.image.contentType,
          });
          setHeading(tempData.title);
          setEditorHtml(tempData.description);
          setImageSrc(window.URL.createObjectURL(blob));
        } else {
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    setAuthorized(localStorage.getItem("uuid") ? true : false);
    if (localStorage.getItem("access_token")) getBlogData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-full p-4 md:px-40 md:py-20">
        {authorized ? (
          <form onSubmit={handleEdit}>
            <div className="space-y-12">
              {loading ? (
                <Loader />
              ) : (
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <img
                        className="h-80 w-full rounded-md"
                        src={imageSrc}
                        alt=""
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Heading of the Blog
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md ring-1 shadow-sm sm:max-w-lg">
                          <input
                            type="text"
                            name="heading"
                            id="heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            autoComplete="heading"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Blog name..."
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Blog Content
                      </label>
                      <div className="mt-2">
                        <ReactQuill
                          theme="snow"
                          value={editorHtml}
                          onChange={handleEditorChange}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Edit a blog based on your interest.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-start">
                    {error && (
                      <p className="text-base bg-indigo-300 rounded-md p-2">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={localStorage.getItem("uuid") ? false : true}
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        ) : (
          <div>Hey There please sign in to continue!</div>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
