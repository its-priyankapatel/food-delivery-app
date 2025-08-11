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
      <div className="flex h-screen bg-secondary">
        {/* First Section */}
        <img className="w-1/2 object-cover" src={SignUp} alt="Signup Visual" />
        {/* Second Section */}
        <div className="flex flex-col gap-4 bg-primary w-1/2 justify-center items-center p-8">
          <h3 className="text-2xl font-semibold text-tertiary text-center selection:text-tertiary selection:bg-primary">
            Create account
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-1/2">
            <input
              onChange={(e) => setName(e.target.value)}
              className="h-10 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="text"
              value={name}
              placeholder="Name"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="email"
              value={email}
              placeholder="E-mail"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 pl-2 bg-primary outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="password"
              value={password}
              placeholder="Password"
            />
            <input
              onChange={(e) => setLocation(e.target.value)}
              className="h-10 pl-2 bg-primary  outline-none rounded-sm text-tertiary placeholder:text-tertiary border border-tertiary"
              type="text"
              value={location}
              placeholder="Location"
            />
            <button
              onClick={handleAuthentication}
              type="submit"
              className="h-10 bg-tertiary text-primary font-semibold text-lg rounded-sm cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="pl-2 text-tertiary">
            Already have an account?{" "}
            <span
              className="text-tertiary cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
          <p className="text-tertiary">
            Are you Restaurant?{" "}
            <span
              onClick={() => navigate("/register/restaurant")}
              className="text-tertiary cursor-pointer font-bold"
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
