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
  const { food, setFood, backendUrl, handleAddCart, foodOne, assignFoodValue } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const token = localStorage.getItem("userToken") || "";
  const [restaurantData, setRestaurantData] = useState("");
  const [allFood, setAllFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(() => {
    const stored = localStorage.getItem("selectedFood");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    // if (!food || Object.keys(food).length === 0) {
    //   const storedFood = localStorage.getItem("selectedFood");
    //   if (storedFood) {
    //     setFood(JSON.parse(storedFood));
    //   }
    // }

    FetchRestaurantData();
  }, [restaurantId]);

  // useEffect(() => {
  //   return () => {
  //     setFood({});
  //   };
  // }, []);

  const FetchRestaurantData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/restaurant/get-restaurant/${restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // console.log(data.restaurant);
        setRestaurantData(data.restaurant);
        setAllFood(data.restaurant.food);
      }
    } catch (error) {
      console.log(error);

      console.log("error in data fetching");
    }
  };
  const handleClick = (val) => {
    setSelectedFood(val);
    localStorage.setItem("selectedFood", JSON.stringify(val));
    assignFoodValue(val);
  };

  return (
    <>
      <Navbar />
      <div className="h-90 w-full bg-secondary p-5 flex mt-24">
        <div className="h-80 w-80 flex-col">
          {foodOne.foodImage ? (
            <div
              className="h-70 w-80 rounded-xl border-4 border-white bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${foodOne.foodImage})` }}
            ></div>
          ) : (
            <div className="h-full w-full rounded-xl border-4 border-white flex items-center justify-center bg-gray-500">
              <Spinner />
            </div>
          )}
          <h1 className="text-2xl font-bold text-primary text-center">
            {foodOne?.name}
          </h1>
        </div>
        <div className="h-100 w-180 pt-1 pl-15 selection:text-tertiary selection:bg-primary">
          <p className="font-semibold text-3xl text-primary text-shadow-2xs ">
            Explore Restaurant Info
          </p>
          <p className="text-2xl font-medium pt-4 text-primary text-shadow-2xs">
            {restaurantData.name}
          </p>
          <p className="text-md pt-3  text-primary text-shadow-2xs">
            {restaurantData.description}
          </p>
          <p className="text-md pt-3 flex gap-2  text-primary text-shadow-2xs">
            <FaRegAddressCard className="mt-1" /> {restaurantData.address}
          </p>
          <p className="text-md pt-3 flex gap-2  text-primary text-shadow-2xs">
            <FaPhone className="mt-1" />
            {restaurantData.mobile}
          </p>
          <p className="text-md pt-3 flex gap-2  text-primary text-shadow-2xs">
            <MdOutlineAccessTime className="mt-1 text-lg" />
            {restaurantData.time}
          </p>
          <p className=" w-14 h-8 flex gap-1 items-center justify-center rounded-sm mt-4 text-white border-2 border-gray-400">
            {restaurantData.rating}
            <IoStar />
          </p>
        </div>
      </div>
      <div className="h-auto w-full bg-primary">
        <h1 className="my-8 text-center text-3xl font-semibold text-tertiary selection:text-primary selection:bg-tertiary bg-primary py-6">
          Dishes Recommended at {restaurantData.name}
        </h1>
        <div />
        <div className="h-auto w-full bg-primary">
          <div className="flex flex-col justify-center items-center gap-4">
            {allFood.map((val, index) => (
              <div
                onClick={() => handleClick(val)}
                key={index}
                className="h-50 w-[60%] flex justify-center items-center relative rounded-xl shadow-lg hover:shadow-xs hover:shadow-gray-400 duration-300 cursor-pointer mx-3"
              >
                {val.inStock === false && (
                  <div className="bg-gray-700/30 absolute h-full w-full rounded-xl z-10 flex justify-center items-center text-lg text-bold text-gray-900 font-poppins">
                    Unavailable
                  </div>
                )}
                <div className="h-[90%] w-[65%] p-4 flex flex-col gap-3">
                  <div className="text-xl font-bold text-tertiary">
                    {val.name}
                  </div>
                  <div className="text-gray-800 font-bold text-md flex ">
                    <MdOutlineCurrencyRupee className="mt-1 font-bold" />
                    {val.price}
                  </div>
                  <div className="text-sm text-gray-700">{val.description}</div>
                </div>
                <div className="h-[90%] w-[30%] flex flex-col justify-center items-center relative">
                  <div
                    className="h-[70%] w-[60%] rounded-xl m-auto mt-2 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${val.image})` }}
                  ></div>
                  <button
                    onClick={() => handleAddCart(val._id)}
                    className="h-10 w-26 absolute bottom-7 text-secondary font-bold cursor-pointer rounded-md bg-primary text-md shadow-md shadow-gray-400 hover:bg-gray-200"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayRestaurant;
