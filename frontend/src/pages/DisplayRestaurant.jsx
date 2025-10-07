import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IoStar } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import Navbar from "./../component/Navbar";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

const DisplayRestaurant = () => {
  const { backendUrl, handleAddCart } = useContext(AppContext);
  const { restaurantId } = useParams();
  const token = localStorage.getItem("userToken") || "";
  const [restaurantData, setRestaurantData] = useState("");
  const [allFood, setAllFood] = useState([]);
  const [foodData, setFoodData] = useState(() => {
    const stored = localStorage.getItem("food");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    FetchRestaurantData();
  }, [restaurantId]);

  const FetchRestaurantData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/restaurant/get-restaurant/${restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setRestaurantData(data.restaurant);
        setAllFood(data.restaurant.food);
      }
    } catch (error) {
      console.log(error);

      console.log("error in data fetching");
    }
  };
  const handleClick = (val) => {
    localStorage.setItem("food", JSON.stringify(val));
    setFoodData(val);
  };

  return (
    <>
      <div className="h-screen w-full bg-secondary overflow-y-scroll">
        <Navbar />
        <div className="h-[560px] md:h-90 w-full bg-secondary p-5 flex mt-16 flex-col md:flex-row font-poppins">
          <div className="h-50 md:h-80 w-full md:w-80 flex-col items-center">
            {foodData?.image ? (
              <div
                className="h-40 md:h-72 w-40 md:w-80 rounded-xl border-4 border-white bg-no-repeat bg-cover bg-center mx-auto"
                style={{ backgroundImage: `url(${foodData?.image})` }}
              ></div>
            ) : (
              <div className="h-full w-full rounded-xl border-4 border-white flex items-center justify-center bg-gray-500">
                <Spinner />
              </div>
            )}
            <h1 className="text-xl md:text-2xl font-semibold text-primary text-center selection:text-tertiary selection:bg-primary">
              {foodData?.foodName}
            </h1>
          </div>
          <div className="h-80 md:h-85 w-[95%] md:w-180 pt-3 md:pt-0 pl-2 md:pl-15 selection:text-tertiary selection:bg-primary">
            <p className="font-semibold text-2xl md:text-3xl text-tertiary text-shadow-2xs ">
              Explore Restaurant Info
            </p>
            <p className="text-xl md:text-2xl font-medium pt-4 text-primary text-shadow-2xs">
              {restaurantData.name}
            </p>
            <p className="text-sm md:text-base pt-3  text-primary text-shadow-2xs">
              {restaurantData.description}
            </p>
            <p className="text-sm md:text-base pt-3 flex gap-2 text-primary text-shadow-2xs">
              <FaRegAddressCard className="mt-1" /> {restaurantData.address}
            </p>
            <p className="text-sm md:text-base pt-3 flex gap-2 text-primary text-shadow-2xs">
              <FaPhone className="" />
              {restaurantData.mobile}
            </p>
            <p className="text-sm md:text-base pt-3 flex gap-2  text-primary text-shadow-2xs">
              <MdOutlineAccessTime className="text-lg" />
              {restaurantData.time}
            </p>
          </div>
        </div>
        <div className="h-auto w-full bg-primary">
          <h1 className="text-center text-2xl md:text-3xl font-semibold text-tertiary selection:text-primary selection:bg-tertiary bg-primary py-3 md:py-6">
            Dishes Recommended at {restaurantData.name}
          </h1>
          <div />
          <div className="h-auto w-full bg-primary">
            <div className="flex flex-col justify-center items-center gap-2 md:gap-4 px-1 md:px-0 ">
              {allFood.map((val, index) => (
                <div
                  onClick={() => handleClick(val)}
                  key={index}
                  className={`h-40 md:h-50 w-full md:w-[60%] flex justify-center items-center rounded-xl shadow-lg hover:shadow-xs hover:shadow-gray-400 duration-300 mx-3 ${
                    val.inStock == false
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="h-[90%] w-[60%] md:w-[65%] p-1 md:p-4 flex flex-col gap-2 md:gap-3">
                    <div className="text-lg md:text-xl font-bold text-tertiary">
                      {val.name}
                    </div>
                    <div className="text-gray-800 font-bold text-sm md:text-lg flex ">
                      <MdOutlineCurrencyRupee className="mt-1 font-bold" />
                      {val.price}
                    </div>
                    <div className="text-xs md:text-sm text-gray-700">
                      {val.description}
                    </div>
                  </div>
                  <div className="h-[90%] w-[37%] md:w-[30%] flex flex-col justify-center items-center relative">
                    <div
                      className={`h-[70%] w-[85%] md:w-[60%] rounded-xl m-auto mt-2 bg-no-repeat bg-center bg-cover ${
                        val.inStock === false ? "grayscale brightness-75" : ""
                      }`}
                      style={{ backgroundImage: `url(${val.image})` }}
                    ></div>
                    <button
                      disabled={!val.inStock}
                      onClick={() => handleAddCart(val._id)}
                      className="px-4 py-2 md:w-26 absolute bottom-5 md:bottom-7 text-secondary disabled:text-red-600 font-poppins font-bold cursor-pointer rounded-md bg-primary text-xs md:text-base shadow-md shadow-gray-400 hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {val.inStock === false ? "Out of Stock" : "Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayRestaurant;
