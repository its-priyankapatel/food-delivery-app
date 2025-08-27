import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "₹"; // or "$", depending on your app

  // --- User State ---
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [foodData, setFoodData] = useState([]); // all available foods

  // --- Restaurant State ---
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  // --------------------- User Functions ---------------------
  const fetchUser = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  const handleAddCart = async (foodId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You must be logged in to add items to cart");
      return null;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/cart/add-cart/${foodId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setCart(data.cart); // update cart state
        toast.success("Added to cart successfully!");
        return data.cart;
      } else toast.error("Something went wrong while adding to cart");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding to cart");
      return null;
    }
  };

  // ------------------ Restaurant Functions ------------------
  const fetchRestaurant = async () => {
    const token = localStorage.getItem("restaurantToken");
    if (!token) {
      setRestaurant(null);
      setRestaurantLoading(false);
      return;
    }
    try {
      setRestaurantLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/auth/retrive-restaurant`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) setRestaurant(data.restaurant);
      else setRestaurant(null);
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      setRestaurant(null);
    } finally {
      setRestaurantLoading(false);
    }
  };

  // -------------------- Effects --------------------
  useEffect(() => {
    fetchUser();
    fetchRestaurant();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        currencySymbol,
        user,
        setUser,
        cart,
        setCart,
        setFoodData,
        restaurant,
        setRestaurant,
        handleAddCart,
        fetchUser,
        fetchRestaurant,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
