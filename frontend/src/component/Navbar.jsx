import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import SearchBar from "./search/SearchBar.jsx";
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = () => {
  const [isProfileClick, setIsProfileClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logo = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771054099/tasto_qoukrq.png";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      <div className="h-14 md:h-16 flex items-center justify-between px-1 md:px-2 sticky w-full z-20 top-0 left-0 font-poppins bg-background">
        <div className="flex gap-1">
          <div className="h-14 flex items-center justify-center">
            <img src={logo} alt="tasto" className="h-12 md:h-16" onClick={() => navigate("/")} />
          </div>
        </div>
        <SearchBar />
        <div className="flex items-center gap-4 md:gap-10 justify-end md:pr-4">
          <FaShoppingBasket
            onClick={() => navigate("/add-cart")}
            className="text-2xl md:text-4xl text-secondary cursor-pointer"
          />
          <div className="relative">
            <FaCircleUser
              className="text-2xl md:text-4xl text-secondary cursor-pointer"
              onClick={() => setIsProfileClick((prev) => !prev)}
            />
            {isProfileClick && (
              <div className="absolute top-6 md:top-10 right-2 bg-white rounded-sm shadow-lg p-2 md:py-2 md:px-4 z-50 ">
                <button
                  onClick={handleLogout}
                  className="text-tertiary font-semibold cursor-pointer text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
