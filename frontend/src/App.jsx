import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DisplayFood from "./pages/DisplayFood";
import DisplayRestaurant from "./pages/DisplayRestaurant";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Cart from "./component/Cart";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register/restaurant"
          element={
            <PublicRoutes>
              <RegisterRestaurant />
            </PublicRoutes>
          }
        />
        <Route
          path="/all-food/:category"
          element={
            <ProtectedRoute>
              <DisplayFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/:restaurantId"
          element={
            <ProtectedRoute>
              <DisplayRestaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
