import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BG from "../component/BG/BG";
import { PiForkKnifeFill } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { notify } from "../utils/notification.jsx";
const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, currencySymbol } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAuthentication = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });
      if (data.success) {
        notify("User Logged In Successfully")
        localStorage.setItem("userToken", data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Please login again");
    }
  };
  return (
    <>
      <div className="relative w-full h-screen md:h-auto flex justify-center font-poppins">
        <div className="fixed h-screen w-full -z-10">
          <BG />
        </div>
        <div className="bg-white flex flex-col w-full md:w-1/2 items-center py-2 px-4 md:px-8 min-h-screen h-full md:h-auto">
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="h-14 w-14 rounded-full bg-yellow-400 flex justify-center items-center">
              <PiForkKnifeFill className="text-4xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-black">
              Welcome Back
            </h3>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue ordering
            </p>
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-4 md:gap-2 justify-center items-center p-2 md:p-4 rounded-lg border border-[rgba(0,0,0,0.3)] mt-3 md:mt-5">
            <div className="w-full text-center">
              <h1 className="text-xl md:text-2xl font-extrabold text-black">
                Login
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Enter your credentials to access your account
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center w-full gap-3 mt-0 md:mt-2"
            >
              <div className="w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="flex items-center h-10 border border-[rgba(0,0,0,0.1)] rounded-lg p-2 gap-2 focus-within:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]">
                  <AiOutlineMail className="text-base text-gray-700" />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="outline-none text-sm w-full"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="flex items-center h-10 border border-[rgba(0,0,0,0.1)] rounded-lg p-2 gap-2 focus-within:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]">
                  <MdLockOutline className="text-base text-gray-700" />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="Enter your Password"
                    className="outline-none text-sm w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleAuthentication}
                type="submit"
                className="h-10 bg-orange-400 text-black font-semibold rounded-sm  text-sm md:text-base cursor-pointer md:transition  md:duration-600 md:active:opacity-70 active:scale-95"
              >
                Login
              </button>
            </form>
            <div className="w-full flex gap-1 items-center">
              <div className="h-px w-1/2 bg-gray-700"></div>
              <p className="text-sm text-gray-700">OR</p>
              <div className="h-px w-1/2 bg-gray-700"></div>
            </div>
            <button
              onClick={() => navigate("/login/restaurant")}
              className="h-10 w-full bg-gray-700 text-white font-semibold rounded-sm  text-sm md:text-base cursor-pointer"
            >
              Login as Restaurant
            </button>
          </div>
          <p className="mt-3 md:mt-3 text-sm text-gray-700">
            New User?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="cursor-pointer font-bold text-orange-400"
            >
              Sign Up
            </span>
          </p>
          <p className="text-[11px] text-gray-700 font-medium mt-3">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
