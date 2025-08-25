import React, { useContext, useState } from "react";
import SignUp from "../assets/SignUp.jpg";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RestaurantLogin from "./RestaurantLogin";

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
        toast.success(data.message);
        localStorage.setItem("userToken", data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in User Login");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-primary md:flex-row">
        {/* First Section */}
        <img
          className="order-2 md:order-1 w-full h-[40%] md:h-full md:w-1/2 object-cover"
          src={SignUp}
          alt="Signup Visual"
        />
        {/* Second Section */}
        <div className="order-1 md:order-2 flex flex-col gap-2 md:gap-4 w-full md:w-1/2 justify-center items-center p-8 h-[70%] md:h-full">
          <h3 className="text-xl md:text-2xl font-semibold text-tertiary text-center selection:text-tertiary selection:bg-primary">
            Welcome Back! Login to your account
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-[70%] md:w-1/2"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 md:h-10 pl-2 text-md  text-sm md:text-base bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="email"
              value={email}
              placeholder="E-mail"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 pl-2 outline-none rounded-sm text-sm md:text-base  text-tertiary placeholder:text-tertiary border border-tertiary"
              type="password"
              value={password}
              placeholder="Password"
            />

            <button
              onClick={handleAuthentication}
              type="submit"
              className="h-10 bg-tertiary text-white font-semibold rounded-sm  text-sm md:text-base cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="pl-2 text-tertiary text-sm md:text-base">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-tertiary font-semibold underline"
              onClick={() => navigate("/sign-up")}
            >
              Sign up here
            </span>
          </p>
          <p className="text-sm md:text-base text-tertiary">
            Login as a{" "}
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => navigate("/login/restaurant")}
            >
              Restaurant
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
