import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const RestaurantProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const fetchRestaurant = async (token) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/auth/retrive-restaurant",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setAuthorized(true); // Allow access
      } else {
        localStorage.removeItem("restaurantToken");
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      navigate("/login"); // Redirect on error
    } finally {
      setLoading(false);
    }
  };
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("restaurantToken");
    if (token) {
      fetchRestaurant(token);
    } else {
      navigate("/login");
    }
  }, [location.pathname]);

  if (loading) return null; // Optionally render loader

  return authorized ? <>{children}</> : null;
};

export default RestaurantProtectedRoute;
