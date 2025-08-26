import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import BG from "../component/BG/BG";
import { PiChefHatBold } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { backendUrl } = useContext(AppContext);

  const handleAuthentication = async () => {
    const { data } = await axios.post(
      backendUrl + "/api/auth/restaurant-login",
      {
        email,
        password,
      }
    );
    if (data.success) {
      toast.success(data.message);
      localStorage.setItem("restaurantToken", data.token);
      setEmail("");
      setPassword("");
      navigate("/restaurant-dashboard");
    } else {
      toast.error("Error in User Login");
    }
  };
  return (
    <>
       <div className="relative w-full h-screen md:h-auto flex justify-center font-poppins">
        <div className="fixed h-screen w-full -z-10">
          <BG />
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center py-4 px-4 md:px-8 h-full md:h-auto bg-white ">
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="h-18 w-18 rounded-full bg-yellow-400 flex justify-center items-center">
              <PiChefHatBold className="text-5xl" />
            </div>
            <h3 className="text-3xl font-extrabold text-black">Welcome Back Chef!</h3>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue serving
            </p>
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-4 md:gap-2 justify-center items-center p-6 rounded-lg border border-[rgba(0,0,0,0.3)] mt-8 md:mt-5">
            <div className="w-full text-center">
              <h1 className="text-2xl font-extrabold text-black">Login</h1>
              <p className="text-sm text-gray-600 mt-2">
                Enter your credentials to access your account
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center w-full gap-4 mt-2"
            >
              <div className="w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="flex items-center h-10 border border-[rgba(0,0,0,0.1)] rounded-lg p-2 gap-2 focus-within:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]">
                  <AiOutlineMail className="text-base text-gray-700" />
                  <input
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
                  required
                    type="text"
                    placeholder="Enter your Password"
                    className="outline-none text-sm w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleAuthentication}
                type="submit"
                className="h-10 bg-orange-400 text-black font-semibold rounded-sm  text-sm md:text-base cursor-pointer"
              >
                Login
              </button>
            </form>
            <div className="w-full flex gap-1 items-center">
              <div className="h-[1px] w-1/2 bg-gray-700"></div>
              <p className="text-sm text-gray-700">OR</p>
              <div className="h-[1px] w-1/2 bg-gray-700"></div>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="h-10 w-full bg-gray-700 text-white font-semibold rounded-sm  text-sm md:text-base cursor-pointer"
            >
              Login as User
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-700">New Restaurant? <span
          onClick={()=>navigate('/register/restaurant')}
           className="cursor-pointer text-orange-400 font-extrabold">Sign Up</span></p>
          <p className="text-[11px] text-gray-700 font-medium mt-3">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
