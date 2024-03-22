import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = ({ length }) => {
  const [time, setTime] = useState(30);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [finalOtp, setFinalOtp] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    const newValue = value.substring(0, 1);
    newOtp[index] = newValue;
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      setDisabledSubmit(!disabledSubmit);
      setFinalOtp(combinedOtp);
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    let emsg = "";
    const verifyOtp = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/user/verify-otp`, {
          email: localStorage.getItem("email"),
          otp: finalOtp,
        });
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("verified", true);
          setOtp(new Array(length).fill(""));
          setLoading(false);
          navigate("/update-password");
        } else if (response.status === 403) {
          setWrongOtp(true);
          emsg = response.data.message;
          setOtp(new Array(length).fill(""));
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setWrongOtp(true);
        setEMessage(emsg);
        setLoading(false);
      }
    };
    verifyOtp();
  };

  const [timeInterval, setTimeInterval] = useState(null);

  const startTimer = () => {
    let intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  };

  // Assuming setTime and setTimeInterval are defined elsewhere

  useEffect(() => {
    startTimer();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="p-4 m-auto">
        <h1 className="uppercase text-4xl">We welcome you</h1>
      </div>
      <div className="p-4 m-auto">
        <h2 className="text-center">
          Enter the OTP you have received on your mail{" "}
          <strong> {localStorage.getItem("email")}</strong>
        </h2>
      </div>
      <div className="px-4 flex gap-2 justify-center">
        {otp &&
          otp.map((digit, index) => (
            <input
              key={index}
              onClick={() => handleClick(index)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(inp) => (inputRefs.current[index] = inp)}
              value={digit}
              className="rounded-md w-12 h-12 border-[2px] px-4 text-xl border-black"
              type="text"
              required
            />
          ))}
      </div>
      {wrongOtp && <p>{eMessage}</p>}
      <div className="flex w-full justify-evenly my-2">
        <p>Resend OTP in: 00:{time}</p>
        {time <= 0 && (
          <button className="bg-black text-white rounded-md px-4 py-1">
            Resend
          </button>
        )}
      </div>
      <div className="p-4">
        <button
          className="uppercase w-full py-2 border-slate-500 bg-black rounded-md text-white"
          onClick={handleVerifyOTP}
        >
          {loading ? (
            <div className="m-auto flex justify-center">
              <div className="w-8 h-8 border-t-4 rounded-full border-gray-500 animate-spin"></div>
            </div>
          ) : (
            <div>Verify OTP</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
