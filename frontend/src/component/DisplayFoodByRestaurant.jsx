import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DisplayFoodRestaurant = () => {
  const { backendUrl,currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken") || "";
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [firstFoodIds, setFirstFoodIds] = useState([]);
  const [foodDetails, setFoodDetails] = useState({});

  // Fetch all restaurants and extract first food IDs
  const GetAllRestaurant = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/restaurant/get-all-restaurant",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        // Filter only those with at least one food
        const filteredRestaurants = data.restaurant.filter(
          (rest) => rest.food && rest.food.length > 0
        );
        setAllRestaurant(filteredRestaurants);

        // Collect first food IDs
        const firstIds = filteredRestaurants.map((rest) => rest.food[0]);
        setFirstFoodIds(firstIds);
      }
    } catch (error) {
      console.log("fetch error: ", error);
    }
  };

  // Fetch food details by food IDs
  useEffect(() => {
    const fetchFoods = async () => {
      const foodMap = {};
      for (const foodId of firstFoodIds) {
        try {
          const { data } = await axios.get(
            backendUrl + `/api/food/get-food/${foodId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          foodMap[foodId] = data.food;
        } catch (err) {
          console.error("Error fetching food:", err);
        }
      }
      setFoodDetails(foodMap);
    };

    if (firstFoodIds.length > 0) {
      fetchFoods();
    }
  }, [firstFoodIds]);

  useEffect(() => {
    GetAllRestaurant();
  }, []);

  const switchRestaurant = (restaurant) => {
    console.log(restaurant);

    navigate(`/restaurant/${restaurant._id}`);
  };

  return (
    <div className="h-auto w-full font-poppins">
      <h1 className="text-2xl md:text-4xl text-center font-semibold text-primary text-shadow-2xs text-shadow-black py-4 md:py-10 bg-secondary selection:text-tertiary selection:bg-primary h-14 md:h-28">
        Delicious Picks Just for You
      </h1>
      <div className="w-full h-auto bg-primary p-4 md:p-24 ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {allRestaurant.map((restaurant, index) => {
            const foodId = restaurant.food?.[0];
            const food = foodDetails[foodId];

            return (
              <div
                key={index}
                onClick={() => switchRestaurant(restaurant)}
                className="h-auto md:h-80 w-42 md:w-85 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300 cursor-pointer flex flex-col gap-1 md:gap-4"
              >
              <div className="h-[60%] w-full">
                <img src={food?.image} alt={restaurant.name} className="h-full w-full object-cover rounded-t-xl" />
              </div>
              <div className="flex justify-between items-center w-full px-2 md:px-4">
                <p className="font-semibold text-xs md:font-bold md:text-base">{restaurant.name}</p>
                <div className="flex p-1 gap-1 justify-center items-center rounded-sm bg-secondary text-white font-semibold text-[11px] md:text-sm">
                  <p >{restaurant.rating}</p>
                  <IoStar/>
                </div>
              </div>
              <div className="flex items-center justify-between px-2 md:px-4 w-full">
                <p className="text-[10px] md:text-xs text-gray-700">{restaurant.description}</p>
                <p className="text-xs font-semibold">{currencySymbol}{food?.price}</p>
              </div>
              </div>
            );
          })}
        </div>
        {allRestaurant.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No restaurants with food available.
          </p>
        )}
      </div>
    </div>
  );
};

export default DisplayFoodRestaurant;
