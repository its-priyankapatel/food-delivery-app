import React, { useContext, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterRestaurant = () => {
  const signup =
    "https://res.cloudinary.com/dbbmvt91t/image/upload/v1752950481/def56e30-bea5-43fb-87e3-d961aac09fa9_mvx6qn.png";
  const { backendUrl } = useContext(AppContext);
  const token = localStorage.getItem("token") || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [rating, SetRating] = useState(0);
  const [description, setDesription] = useState("");
  const navigate = useNavigate();

  const registerRestaurant = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !location ||
      !rating ||
      !time ||
      !description
    ) {
      return toast.error("Please input all the fields");
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/restaurant/add-restaurant",
        {
          name,
          email,
          password,
          mobile,
          address: location,
          time,
          rating,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Restaurant registered successfully");
        setName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setLocation("");
        setTime("");
        SetRating("");
        setDesription("");
        navigate("/login");
      } else {
        console.log(data);
        toast.error("Something went wrong, Please try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        className="flex h-screen w-full justify-center items-center bg-center bg-cover "
        style={{ backgroundImage: `url(${signup})` }}
      >
        <div className="flex flex-col justify-center items-center h-[90%] w-[40%] backdrop-blur-md rounded-lg shadow-lg shadow-black gap-5">
          <h3 className="text-2xl font-semibold text-white text-center mb-5 text-shadow-sm text-shadow-black/50 selection:bg-primary selection:text-tertiary">
            Register as a Restaurant
          </h3>

          <div className="w-full h-auto  flex flex-col items-center justify-center gap-5">
            <div className="w-full flex gap-4 justify-center">
              <input
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-[40%] pl-2  border-2 border-white outline-none rounded-md text-white placeholder:text-white focus:border-primary"
                type="text"
                value={name}
                placeholder="Enter Restaurant Name"
              />
              <input
                onChange={(e) => setLocation(e.target.value)}
                className="h-10 w-[40%] pl-2   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
                type="text"
                value={location}
                placeholder="Enter Restaurant Location"
              />
            </div>
            <div className="w-full flex gap-4 justify-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 pl-2 w-[40%]   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
                type="email"
                value={email}
                placeholder="E-mail"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 pl-2 w-[40%]   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="w-full flex gap-4 justify-center">
              <input
                onChange={(e) => setMobile(e.target.value)}
                className="h-10 w-[40%] pl-2   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
                type="text"
                value={mobile}
                placeholder="Mobile"
              />
              <input
                onChange={(e) => SetRating(e.target.value)}
                className="h-10 pl-2 w-[18%]   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
                type="number"
                value={rating}
                placeholder="Rating"
              />
              <input
                onChange={(e) => setTime(e.target.value)}
                className="h-10 pl-2 w-[19%]   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primarys"
                type="text"
                value={time}
                placeholder="Time"
              />
            </div>
            <textarea
              onChange={(e) => setDesription(e.target.value)}
              className="h-16 w-[82%] pl-2   border-2 outline-none  rounded-md text-white placeholder:text-white focus:border-primary"
              type="text"
              value={description}
              placeholder="Description"
            />
            <button
              onClick={registerRestaurant}
              className="h-10 w-24 bg-primary text-tertiary font-semibold text-lg  rounded-md cursor-pointer focus:border-primary"
            >
              Register
            </button>
          </div>
          <p className="pl-2">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterRestaurant;
