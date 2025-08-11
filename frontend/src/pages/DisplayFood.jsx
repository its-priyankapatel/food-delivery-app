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

  const { backendUrl, handleAddCart } = useContext(AppContext);

  const [foods, setFoods] = useState([]);
  const token = localStorage.getItem("token");

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
    localStorage.setItem("selectedFood", JSON.stringify(food));
    navigate(`/restaurant/${food.restaurant._id}`);
  };
  return (
    <>
      <Navbar />
      <div className="h-auto pb-10 w-80% mt-24 bg-primary">
        <h1 className="text-center py-6 text-4xl font-semibold text-tertiary text-shadow-2xs selection:text-primary selection:bg-tertiary">
          {category} Delivery
        </h1>
        <div className="grid grid-cols-4 mx-10 gap-1">
          {foods.map((val, index) => (
            <div
              onClick={() => handleFood(val)}
              key={index}
              className="h-90 w-80  rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400 duration-300  mx-3"
            >
              <div className="flex flex-col gap-1 h-86 w-76 m-auto mt-2">
                <div
                  className="h-60 w-76 rounded-xl m-auto mt-1 bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${val.image})` }}
                ></div>
                <div className="h-24 w-70 ml-2 mt-1">
                  <div className="flex justify-between mx-1">
                    <p className="text-md font-semibold">
                      {val.restaurant.name}
                    </p>
                    <p className="flex gap-1 bg-secondary rounded-sm px-1 text-white">
                      {val.rating} <IoStar className="mt-1" />
                    </p>
                  </div>
                  <div className="flex justify-around mx-1 mt-2">
                    <div className="w-50 h-full  text-gray-700 text-xs font-semibold">
                      {val.description}
                    </div>
                    <div className="flex justify-end  w-24 h-6 text-sm text-gray-700">
                      <MdOutlineCurrencyRupee className="mt-1" />
                      {val.price} for one
                    </div>
                  </div>
                  {/* <button
                    onClick={() => handleAddCart(val._id)}
                    className=" bg-primary h-7 w-20 cursor-pointer text-white rounded-md text-sm ml-50 mt-2"
                  >
                    Add
                  </button> */}
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
