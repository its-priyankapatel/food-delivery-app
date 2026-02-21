import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DisplayFood from "./pages/DisplayFood";
import DisplayRestaurant from "./pages/DisplayRestaurant";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Cart from "./component/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import RestaurantHome from "./pages/RestaurantHome";
import RestaurantProtectedRoute from "./routes/RestaurantProtectedRoute";
import AddFoodItem from "./pages/AddFoodItem";
import RestaurantPublicRoute from "./routes/RestaurantPublicRoute";
import RestaurantLogin from "./pages/RestaurantLogin";
import NotFound from "./pages/NotFound";
import EditFoodItem from "./pages/EditFoodItem";
import NotificationContainer from "./component/notification/NotificationContainer";
import RestaurantProfilePage from "./pages/RestaurantProfilePage";
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
          path="/restaurant-dashboard"
          element={
            <RestaurantProtectedRoute>
              <RestaurantHome />
            </RestaurantProtectedRoute>
          }
        />
        <Route
          path="/restaurant-dashboard/profile"
          element={
            <RestaurantProtectedRoute>
              <RestaurantProfilePage />
            </RestaurantProtectedRoute>
          }
        />
        <Route
          path="/login/restaurant"
          element={
            <RestaurantPublicRoute>
              <RestaurantLogin />
            </RestaurantPublicRoute>
          }
        />
        <Route
          path="/restaurant-dashboard/add-food"
          element={
            <RestaurantProtectedRoute>
              <AddFoodItem />
            </RestaurantProtectedRoute>
          }
        />

        <Route
          path="/restaurant-dashboard/edit-food/:foodId"
          element={
            <RestaurantProtectedRoute>
              <EditFoodItem />
            </RestaurantProtectedRoute>
          }
        />
        <Route
          path="/register/restaurant"
          element={
            <RestaurantPublicRoute>
              <RegisterRestaurant />
            </RestaurantPublicRoute>
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
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/failure"
          element={
            <ProtectedRoute>
              <PaymentFailure />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationContainer />
    </>
  );
};

export default App;
