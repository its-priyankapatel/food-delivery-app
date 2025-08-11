import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";
  const token = localStorage.getItem("token") || "";
  const [food, setFood] = useState({});

  const handleAddCart = async (foodId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/cart/add-cart/${foodId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        return 1;
      } else toast.error("something went wrong in add to cart");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in add to cart");
    }
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        currencySymbol,
        food,
        setFood,
        handleAddCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
