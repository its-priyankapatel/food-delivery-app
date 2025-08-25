import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DisplayFoodRestaurant = () => {
  const { backendUrl } = useContext(AppContext);
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
    <div className="h-auto w-full">
      <h1 className="text-xl md:text-4xl text-center font-semibold text-primary text-shadow-2xs text-shadow-black py-5 md:py-10 bg-secondary selection:text-tertiary selection:bg-primary h-14 md:h-28">
        Delicious Picks Just for You
      </h1>
      <div className="w-full h-auto bg-primary">
        <div className="w-full md:w-[74%] h-full md:m-auto mt-5 py-5 md:py-10 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
            {allRestaurant.map((restaurant, index) => {
              const foodId = restaurant.food?.[0];
              const food = foodDetails[foodId];

              return (
                <div
                  key={index}
                  onClick={() => switchRestaurant(restaurant)}
                  className="h-70 md:h-85 w-74 md:w-85 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300 cursor-pointer mx-4"
                >
                  <div className="h-full w-full">
                    <div
                      className="h-40 md:h-60 w-70 md:w-80 rounded-xl m-auto mt-2 bg-center bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url(${food?.image})` }}
                    ></div>
                    <div className="h-28 md:h-23 w-70 md:w-80 ml-2 mt-1">
                      <div className="flex justify-between mx-1 pt-2">
                        <p className="text-md font-semibold">
                          {restaurant.name}
                        </p>
                        <p className="flex gap-1 h-7 w-12 justify-center items-center rounded-sm px-1 text-white bg-secondary">
                          {restaurant.rating} <IoStar />
                        </p>
                      </div>
                      <div className="flex justify-between mx-1 mt-2 w-[98%]">
                        <div className=" text-gray-700 text-xs font-semibold w-[70%] h-16 md:h-12">
                          {restaurant?.description || "No description"}
                        </div>
                        <div className="flex justify-end items-start w-[30%] h-6 text-xs md:text-sm text-gray-700">
                          <MdOutlineCurrencyRupee className="mt-1" />
                          {food?.price || "0"} for one
                        </div>
                      </div>
                    </div>
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
    </div>
  );
};

export default DisplayFoodRestaurant;
