import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoMdAdd, IoIosTrendingUp } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { IoSettingsOutline, IoSearch } from "react-icons/io5";
import { BiDotsVerticalRounded, BiLeaf } from "react-icons/bi";
import { TbMeat } from "react-icons/tb";
import FoodCard from "../component/FoodCard";
import { useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner";
import DefaultImage from '../assets/icons/DefaultRestaurant.png'

const RestaurantHome = () => {
  const navigate = useNavigate();
  const { restaurant } = useContext(AppContext);
  console.log(restaurant);

  // Filter states
  const [filter1, setFilter1] = useState("all"); // all | in_stock | out_of_stock
  const [filter2, setFilter2] = useState("all"); // all | veg | non_veg
  const [dotClicked, setDotClicked] = useState(false);
  // Handlers
  const handleFilter1Click = (filterType) => {
    setFilter1(filterType);
  };
  useEffect(() => {
    if (!restaurant?.food)
      return (
        <div className="h-screen w-full flex justify-center items-center bg-yellow-400">
          <Spinner />
        </div>
      );
  }, [restaurant]);

  const handleFilter2Click = (filterType) => {
    setFilter2(filterType);
  };


  const stats = [
    {
      label: "Total Items",
      value: (restaurant?.food || []).length,
      icon: <FiPackage className="text-lg" />,
      color: "text-gray-700",
    },
    {
      label: "In Stock",
      value: (restaurant.food || []).filter((f) => f.inStock)?.length || 0,
      icon: <IoIosTrendingUp className="text-lg text-[#006C36]" />,
      color: "text-[#006C36]",
    },
    {
      label: "Out of Stock",
      value: (restaurant.food || []).filter((f) => !f.inStock)?.length || 0,
      icon: <IoSettingsOutline className="text-lg text-red-700" />,
      color: "text-red-700",
    },
    {
      label: "Vegetarian",
      value:
        (restaurant.food || []).filter((f) => f.isVeg === true)?.length || 0,
      icon: <BiLeaf className="text-lg text-[#006C36]" />,
      color: "text-[#006C36]",
    },
  ];
  return (
    <div
      className="bg-white w-full min-h-screen"
      tabIndex={0}
      onClick={() => setDotClicked(false)}
    >
      {/* Header */}
      <div className="w-full h-16 md:h-24 bg-[#f5f5f5] border-b border-b-[#a19595b6] flex items-center px-4 md:px-20 justify-between">
        <div className="w-[60%] md:w-auto text-gray-700">
          <p className="text-lg md:text-2xl font-bold font-poppins">
            {restaurant.name}
          </p>
          <p className="text-xs md:text-base font-poppins">
            Manage your menu items and track inventory
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="px-2 bg-[#006C36] flex justify-around items-center w-26 md:w-40 h-10 md:h-9 rounded-lg md:rounded-md text-white cursor-pointer font-semibold font-poppins hover:bg-[#0b8045]"
            onClick={() => navigate("/restaurant-dashboard/add-food")}
          >
            <IoMdAdd className="text-white text-base md:text-xl font-extrabold" />
            <p className="text-xs md:text-sm w-[70%] md:w-auto">Add New Item</p>
          </div>
          <div
            className="cursor-pointer relative"
            onClick={(e) => {
              e.stopPropagation();
              setDotClicked(!dotClicked);
            }}
          >
            <BiDotsVerticalRounded className="text-3xl" />
            {dotClicked && (
              <button
                className="absolute top-9 right-2 bg-white p-1 text-sm md:text-base rounded-md font-semibold border border-[rgba(0,0,0,0.2)] shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  localStorage.removeItem("restaurantToken");
                  navigate("/");
                }}
              >
                Logout
              </button>
            )}
          </div>
          <div className="size-12 border-2 flex items-center justify-center border-green-500 rounded-full"
            onClick={() => navigate('/restaurant-dashboard/profile')}>
            <img src={DefaultImage} className="bg-zinc-400 size-[92%] opacity-50 rounded-full hover:size-full transition duration-500"></img>
          </div>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="w-full px-4 md:px-20 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="font-poppins bg-[#f5f5f5] text-gray-700 shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)] rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs md:text-sm font-semibold">{stat.label}</p>
              {stat.icon}
            </div>
            <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="w-full h-16 flex justify-center items-center px-4 md:px-24 gap-4 font-poppins">
        {/* Search */}
        <div className="w-full md:w-[45%] h-8 rounded-sm border border-[rgba(0,0,0,0.1)] flex items-center text-gray-700 gap-2 px-2 focus-within:shadow-[0px_0px_5px_2px_rgba(0,108,54,0.37)]">
          <IoSearch className="text-xl" />
          <input
            type="text"
            className="outline-none h-full text-sm w-full"
            placeholder="Search for items..."
          />
        </div>

        {/* Filter 1 (Stock) */}
        <div className="w-1/4 h-10 hidden md:flex gap-3 items-center justify-center">
          {["all", "in_stock", "out_of_stock"].map((f) => (
            <p
              key={f}
              className={`h-9 border border-[rgba(0,0,0,0.1)] px-2 flex items-center justify-center text-sm rounded-md hover:bg-[#0b8045] hover:text-white cursor-default active:scale-95 ${filter1 === f ? "bg-[#006C36] text-white" : ""
                }`}
              onClick={() => handleFilter1Click(f)}
            >
              {f === "all"
                ? "All Items"
                : f === "in_stock"
                  ? "In Stock"
                  : "Out of Stock"}
            </p>
          ))}
        </div>

        {/* Filter 2 (Type) */}
        <div className="w-1/4 h-10 hidden md:flex gap-3 items-center justify-center">
          {[
            { key: "all", label: "All" },
            {
              key: "veg",
              label: "Veg",
              icon: BiLeaf,
              defaultColor: "text-[#006C36]",
            },
            {
              key: "non_veg",
              label: "Non-Veg",
              icon: TbMeat,
              defaultColor: "text-red-600",
            },
          ].map((f) => {
            const isActive = filter2 === f.key;
            return (
              <div
                key={f.key}
                className={`h-9 border border-[rgba(0,0,0,0.1)] px-2 flex items-center justify-center gap-2 text-sm rounded-md hover:bg-[#0b8045] hover:text-white cursor-default active:scale-95 ${isActive ? "bg-[#006C36] text-white" : ""
                  }`}
                onClick={() => handleFilter2Click(f.key)}
              >
                {f.icon && (
                  <f.icon
                    className={`${isActive ? "text-white" : f.defaultColor
                      } group-hover:text-white`}
                  />
                )}
                <span>{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Food Cards */}
      <div className="w-full px-4 md:px-20 py-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
        {restaurant?.food.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantHome;
