import React, { useContext, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const RegisterRestaurant = () => {
  const signup =
    "https://res.cloudinary.com/dbbmvt91t/image/upload/v1752950481/def56e30-bea5-43fb-87e3-d961aac09fa9_mvx6qn.png";
  const { backendUrl } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [rating, SetRating] = useState(0);
  const [description, setDesription] = useState("");
  const navigate = useNavigate();
  const logo = "https://res.cloudinary.com/dbbmvt91t/image/upload/v1771624081/Untitled_design_mrdmxd.png";
  const registerRestaurant = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !location ||
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
          description,
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
      <div className="h-screen w-full px-4 md:px-24 font-poppins">
        <div className="flex h-full w-full mt-4">
          <div className="bg-primary h-auto w-1/4 rounded-t-full flex flex-col gap-2 items-center pt-6 pb-20">
            <div className="size-48 rounded-full border-2 border-white p-1 relative">
              <img src={logo} alt="restaurant logo" className="h-full rounded-full" />
              <div
                onClick={() => logoInput.current.click()}
                className='bg-primary size-12 rounded-full absolute flex items-center justify-center hover:scale-105 cursor-pointer bottom-2 right-2'>
                <FaCamera size={24} className='text-white' />
              </div>
            </div>
            <label htmlFor="logo" className="text-white">upload your logo</label>
          </div>
          <div className="bg-primary/5 h-auto w-full rounded-t-[20%] pt-32 px-5 pb-20">
            {/* name */}
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="name" className="font-semibold text-base">Restaurant Name</label>
                <p className="text-xs text-zinc-400">Enter your Restaurant or Hotel name</p>
              </div>
              <input type="text" className="h-10 bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* email and mobile */}
            <div className="flex justify-between mt-5 gap-10 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="email" className="font-semibold text-base">Email</label>
                  <p className="text-xs text-zinc-400">Enter your valid email address</p>
                </div>
                <input type="text" className="h-10 w-full bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="mobile" className="font-semibold text-base">Mobile</label>
                  <p className="text-xs text-zinc-400">Enter your valid contact number</p>
                </div>
                <input type="text" className="h-10 w-full bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
              </div>
            </div>

            {/* password */}
            <div className="flex flex-col gap-2 mt-5">
              <div>
                <label htmlFor="password" className="font-semibold text-base">Password</label>
                <p className="text-xs text-zinc-400">Enter a secure password for login</p>
              </div>
              <input type="password" className="h-10 bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 mt-5">
              <div>
                <label htmlFor="description" className="font-semibold text-base">Description</label>
                <p className="text-xs text-zinc-400">Enter a restaurant description or brief summary</p>
              </div>
              <textarea type="password" placeholder="Description" className="min-h-20 text-sm bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* Register & Login */}
            <div>
              <button></button>
              <div />
              <div>
                <p className="text-xs">already have an account?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterRestaurant;
