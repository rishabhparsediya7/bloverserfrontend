import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jfif";
import createAxiosInstance from "../apiservice/api";
const Comments = ({ blogId, title }) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [reply, setReply] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const comments = [
    {
      commentBy: "Rishabh",
      comment: "Lorem ipsum dolor Sit 👲",
      replies: [],
      replyTog: false,
    },
    {
      commentBy: "Rishabh",
      comment: "Lorem ipsum dolor Sit 👲",
      replies: [],
      replyTog: false,
    },
    {
      commentBy: "Rishabh",
      comment: "Lorem ipsum dolor Sit 👲",
      replies: [],
      replyTog: false,
    },
    {
      commentBy: "Rishabh",
      comment: "Lorem ipsum dolor Sit 👲",
      replies: [],
      replyTog: false,
    },
  ];

  const getComments = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const api = createAxiosInstance(accessToken);
      const response = await api.get(`${BASE_URL}/api/comment/${blogId}`);
      if (response.status === 200) {
        setCommentList(response.data.comments);
      }
    } catch (e) {
    }
  };
  const handlePostComment = async () => {
    if (!comment) {
      return;
    }
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");
    const api = createAxiosInstance(accessToken);
    const response = await api.post(`/api/comment/`, {
      email: localStorage.getItem("email"),
      userId: localStorage.getItem("uuid"),
      comment: comment,
      blogId: blogId,
      blogTitle: title,
    });
    if (response.status === 200) {
      setLoading(false);
      getComments();
      setComment("");
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-col">
        <div className="mb-4">
          <h1 className="text-xl text-gray-500 uppercase tracking-wider font-bold">
            comments
          </h1>
        </div>
        <div className="mb-4 w-full flex gap-2">
          <img src={avatar} className="w-12 h-12" alt="" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border-b-2 border-gray-400 focus:border-b-2 outline-none"
          />
          <button
            onClick={handlePostComment}
            className="w-32 sm:w-40 max-h-8 mt-4 bg-black rounded-md text-base tracking-wider uppercase sm:text-lg text-white"
          >
            Post
          </button>
        </div>
        {commentList.map((c, index) => (
          <div key={index} className="w-full flex align-middle gap-2">
            <div className="w-20 justify-center align-middle h-20">
              <img className="rounded-full" src={avatar} alt="" />
            </div>
            <div className="w-full flex flex-col my-auto align-middle text-sm">
              <h1>{c.email}</h1>
              <p>{c.comment}</p>
              {c.replies.length > 0 && <p>More comments</p>}
              <div className="flex">
                {!c.replyTog ? (
                  <div className="flex gap-2 cursor-pointer text-indigo-500">
                    <div
                      className="cursor-pointern bg-yellow-300 text-gray-500 px-1 rounded-md text-[0.7rem]"
                      onClick={() => handleReplyToggle(index)}
                    >
                      Reply
                    </div>
                    <div>See more replies</div>
                  </div>
                ) : (
                  <div className="flex justify-center gap-2">
                    <input
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="border-b-2 border-gray-400 focus:border-b-2 outline-none"
                    />
                    <button>{loading ? `Loading` : `Post`}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
