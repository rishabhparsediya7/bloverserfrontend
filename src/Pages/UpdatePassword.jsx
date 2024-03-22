import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "../apiservice/api";

const UpdatePassword = () => {
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkList, setCheckList] = useState({
    lower: false,
    capital: false,
    special: false,
    length: false,
  });
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const handleInput = (e) => {
    const value = e.target.value;
    setPassword1(value);
    setCheckList((prevState) => ({
      ...prevState,
      capital: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      special: /[!@#$%^&*()_+]/.test(value),
      length: value.length >= 8,
    }));
  };
  const { lower, capital, length, special } = checkList;
  const disabled = lower && capital && length && special && password2;
  const handleForm = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return;
    }
    try {
      const accessToken = localStorage.getItem("access_token");
      const api = createAxiosInstance(accessToken);
      const response = await api.post(`/api/user/create`, {
        uuid: localStorage.getItem("uuid"),
        email: localStorage.getItem("email"),
        password: password1,
        name: name,
      });
      if (response.status === 200 && response.data.success) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("author_name", response.data.author_name);
        navigate("/");
      } else {
        setErrors({
          ...errors,
          message: response.data.message,
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="">
        <div className=" w-[20rem] absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Update your password
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {errors.message && (
                <div className="flex flex-col sm:flex-row justify-center align-middle">
                  <p className="text-black text-sm font-semibold rounded-md p-0.5 text-center">
                    {errors.message} with this email account.
                  </p>
                  <Link className="font-bold text-base m-auto" to="/signup">
                    Signup
                  </Link>
                </div>
              )}
              <form className="space-y-6" onSubmit={(e) => handleForm(e)}>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-black"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password1"
                      name="password"
                      type={`${view1 ? `text` : `password`}`}
                      autoComplete="current-password"
                      value={password1}
                      onChange={(e) => handleInput(e)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <i
                      onClick={() => setView1(!view1)}
                      className={`bi bi-eye-${
                        view1 ? "fill" : "slash"
                      } text-lg text-gray-400 absolute right-4 cursor-pointer top-1`}
                    ></i>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={`${view2 ? `text` : `password`}`}
                      autoComplete="current-password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <i
                      onClick={() => setView2(!view2)}
                      className={`bi bi-eye-${
                        view2 ? "fill" : "slash"
                      } text-lg text-gray-400 absolute right-4 cursor-pointer top-1`}
                    ></i>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full mt-4 rounded-md">
            {password1 && (
              <ul className="flex flex-col justify-center rounded-md gap-2 p-2 transition-all">
                {checkList.lower && (
                  <li className="flex gap-2">
                    <div className="rounded-full bg-black h-8 w-8 flex justify-center align-middle">
                      <i className="bi bi-check text-xl m-auto text-white"></i>
                    </div>
                    <div>
                      <p>Small Letter</p>
                    </div>
                  </li>
                )}
                {checkList.capital && (
                  <li className="flex gap-2">
                    <div className="rounded-full bg-black h-8 w-8 flex justify-center align-middle">
                      <i className="bi bi-check text-xl text-white"></i>
                    </div>
                    <div>
                      <p>Capital Letter</p>
                    </div>
                  </li>
                )}
                {checkList.special && (
                  <li className="flex gap-2">
                    <div className="rounded-full bg-black h-8 w-8 flex justify-center align-middle">
                      <i className="bi bi-check text-xl text-white"></i>
                    </div>
                    <div>
                      <p>Special Letter</p>
                    </div>
                  </li>
                )}
                {checkList.length && (
                  <li className="flex gap-2">
                    <div className="rounded-full bg-black h-8 w-8 flex justify-center align-middle">
                      <i className="bi bi-check text-xl text-white"></i>
                    </div>
                    <div>
                      <p>Length greatern than 8</p>
                    </div>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
