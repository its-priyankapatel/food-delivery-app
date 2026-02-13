import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../component/Navbar";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CategoryBG from "../component/BG/CategoryBG";
import Categories from "../component/home/Categories";
import { FaChevronRight } from "react-icons/fa6";
import CategoryCard from "../component/cards/CategoryCard";

const DisplayFood = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const restaurants = new Array(10).fill(undefined);
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
      <div className="px-2 md:px-10 h-screen w-full relative">
        <Navbar />
        <CategoryBG />
        <h1 className='mt-10 text-xl font-bold font-poppins flex items-center'>Top Restaurants in {category}
          <FaChevronRight className='text-base pl-2' />
        </h1>
        <div className="scrollbar-hide scroll-smooth w-full h-56 border-2 border-sky-700/70 rounded-3xl mt-2 overflow-x-auto flex gap-4 items-center px-4">
          {restaurants.map((restaurant, idx) => (
            <CategoryCard />
          ))}
        </div>
        <Categories titleText="Explore more categories" active={true} activeName={category} />
        <div className="h-auto w-full px-2 md:px-10">

        </div>
      </div>
    </>
  );
};

export default DisplayFood;
