import React from "react";
import Navbar from "../component/Navbar";
import PromoAndProducts from "../component/home/PromoAndProducts";
import { HashLink } from "react-router-hash-link";
import MobileBG from "../component/BG/MobileBG";
import Categories from "../component/home/Categories";

const Home = () => {
  const vector = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771054100/vector_gn1oe9.png"
  const pasta = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914412/pngwing.com_4_ahv60r.png";
  const leaf = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771054100/leafs_moavja.png"
  return (
    <>
      <div className="pb-20 h-auto w-full scroll-smooth transition duration-500">
        <div className="w-full h-screen relative overflow-x-clip bg-background">
          <MobileBG />
          <Navbar />
          <div className="h-full relative flex items-center">
            <div className="hidden md:block">
              <img src={vector} alt="vector" className="select-none h-full md:h-[90%] top-0 absolute -right-10 md:right-0" />
              <img src={pasta} alt="pasta" className="absolute h-[40%] md:h-[60%] -right-20 md:right-40 top-30 md:top-20 z-10" />
              <img src={leaf} alt="" className="absolute h-20 md:h-44 right-0 bottom-10 opacity-30" />
            </div>
            <div className="h-[50%] w-[80%] md:w-[35%] ml-3 md:ml-10">
              <h1 className="text-3xl md:text-5xl text-primary font-poppins font-bold">Good Food.</h1>
              <h1 className="text-3xl md:text-5xl text-primary font-poppins font-bold">Good Mood.</h1>
              <p className="mt-2 text-primary/60 font-poppins text-sm hidden md:block">Discover top-rated restaurants near you and order in just a few taps.
                Fast delivery, real-time tracking, and food you’ll love every time.</p>
              <p className="mt-2 text-primary/60 font-poppins text-sm block md:hidden">Discover top-rated restaurants near you and order in just a few taps.
                Fast delivery, real-time tracking, and food you’ll love every time.</p>

              <HashLink smooth to="/#PROMO">
                <button
                  className="mt-10 h-10 w-40 font-semibold rounded-4xl bg-primary text-white cursor-pointer 
                  shadow-[0px_5px_10px_rgba(0,0,0,0.5)] hover:scale-105 transition">Explore Dishes</button>
              </HashLink>
            </div>
          </div>
        </div>
        <PromoAndProducts />
        <div className="px-2 md:px-10">
          <Categories titleText={"Explore Categories"} />
        </div>
      </div>
    </>
  );
};

export default Home;
