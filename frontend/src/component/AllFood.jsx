import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const AllFood = () => {
  const { backendUrl } = useContext(AppContext);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem("userToken");
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(false);
  const navigate = useNavigate();

  const scrollRef = useRef(null); // Ref for slider scroll

  const GetCategory = async () => {
    try {
      const { data } = await axios.get(
        `
        ${backendUrl}/api/food/get-categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategory(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch food items", error);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftBlur(scrollLeft > 0);
      setShowRightBlur(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const slider = scrollRef.current;
    slider.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) GetCategory();
  }, [token]);

  // Scroll functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="h-[250px] md:h-[350px] px-4 md:px-20 bg-primary py-1">
      <h1 className="my-5 md:my-10 text-center text-2xl  md:text-4xl font-semibold text-tertiary selection:text-primary selection:bg-tertiary">
        Inspiration for your first order
      </h1>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftBlur && (
          <div className="pointer-events-none absolute md:left-7 top-0 bottom-0 w-14 bg-gradient-to-r from-white to-transparent z-10" />
        )}

        {/* Right Blur */}
        {showRightBlur && (
          <div className="pointer-events-none absolute right-0 md:right-7 top-0 bottom-0 w-14 bg-gradient-to-l from-white to-transparent z-10" />
        )}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 shadow p-2 rounded-full cursor-pointer"
          onClick={scrollLeft}
        >
          <FaChevronLeft className="text-xs md:text-lg text-secondary" />
        </button>

        {/* Slider Container */}
        <div
          className="flex w-[95%] mx-auto overflow-x-auto gap-2 md:gap-6 scrollbar-hide scroll-smooth px-6 md:px-10 cursor-pointer"
          ref={scrollRef}
        >
          {category.map((val, index) => (
            <div
              onClick={() => navigate(`/all-food/${val.name}`)}
              key={index}
              className="md:min-w-[180px] text-center"
            >
              <div
                className="w-20 md:w-40 h-20 md:h-40 rounded-full object-cover mx-auto bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${val.image}) ` }}
              ></div>
              <h3 className="mt-2 font-medium text-tertiary text-shadow-2xs shadow-black text-sm md:text-base">
                {val.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 shadow p-2 rounded-full cursor-pointer"
          onClick={scrollRight}
        >
          <FaChevronRight className="text-xs md:text-lg text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default AllFood;
