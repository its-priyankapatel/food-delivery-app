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

const DisplayRestaurant = () => {
  const { food, setFood, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const token = localStorage.getItem("token") || "";
  const [restaurantData, setRestaurantData] = useState("");
  const [allFood, setAllFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(() => {
    const stored = localStorage.getItem("selectedFood");
    return stored ? JSON.parse(stored) : {};
  });

  const { cart, handleAddCart } = useContext(AppContext);

  useEffect(() => {
    if (!food || Object.keys(food).length === 0) {
      const storedFood = localStorage.getItem("selectedFood");
      if (storedFood) {
        setFood(JSON.parse(storedFood));
      }
    }

    FetchRestaurantData();
  }, [restaurantId, food]);

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
  };

  // const handleviewCart = () => {
  //   navigate("/add-cart");
  // };
  return (
    <>
      <Navbar />
      <div className="h-120 w-full bg-secondary p-5 flex mt-24">
        <div className="h-100 w-100 flex-col">
          {food?.image ? (
            <div
              className="h-full w-full rounded-xl border-4 border-white bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedFood.image})` }}
            ></div>
          ) : (
            <div className="h-full w-full rounded-xl border-4 border-white flex items-center justify-center bg-gray-100">
              Loading Image...
            </div>
          )}
          <h1 className="text-2xl font-bold text-primary text-center">
            {selectedFood.name}
          </h1>
        </div>
        <div className="h-100 w-180 pt-1 pl-15 selection:text-tertiary selection:bg-primary">
          <p className="font-semibold text-3xl mt-4 text-primary text-shadow-2xs ">
            Explore Restaurant Info
          </p>
          <p className="text-2xl font-medium pt-8  text-primary text-shadow-2xs">
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
            <MdOutlineAccessTime className="mt-1" />
            {restaurantData.time}
          </p>
          <p className=" w-12 h-8 flex gap-1 items-center justify-center rounded-sm mt-2 text-white bg-transparent border-1">
            {restaurantData.rating}
            <IoStar />
          </p>
          <div className="flex gap-4">
            <button
              // onClick={() => handleAddToCart(food._id)}
              onClick={() => handleAddCart(food._id)}
              className="bg-primary h-10 w-24 mt-4 text-secondary font-bold rounded-md cursor-pointer"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className="bg-primary py-4">
        <h1 className="my-10 text-4xl text-center font-semibold text-tertiary selection:text-primary selection:bg-tertiary">
          Dishes Served at {restaurantData.name}
        </h1>
        <div className="grid grid-cols-5 mx-20 gap-4">
          {allFood.map((val, index) => (
            <div
              onClick={() => handleClick(val)}
              key={index}
              className="h-70 w-60 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300 cursor-pointer mx-3"
            >
              <div
                className="h-40 w-56 rounded-xl m-auto mt-2 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${val.image})` }}
                alt=""
              ></div>
              <div className="h-26 w-56 m-auto mt-1 flex">
                <div className="h-full w-[60%] p-1">
                  <p className="text-gray-700 font-bold text-md">{val.name}</p>
                  <p className="text-gray-700 text-xs font-normal">
                    {val.description}
                  </p>
                </div>
                <div className="w-[40%] flex flex-col items-end gap-4 mt-1">
                  <div className="text-sm text-gray-700 flex">
                    <MdOutlineCurrencyRupee className="mt-1" />
                    {val.price} for one
                  </div>
                  <div className="bg-secondary h-7 w-10 text-white rounded-sm text-sm flex gap-1 items-center justify-center">
                    {val.rating} <IoStar />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayRestaurant;
