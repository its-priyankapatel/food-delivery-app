import React from "react";
import Navbar from "../component/Navbar";
import HomePhoto from "../assets/HomePhoto.jpg";
import vegPhoto from "../assets/Vegphoto.png";
import AllFood from "../component/AllFood.jsx";
import { scroller } from "react-scroll";
import DisplayFoodRestaurant from "../component/DisplayFoodByRestaurant.jsx";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const Home = () => {
  const handleExplore = () => {
    scroller.scrollTo("allFoodSection", {
      duration: 1500,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="h-auto w-full flex bg-secondary mt-14 md:mt-18">
          <img
            className="filter w-40 md:w-80 h-[582px] md:h-[705px] "
            src={vegPhoto}
            alt=""
          />
          <div className="flex flex-col gap-10 h-[40%] justify-around items-center mt-14 md:mt-6 pr-2 md:pr-0">
            <h1 className="text-2xl md:text-4xl font-semibold text-white text-center text-shadow-lg w-full shadow-black selection:text-tertiary selection:bg-primary">
              Taste that makes you go{" "}
              <span className="text-tertiary">yummmmm...</span>
            </h1>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleExplore}
                type="button"
                className="w-24 md:w-28 h-9 md:h-10 hover:bg-primary hover:text-secondary rounded-md cursor-pointer font-semibold  border-2  border-primary text-primary bg-secondary text-sm md:text-base"
              >
                Explore
              </button>
              <MdOutlineKeyboardDoubleArrowDown className="text-primary size-6 md:size-7 animate-bounce" />
            </div>
          </div>
          <img
            className="rounded-l-full hidden md:block"
            src={HomePhoto}
            alt=""
          />
        </div>
        <div name="allFoodSection">
          <AllFood />
        </div>
        <DisplayFoodRestaurant />
      </div>
    </>
  );
};

export default Home;
