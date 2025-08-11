import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const fetchUser = async (token) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAuthorized(true); // Allow access
      } else {
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      navigate("/login"); // Redirect on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      navigate("/login");
    }
  }, []);

  if (loading) return null; // Optionally render loader

  return authorized ? <>{children}</> : null;
};

export default ProtectedRoute;
