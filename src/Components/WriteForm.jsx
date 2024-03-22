import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import createAxiosInstance from "../apiservice/api";

const WriteForm = () => {
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleWriteBlog = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("access_token") && localStorage.getItem("uuid")) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", heading);
      formData.append("author_name", localStorage.getItem("author_name"));
      formData.append("description", editorHtml);
      formData.append("author_id", localStorage.getItem("uuid"));
      formData.append("image", image);
      const accessToken = localStorage.getItem("access_token");
      const api = createAxiosInstance(accessToken);
      const response = await api.post(`/api/blog/create`, formData);
      if (response.status == 201) {
        setLoading(false);
        setHeading("");
        setEditorHtml("");
        setImage(null);
      }
    } else {
      setError("You should be login to continue with writing a Blog!");
      setLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleWriteBlog}>
      <div className="space-y-12">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-4xl text-indigo-300">
                Publishing the blog. Hold for a sec.
              </h1>
              <div className="border-t-8 border-blue-500 border-solid h-16 w-16 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  Write a blog based on your interest.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
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
  );
};

export default WriteForm;
