import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const DisplayFoodRestaurant = () => {
  const { backendUrl } = useContext(AppContext);

  const token = localStorage.getItem("token") || "";
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

  return (
    <div className="h-auto w-full">
      <h1 className="text-4xl text-center font-semibold text-primary text-shadow-2xs text-shadow-black py-10 bg-secondary selection:text-tertiary selection:bg-primary h-28">
        Delicious Picks Just for You
      </h1>
      <div className="w-full h-auto bg-primary">
        <div className="w-[74%] h-full m-auto mt-5 py-10">
          <div className="grid grid-cols-3 gap-6">
            {allRestaurant.map((restaurant, index) => {
              const foodId = restaurant.food?.[0];
              const food = foodDetails[foodId];

              return (
                <div
                  key={index}
                  className="h-85 w-85 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300 cursor-pointer mx-4"
                >
                  <div className="">
                    <div
                      className="h-60 w-80 rounded-xl m-auto mt-2 bg-center bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url(${food?.image})` }}
                    ></div>
                    <div className="h-30 w-80 ml-2 mt-3">
                      <div className="flex justify-between mx-1">
                        <p className="text-md font-semibold">
                          {restaurant.name}
                        </p>
                        <p className="flex gap-1 rounded-sm px-1 text-white bg-secondary">
                          {restaurant.rating} <IoStar className="mt-1" />
                        </p>
                      </div>
                      <div className="flex justify-between mx-1 mt-2">
                        <div className="w-54 text-gray-700 text-xs font-semibold">
                          {restaurant?.description || "No description"}
                        </div>
                        <div className="flex justify-end w-24 h-6 text-sm text-gray-700">
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
