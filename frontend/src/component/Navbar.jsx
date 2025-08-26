import React, { useEffect, useState } from "react";
import food_logo from "../assets/food_logo.png";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";

const Navbar = () => {
  const { backendUrl, setFood } = useContext(AppContext);
  const [isProfileClick, setIsProfileClick] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken") || "";
  const [foodName, setFoodName] = useState("");
  const [search, setSearch] = useState([]);

  const handleLogin = async () => {};
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleSearch = async (value) => {
    setFoodName(value);
    if (value.length >= 3) {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/search/food/search?foodname=${value}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSearch(data.food);
      } catch (err) {
        console.error("Search failed:", err);
        setSearch([]);
      }
    } else {
      setSearch([]);
    }
  };

  const handleRestaurant = async (restaurantId, food) => {
    localStorage.setItem("selectedFood", JSON.stringify(food));
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <>
      <div className="h-14 md:h-16 flex items-center justify-between px-2 fixed w-full z-20 top-0 left-0 font-poppins bg-secondary">
        <div className="flex">
          <img
            onClick={() => navigate("/")}
            className="h-10 cursor-pointer"
            src={food_logo}
            alt=""
          />
          <div className="flex flex-col items-end h-10">
            <h1 className="text-base md:text-xl font-bold text-primary">FOOD</h1>
            <p className="text-primary text-xs font-semibold">
              Delivery
            </p>
          </div>
        </div>
        <div className="flex items-center border-b-2 h-10  border-primary w-50 md:w-86">
          <IoIosSearch className="text-xl md:text-2xl text-primary font-bold" />
          <input
            className="w-full md:w-68 h-10 pl-1 outline-none text-primary placeholder:text-primary text-xs md:text-base"
            type="text"
            placeholder="Search for restaurants & food"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {Array.isArray(search) && search.length > 0 && (
          <div className="absolute top-15 left-1/2 transform -translate-x-1/2 bg-white w-96 rounded shadow-lg p-2 md:p-4 z-50">
            {search.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => handleRestaurant(item.restaurant._id, item)}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-tertiary font-bold text-sm md:text-base ">{item.name}</span>
                  <span className="text-xs font-semibold italic">
                    {item.restaurant.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 md:gap-10 justify-end md:pr-4">
          <BsCart4
            onClick={() => navigate("/add-cart")}
            className="text-2xl md:text-4xl text-primary cursor-pointer"
          />
          <div className="relative">
          <FaCircleUser
            className="text-2xl md:text-4xl text-primary cursor-pointer"
            onClick={() => setIsProfileClick((prev) => !prev)}
          />
          {isProfileClick && (
            <div className="absolute top-6 md:top-10 right-2 bg-white rounded-sm shadow-lg p-2 md:py-2 md:px-4 z-50 ">
              <button
                onClick={handleLogout}
                className="text-tertiary font-semibold cursor-pointer text-sm"
              >
                Logout
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
