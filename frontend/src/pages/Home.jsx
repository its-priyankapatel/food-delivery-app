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
      <div className="w-full h-screen overflow-x-clip">
        <Navbar />
        <div className="h-[85%] md:h-screen flex bg-yellow-500 mt-20 w-full">
          <img className="h-full md:block -translate-x-10 md:translate-x-0" src={vegPhoto} alt="" />
          <div className="flex flex-col h-[40%] w-full justify-around items-center -translate-x-10 md:translate-x-0">
            <h1 className="text-2xl md:text-4xl font-semibold text-white text-center text-shadow-lg w-full shadow-black selection:text-tertiary selection:bg-primary">
              Taste that makes you go{" "}
              <span className="text-tertiary">yummmmm...</span>
            </h1>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleExplore}
                type="button"
                className="w-28 h-10 hover:bg-primary hover:text-black rounded-md cursor-pointer font-semibold  border-2  border-primary text-primary bg-transparent"
              >
                Explore
              </button>
              <MdOutlineKeyboardDoubleArrowDown className="text-primary size-6 md:size-7 animate-bounce" />
            </div>
          </div>
          <img
            className="hidden md:block rounded-l-full"
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
