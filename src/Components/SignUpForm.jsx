import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonLoader from "./ButtonLoader";

const SignUpForm = ({ handleToggle }) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    userExists: "",
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors({
        ...errors,
        email: "Invalid email",
      });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/user/mail-otp`, {
        email: email,
        fullname: fullname,
      });
      if (response.status == 200) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("uuid", response.data.userId);
        setEmail("");
        setLoading(false);
        handleToggle();
        setErrors({
          email: "",
          userExists: "",
        });
      }
      if (response.status === 409)
        throw new Error("The User has already been registerd! Try Login");
    } catch (error) {
      setLoading(false);
      setErrors({
        ...errors,
        message: "The User has already been registerd! Try Login",
      });
    } finally {
      setEmail("");
      setFullname("");
    }
  };
  return (
    <div className="flex flex-col -z-50">
      {loading ? (
        <ButtonLoader />
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center -z-20 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              We welcome you on BlogVerse
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errors.message && (
              <div className="flex flex-col sm:flex-row justify-center align-middle">
                <p className="text-black text-sm font-semibold rounded-md p-0.5 text-center">
                  {errors.message} with this email account.
                </p>
                <Link className="font-bold text-base m-auto" to="/signin">
                  Signin
                </Link>
              </div>
            )}
            <form className="space-y-6" onSubmit={(e) => handleSignUp(e)}>
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    autoComplete="current-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
