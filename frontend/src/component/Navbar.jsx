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
      <div className="h-16 md:h-18 flex items-center justify-between md:px-4 bg-secondary fixed w-full z-20 top-0 left-0 ">
        <div className="flex items-center gap-1 md:gap-2 w-28 md:w-46">
          <img
            onClick={() => navigate("/")}
            className="w-13 md:w-16 h-13 md:h-16 cursor-pointer"
            src={food_logo}
            alt=""
          />
          <div className=" flex flex-col justify-center w-22">
            <h1 className="text-xs md:text-2xl font-bold text-primary ">
              FOOD
            </h1>
            <p className="font-sans text-right text-primary text-xs md:text-lg font-semibold">
              Delivery
            </p>
          </div>
        </div>
        <div className="flex items-center w-36 md:w-68 border-b-2 h-8 md:h-10  border-primary">
          <IoIosSearch className="size-3 md:size-5 text-primary" />
          <input
            className="w-30 md:w-68 h-8 md:h-10 pl-1 outline-none text-primary placeholder:text-primary text-xs md:text-base"
            type="text"
            placeholder="Search for food"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {Array.isArray(search) && search.length > 0 && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 rounded shadow-lg p-4 z-50 bg-primary">
            {search.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => handleRestaurant(item.restaurant._id, item)}
                className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-tertiary font-bold">{item.name}</span>
                  <span className="text-xs font-semibold italic">
                    {item.restaurant.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-16 md:w-30 h-12 md:h-16 justify-around md:justify-center items-center gap-1 md:gap-10">
          <BsCart4
            onClick={() => navigate("/add-cart")}
            className="w-6 md:w-10 h-6 md:h-10 text-primary cursor-pointer"
          />
          <FaCircleUser
            className="w-6 md:w-10 h-6 md:h-10 text-primary cursor-pointer"
            onClick={() => setIsProfileClick((prev) => !prev)}
          />
          {isProfileClick && (
            <div className="absolute top-20 right-0 bg-white rounded-sm shadow-lg py-2 px-4 z-50 ">
              <button
                onClick={handleLogout}
                className="text-tertiary font-semibold cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
