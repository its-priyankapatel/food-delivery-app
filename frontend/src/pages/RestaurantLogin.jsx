import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

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
      <div className="w-full h-screen flex flex-col bg-primary md:flex-row">
        {/* First Section */}
        {/* <img className="w-1/2 object-cover" src={SignUp} alt="Signup Visual" /> */}
        <div className="md:w-1/2 w-full md:border-r-2 border-b-2 h-[30%] md:h-full"></div>
        {/* Second Section */}
        <div className="flex flex-col gap-2 md:gap-4 w-full md:w-1/2 justify-center items-center p-8 h-[70%] md:h-full">
          <h3 className="text-2xl font-semibold text-tertiary text-center selection:text-tertiary selection:bg-primary">
            Welcome Chef! Login to your restaurant account
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
              onClick={() => navigate("/login")}
            >
              User
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
