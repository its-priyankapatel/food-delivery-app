import React, { useContext, useState } from "react";
import SignUp from "../assets/SignUp.jpg";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();

  const { backendUrl, token, setToken, currencySymbol } =
    useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAuthentication = async () => {
    const { data } = await axios.post(backendUrl + "/api/auth/sign-up", {
      name,
      email,
      password,
      location,
    });
    if (data.success) {
      toast.success("User Registered Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setLocation("");
    } else {
      toast.error("Something went wrong, Please Register again");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col md:flex-row bg-gray-200">
        {/* First Section */}
        <div className="w-full md:w-0 h-50 md:h-0 flex justify-end">
          <div className="block md:hidden h-50 w-50 bg-orange-400 rounded-bl-full relative">
            <img
              className="w-[70%] md:w-1/2 h-[60%] md:h-full object-cover absolute top-8 left-13"
              src="https://res.cloudinary.com/dbbmvt91t/image/upload/v1756317392/afue9u11ryoi2xphises-removebg-preview_z3g9bu.png"
              alt="Signup Visual"
            />
          </div>
        </div>
        <img
          className="hidden md:block w-[30%] md:w-1/2 h-[15%] md:h-full object-cover"
          src={SignUp}
          alt="Signup Visual"
        />

        {/* Second Section */}
        <div className="flex flex-col gap-4 w-[90%]  h-[70%] md:h-full mx-5 md:mx-0 md:w-1/2 justify-center items-center p-3 md:p-8 bg-primary rounded-lg">
          <h3 className="text-lg md:text-xl font-semibold text-orange-400 text-center selection:text-primary selection:bg-orange-400 font-poppins">
            Create account
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:gap-6 w-80 md:w-100 justify-center items-center pt-3"
          >
            <div className="flex gap-1 w-70 md:w-80 border-b-2 border-orange-400 items-center">
              <FaUser className="size-3 md:size-4 text-orange-400" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="h-9 md:h-10 w-full md:w-80 pl-2 outline-none bg-transparent text-sm md:text-base rounded-sm text-orange-400 placeholder:text-orange-400 "
                type="text"
                value={name}
                placeholder="Name"
              />
            </div>
            <div className="flex gap-1 w-70 md:w-80 border-b-2 border-orange-400 items-center">
              <MdEmail className="size-4  md:size-5 text-orange-400" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 md:h-10 w-full md:w-80 pl-2 bg-transparent outline-none rounded-sm text-sm md:text-base text-orange-400 placeholder:text-orange-400"
                type="email"
                value={email}
                placeholder="E-mail"
              />
            </div>
            <div className="flex gap-1 w-70 md:w-80 border-b-2 border-orange-400 items-center">
              <RiLockPasswordFill className="size-4 md:size-5 text-orange-400" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 md:h-10 w-full md:w-80 pl-2 bg-transparent outline-none rounded-sm text-sm md:text-base text-orange-400 placeholder:text-orange-400"
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="flex gap-1 w-70 md:w-80 border-b-2 border-orange-400 items-center">
              <FaLocationDot className="size-4 md:size-5 text-orange-400" />
              <input
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 md:h-10 w-full md:w-80 pl-2 bg-transparent  outline-none rounded-sm text-sm md:text-base text-orange-400 placeholder:text-orange-400"
                type="text"
                value={location}
                placeholder="Location"
              />
            </div>
            <button
              onClick={handleAuthentication}
              type="submit"
              className="flex justify-center items-center h-9 md:h-10 w-24 md:w-26 bg-orange-400 rounded-full text-primary font-semibold text-sm md:text-base cursor-pointer transition duration-300 md:duration-600 active:opacity-70"
            >
              Register
            </button>
          </form>
          <p className="pl-2 text-orange-400 text-sm md:text-base">
            Already have an account?{" "}
            <span
              className="text-orange-400 cursor-pointer font-bold text-sm md:text-base"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
          <div className="w-[85%] md:w-[45%] flex gap-1 items-center">
            <div className="h-[1px]  bg-orange-500 w-1/2"></div>
            <p className="text-sm text-orange-500">OR</p>
            <div className="h-[1px] w-1/2 bg-orange-500"></div>
          </div>
          <p className="text-orange-400 text-sm md:text-base px-3">
            Are you Restaurant?{" "}
            <span
              onClick={() => navigate("/register/restaurant")}
              className="text-orange-400 cursor-pointer font-bold text-sm md:text-base"
            >
              Register Restaurant here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
