import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        navigate("/"); // If user is authenticated, redirect to home
      } else {
        setLoading(false); // Allow access to public route
      }
    } catch (error) {
      setLoading(false); // On error, treat as public access
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false); // No token, allow access
    }
  }, []);

  if (loading) return null; // Optionally, show a spinner or loader

  return <>{children}</>;
};

export default PublicRoutes;
