import React, { useContext, useState } from "react";
import { BiLeaf } from "react-icons/bi";
import defaultFoodImage from "/default_food.jpg";
import { TbMeat } from "react-icons/tb";
import { LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { backendUrl, fetchRestaurant } = useContext(AppContext);
  const [foodLoading, setFoodLoading] = useState(false);
  const handleDelete = async (foodId) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }
    try {
      setFoodLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/food/delete/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Food item deleted successfully!");
        fetchRestaurant();
      } else {
        toast.error("Failed to delete food item.");
      }
    } catch (error) {
      console.error("❌ Error deleting food item:", error);
      toast.error("Failed to delete food item.");
    } finally {
      setFoodLoading(false);
    }
  };
  return (
    <div className="h-90 md:h-96 md:max-w-96 min-w-1/2 md:min-w-96 bg-[#f5f5f5] rounded-xl md:rounded-2xl border border-[rgba(0,0,0,0.1)] font-poppins">
      {foodLoading && (
        <div className="fixed h-screen w-full bg-black/70 top-0 left-0 z-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="h-1/2 w-full rounded-t-xl md:rounded-t-2xl overflow-hidden relative">
        <img
          src={food.image || defaultFoodImage}
          alt={food.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-1 bg-white/85 p-2 rounded-full h-4 md:h-6 w-auto flex items-center justify-center">
          {food.isVeg === true ? (
            <BiLeaf className="text-[#006C36] text-xs md:text-md" />
          ) : (
            <TbMeat className="text-red-600 text-xs md:text-md" />
          )}
          {food.isVeg === true ? (
            <span className="text-[10px] md:text-xs text-gray-700 ml-1 font-semibold">
              Veg
            </span>
          ) : (
            <span className="text-[10px] md:text-xs text-gray-700 ml-1 font-semibold tracking-tighter">
              Non-Veg
            </span>
          )}
        </div>
        <div
          className={`absolute top-2 left-1 w-auto h-4 md:h-6 px-2 md:px-3 rounded-full flex items-center ${
            food.inStock === true ? "bg-[#006C36]" : "bg-red-600"
          }`}
        >
          {food.inStock === true ? (
            <span className="text-[10px] md:text-xs text-white font-semibold">
              In Stock
            </span>
          ) : (
            <span className="text-[10px] md:text-xs text-white font-semibold">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-1 md:gap-0 md:justify-between px-2 md:px-4 mt-4">
        <p className="text-gray-700 font-semibold text-xs md:text-lg">
          {food.name}
        </p>
        <p className="text-[#006C36] font-bold text-xs md:text-lg">
          &#8377; {food.price}
        </p>
      </div>
      <p className="text-gray-700 text-[10px] md:text-xs px-2 md:px-4 mt-1">
        {food.description}
      </p>
      <div className="mt-2 w-24 ml-4 h-6 border border-[rgba(0,0,0,0.1)] bg-white rounded-full text-gray-700 text-sm flex items-center justify-center">
        {food.category}
      </div>
      <div className="w-full flex justify-between items-center px-4 mt-4">
        <div
          className="w-[85%] h-8 flex justify-center items-center gap-2 text-gray-700 cursor-pointer border border-[rgba(0,0,0,0.1)] rounded-md px-2 py-1 hover:bg-[#006C36] hover:text-white active:scale-95 transition-all duration-200"
          onClick={() =>
            navigate(`/restaurant-dashboard/edit-food/${food._id}`)
          }
        >
          <FiEdit3 />
          <span className="text-sm font-semibold"> Edit</span>
        </div>
        <div
          className="h-8 w-9 cursor-pointer rounded-md hover:bg-red-700 hover:text-white text-red-700 border border-[rgba(0,0,0,0.1)] flex items-center justify-center active:scale-95 transition-all duration-200"
          onClick={() => handleDelete(food._id)}
        >
          <LuTrash2 className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
