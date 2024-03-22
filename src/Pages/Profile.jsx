import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import CustomModal from "../Components/CustomModal";
import ProfileBlogs from "../Components/ProfileBlogs";
import Loader from "../Components/Loader";
import createAxiosInstance from "../apiservice/api";
import avatar from "../assets/avatar.jfif";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [profileState, setProfileState] = useState({});

  const toggleModal = (id) => {
    setModalOpen(true);
    // console.log(id);
    setBlogId(id);
  };
  const getBlogsWithUserID = async (uuid) => {
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const api = createAxiosInstance(access_token);
      const response = await api.get(`/api/blog/author/${uuid}`);
      if (response.status == 200) {
        setAllBlogs(response.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      // console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };
  const getProfile = async (uuid) => {
    const accessToken = localStorage.getItem("access_token");
    const api = createAxiosInstance(accessToken);
    const response = await api.get(`/api/user/${uuid}`);
    setProfileState({ ...response.data });
    const image = response.data?.image;
    if (image) {
      const blob = new Blob([Int8Array.from(response.data.image.data.data)], {
        type: response.data.image.contentType,
      });
      setImageSrc(window.URL.createObjectURL(blob));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("uuid")) {
      const uuid = localStorage.getItem("uuid");
      Promise.all([getProfile(uuid), getBlogsWithUserID(uuid)]);
    }
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      {modalOpen && (
        <CustomModal
          state={modalOpen}
          blogId={blogId}
          toggleModal={toggleModal}
          setModalOpen={setModalOpen}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center align-middle flex-col">
          {imageSrc ? (
            <img
              className="rounded-full w-40 h-40 mt-4 mx-auto md:h-56 md:w-56"
              src={imageSrc}
              alt={profileState.fullname}
            />
          ) : (
            <div className="relative">
              <input type="file" className="hidden" id="imageupload" />
              <label htmlFor="imageupload">
                <button className="absolute top-[90%] left-1/2 transform bg-black/50 text-white -translate-x-1/2 -translate-y-1/2  rounded-sm text-[14px] px-4 py-2">
                  Upload Image
                </button>
                <img
                  className="rounded-full w-40 h-40 mt-4 mx-auto md:h-56 md:w-56"
                  src={avatar}
                  alt={"Some random image"}
                />
              </label>
            </div>
          )}
          <div className="flex flex-col relative justify-center w-full border-[1rem] border-white rounded-full">
            <div className="flex justify-around flex-row gap-4 mt-3 sm:mb-12">
              <Link
                to="/edit-profile"
                className="bg-black rounded-md w-fit px-4 py-3 text-white"
              >
                Edit Profile
              </Link>
              <Link
                to="/write"
                className="bg-black rounded-md w-fit px-4 py-3 text-white"
              >
                Write a Blog
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col sm:gap-3 items-center gap-2">
            <h1 className="text-4xl">{profileState.fullname}</h1>
            <h3 className="text-2xl">
              {profileState.designation !== undefined
                ? profileState.designation
                : `Designation`}
            </h3>
            <p className="md:w-1/2 px-4 text-center">{profileState.bio}</p>
            <div className="w-full p-2 md:px-36">
              <ProfileBlogs toggleModal={toggleModal} allBlogs={allBlogs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
