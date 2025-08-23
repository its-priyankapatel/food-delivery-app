import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const RestaurantPublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchRestaurant = async (token) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/auth/retrive-restaurant",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        // If restaurant is already authenticated, redirect to dashboard
        navigate("/restaurant-dashboard");
      } else {
        setLoading(false); // Not authenticated, allow public access
      }
    } catch (error) {
      setLoading(false); // On error, treat as public access
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("restaurantToken");
    if (token) {
      fetchRestaurant(token);
    } else {
      setLoading(false); // No token, allow access
    }
  }, []);

  if (loading) return null; // Optionally show spinner/loader

  return <>{children}</>;
};

export default RestaurantPublicRoute;
