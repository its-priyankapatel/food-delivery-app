import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../component/Navbar";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const DisplayFood = () => {
  const targetRef = useRef(null);
  const { category } = useParams();
  const navigate = useNavigate();

  const { backendUrl, setFoodData } = useContext(AppContext);

  const [foods, setFoods] = useState([]);
  const token = localStorage.getItem("userToken");

  const fetchFood = async () => {
    const { data } = await axios.get(
      backendUrl + `/api/food/get-food-category/${category}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.success) {
      setFoods(data.food);
    }
  };
  useEffect(() => {
    fetchFood();
  }, []);

  const handleFood = (food) => {
    const updatedFood = {
      ...food,
      image: food.foodImage,
    };
    delete updatedFood.foodImage;

    localStorage.setItem("food", JSON.stringify(updatedFood));
    navigate(`/restaurant/${food.restaurantId}`);
  };
  return (
    <>
      <Navbar />
      <div className="h-auto pb-10 w-80% mt-16 md:mt-18 bg-primary">
        <h1 className="text-center py-6 text-2xl md:text-4xl font-semibold text-tertiary text-shadow-2xs selection:text-primary selection:bg-tertiary">
          {category} Delivery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 mx-1 md:mx-10 gap-1">
          {foods.map((val, index) => (
            <div
              onClick={() => handleFood(val)}
              key={index}
              className="h-60 md:h-90 w-80 md:w-80  rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300 mx-3"
            >
              <div className="flex flex-col gap-1 h-56 md:h-86 w-76 m-auto mt-2">
                <div
                  className="h-40 md:h-60 w-70 md:w-76 rounded-xl m-auto mt-1 bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${val.foodImage})` }}
                ></div>
                <div className="h-24 w-70 ml-2 mt-1">
                  <div className="flex justify-between mx-1">
                    <p className="text-base md:text-lg font-semibold">
                      {val.restaurantName}
                    </p>
                    <p className="flex gap-1 bg-secondary rounded-sm px-1 h-7 w-12 md:w-14 text-sm md:text-base items-center justify-center text-white">
                      {val.rating} <IoStar className="text-sm md:text-base" />
                    </p>
                  </div>
                  <div className="w-50 h-full  text-gray-600 text-xs md:text-sm font-semibold pl-1 mt-1">
                    {val.description}
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

export default DisplayFood;
