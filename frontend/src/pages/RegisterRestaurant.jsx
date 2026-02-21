import React, { useContext, useRef, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { uploadToCloudinary } from "../utils/config/CloudinaryUploads";
import { useNotification } from "../component/shared/notificationProvider";
import Loading from "../component/ui/Loading";


const RegisterRestaurant = () => {
  const { showNotification } = useNotification()
  const logoInput = useRef()
  const [width, setWidth] = useState(0)
  const [loading, setLoading] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    description: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const logo = "https://res.cloudinary.com/dbbmvt91t/image/upload/v1771624081/Untitled_design_mrdmxd.png";
  const appLogo = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771054099/tasto_qoukrq.png";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];
      if (!file) return;

      setRegistrationData((prev) => ({
        ...prev,
        logo: file,     // store REAL file
      }));

      setLogoPreview(URL.createObjectURL(file)); // only for preview
    } else {
      setRegistrationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setWidth(0)
      setLoading(true)

      // Upload logo first
      let logoUrl = null;

      if (registrationData.logo) {
        const logoResult = await uploadToCloudinary({
          file: registrationData.logo,
          onProgress: (pct) => {
            console.log("Uploading:", pct + "%");
            setWidth(pct)
          }
        });

        logoUrl = logoResult.secure_url;
      }

      if (logoUrl != null)
        registrationData.logo = logoUrl;

      const { data } = await axios.post(
        `${backendUrl}/api/restaurant/add-restaurant`,
        registrationData
      );
      if (data.success) {
        showNotification("Registration successful, Please Login", "success");
        setLoading(false)
        setWidth(0)
        navigate("/restaurant/login");
      }

    } catch (error) {
      showNotification("Something went wrong", "error");
    } finally {
      setLoading(false)
      setWidth(0)
    }
  };
  return (
    <>
      <div className="relative min-h-screen w-full px-4 md:px-24 font-poppins bg-linear-to-tr from-gray-400/5 to-primary/5">
        {loading &&
          <Loading width={width} />
        }
        <form onSubmit={handleSubmit} className="flex h-full w-full pt-4">
          <div className="bg-white border border-orange-400 border-b-0 h-auto w-1/4 rounded-t-full flex flex-col gap-2 items-center pt-6">
            <div className="size-48 rounded-full border-2 border-orange-400 p-1 relative">
              <img src={logoPreview || logo} alt="restaurant logo" className="h-full rounded-full" />
              <div
                onClick={() => logoInput.current.click()}
                className='bg-orange-400 size-12 rounded-full absolute flex items-center justify-center hover:scale-105 cursor-pointer bottom-2 right-2'>
                <FaCamera size={24} className='text-white' />
              </div>
              <input
                type="file"
                name="logo"
                accept="image/*"
                ref={logoInput}
                onChange={handleChange}
                hidden
              />
            </div>
            <label htmlFor="logo" className="text-primary">upload your logo</label>
          </div>
          <div className="bg-white h-auto w-full rounded-t-[20%] px-5 pb-16 border border-orange-400 border-b-0">
            <div className="h-24 w-full rounded-t-full flex items-center justify-center border-zinc-400">
              <div className="h-[60%] flex items-center justify-center gap-10">
                <img src={appLogo} alt="Tasto" className="h-14" />
                <h1 className="text-3xl text-orange-400 font-extrabold">Register your Restaurant</h1>
              </div>
            </div>
            {/* name */}
            <div className="flex flex-col gap-2 mt-6">
              <div>
                <label htmlFor="name" className="font-semibold text-base">Restaurant Name</label>
                <p className="text-xs text-zinc-400">Enter your Restaurant or Hotel name</p>
              </div>
              <input name="name" onChange={handleChange} placeholder="Name" type="text" className="h-10 text-sm bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* email and mobile */}
            <div className="flex justify-between mt-5 gap-10 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="email" className="font-semibold text-base">Email</label>
                  <p className="text-xs text-zinc-400">Enter your valid email address</p>
                </div>
                <input type="text" name="email" onChange={handleChange} placeholder="Email" className="text-sm h-10 w-full bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                  <label htmlFor="mobile" className="font-semibold text-base">Mobile</label>
                  <p className="text-xs text-zinc-400">Enter your valid contact number</p>
                </div>
                <input name="mobile" onChange={handleChange} type="text" placeholder="Mobile" className="text-sm h-10 w-full bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
              </div>
            </div>

            {/* password */}
            <div className="flex flex-col gap-2 mt-5">
              <div>
                <label htmlFor="password" className="font-semibold text-base">Password</label>
                <p className="text-xs text-zinc-400">Enter a secure password for login</p>
              </div>
              <input type="password" name="password" onChange={handleChange} placeholder="Password" className="text-sm h-10 bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 mt-5">
              <div>
                <label htmlFor="description" className="font-semibold text-base">Description</label>
                <p className="text-xs text-zinc-400">Enter a restaurant description or brief summary</p>
              </div>
              <textarea name="description" type="password" onChange={handleChange} placeholder="Description" className="min-h-20 text-sm bg-white p-2 rounded-md border border-zinc-400 focus:shadow-md outline-none" />
            </div>

            {/* Register & Login */}
            <div className="mt-10 flex flex-col gap-4 items-center">
              <button className="w-full bg-orange-400 h-10 rounded-md text-lg text-primary font-semibold hover:bg-yellow-400 transition duration-200 cursor-pointer active:scale-95">Register</button>
              <div className="flex gap-5 w-full items-center">
                <div className="w-full border border-zinc-400 h-0" />
                <span className="text-zinc-400">OR</span>
                <div className="w-full border border-zinc-400 h-0" />
              </div>
              <p className="text-sm">Already have an account? <a href="/restaurant/login" className="text-orange-400 font-semibold hover:underline">Login</a></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterRestaurant;
