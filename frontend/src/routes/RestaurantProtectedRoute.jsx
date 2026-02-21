import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const RestaurantProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("restaurantToken");

      if (!token) {
        navigate("/login/restaurant");
        return;
      }

      try {
        const res = await axios.get(
          backendUrl + "/api/restaurant/verify",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("restaurantToken");
          navigate("/login/restaurant");
        }
      } catch (error) {
        localStorage.removeItem("restaurantToken");
        navigate("/login/restaurant");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [backendUrl, navigate]);

  if (loading) return null;

  return isAuth ? <>{children}</> : null;
};

export default RestaurantProtectedRoute;