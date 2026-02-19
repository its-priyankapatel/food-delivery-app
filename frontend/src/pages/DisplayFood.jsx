import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../component/Navbar";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CategoryBG from "../component/BG/CategoryBG";
import Categories from "../component/home/Categories";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import CategoryCard from "../component/cards/CategoryCard";
import CategoryCardSkeleton from './../component/skeleton/CategoryCardSkeleton';

const DisplayFood = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const restaurants = new Array(10).fill(undefined);
  const { backendUrl, setFoodData } = useContext(AppContext);

  const [foods, setFoods] = useState([]);
  const token = localStorage.getItem("userToken");

  const fetchFood = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        backendUrl + `/api/food/get-food-category/${category}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        console.log(data.food)
        setFoods(data.food);
      }
    } catch (Error) {
      console.log(Error)
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFood();
  }, [category]);

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
      <div className=" px-2 md:px-10 h-screen w-full relative">
        <button
          onClick={() => navigate('/')}
          className="flex items-center mt-8 text-primary font-bold font-poppins text-sm p-1 hover:text-blue-600 active:scale-95">
          <FaChevronLeft className="text-primary text-xs" />
          <p>Home</p>
        </button>
        {
          foods.length != 0 &&
          <div>
            <h1 className='mt-4 text-lg md:text-xl font-bold font-poppins flex items-center'>Top Restaurants in {category}
              <FaChevronRight classNadme='text-sm md:text-base pl-2' />
            </h1>
            <div className="scrollbar-hide scroll-smooth w-full h-44 md:h-56 border-2 border-primary/20 rounded-3xl mt-2 overflow-x-auto flex gap-2 md:gap-4 items-center px-4">
              {loading
                ? new Array(5)
                  .fill(null)
                  .map((_, index) => <CategoryCardSkeleton key={index} />)
                : foods.map((food, idx) => (
                  <CategoryCard
                    key={idx}
                    uniqueKey={idx}
                    product={food}
                  />
                ))}
            </div>
          </div>
        }
        <Categories titleText="Explore more categories" active={true} activeName={category} />
        <div className="h-auto w-full px-2 md:px-10">

        </div>
      </div>
    </>
  );
};

export default DisplayFood;
