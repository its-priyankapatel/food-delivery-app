import express from "express";
import {
  getRestaurantController,
  getUserByIdController,
  getUserController,
  Login,
  restaurantLogin,
  SignUp,
} from "../controllers/authController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { get } from "mongoose";

const router = express.Router();
router.post("/sign-up", SignUp);
router.post("/login", Login);
router.post("/restaurant-login", restaurantLogin);
router.get("/get-user", authMiddleware, getUserController);
router.get("/retrive-user/:id", authMiddleware, getUserByIdController);
router.get("/retrive-restaurant", authMiddleware, getRestaurantController);

export default router;
