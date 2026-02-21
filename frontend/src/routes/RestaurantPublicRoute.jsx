import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const RestaurantPublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("restaurantToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          backendUrl + "/api/restaurant/verify",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          navigate("/restaurant-dashboard");
        } else {
          localStorage.removeItem("restaurantToken");
          setLoading(false);
        }
      } catch (error) {
        localStorage.removeItem("restaurantToken");
        setLoading(false);
      }
    };

    verify();
  }, [backendUrl, navigate]);

  if (loading) return null;

  return <>{children}</>;
};

export default RestaurantPublicRoute;