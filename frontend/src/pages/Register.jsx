import React, { useContext, useState } from "react";
import SignUp from "../assets/SignUp.jpg";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      toast.success("User Registration Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setLocation("");
    } else {
      toast.error("Error in User Registration");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col md:flex-row bg-primary">
        {/* First Section */}
        <img
          className="order-2 md:order-1 w-full md:w-1/2 h-[40%] md:h-full object-cover"
          src={SignUp}
          alt="Signup Visual"
        />
        {/* Second Section */}
        <div className="order-1 md:order-2 flex flex-col gap-4 w-full md:w-1/2 justify-center items-center  p-3 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold text-tertiary text-center selection:text-tertiary selection:bg-primary">
            Create account
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:gap-6"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              className="h-9 md:h-10 w-60 md:w-88 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="text"
              value={name}
              placeholder="Name"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 md:h-10 w-60 md:w-88 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="email"
              value={email}
              placeholder="E-mail"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="h-9 md:h-10 w-60 md:w-88 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="password"
              value={password}
              placeholder="Password"
            />
            <input
              onChange={(e) => setLocation(e.target.value)}
              className="h-9 md:h-10 w-60 md:w-88 pl-2 bg-primary  outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="text"
              value={location}
              placeholder="Location"
            />
            <button
              onClick={handleAuthentication}
              type="submit"
              className="h-9 md:h-10 w-60 md:w-88 bg-tertiary text-primary font-semibold text-lg md:text-md rounded-sm cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="pl-2 text-tertiary text-base md:text-md">
            Already have an account?{" "}
            <span
              className="text-tertiary cursor-pointer font-bold text-base md:text-md"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
          <p className="text-tertiary text-base md:text-md px-3">
            Are you Restaurant?{" "}
            <span
              onClick={() => navigate("/register/restaurant")}
              className="text-tertiary cursor-pointer font-bold text-base md:text-md"
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
