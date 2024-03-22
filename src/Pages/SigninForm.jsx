import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import createAxiosInstance from "../apiservice/api";
import ButtonLoader from "../Components/ButtonLoader";
const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    message: "",
  });
  let disabled;
  if (password && email) {
    disabled = false;
  } else {
    disabled = true;
  }
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password || !email) {
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setLoading(false);
      return;
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setLoading(false);
      return;
    }
    try {
      const accessToken = localStorage.getItem("access_token");
      const api = createAxiosInstance(accessToken);
      const response = await api.post(`/api/user/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200 && response.data.authenticated) {
        localStorage.setItem("uuid", response.data.uuid);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("author_name", response.data.author_name);
        setLoading(false);
        navigate("/");
      } else {
        setErrors({
          ...errors,
          message: response.data.message,
        });
      }
    } catch (e) {
      // console.log(e);
      setErrors({
        ...errors,
        message: e.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      {loading ? (
        <ButtonLoader />
      ) : (
        <div className="w-full -z-20 sm:w-[30rem] absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
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
                      id="password"
                      name="password"
                      type={`${view ? `text` : `password`}`}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <i
                      onClick={() => setView(!view)}
                      className={`bi bi-eye-${
                        view ? "fill" : "slash"
                      } text-lg text-gray-400 absolute right-4 cursor-pointer top-1`}
                    ></i>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
