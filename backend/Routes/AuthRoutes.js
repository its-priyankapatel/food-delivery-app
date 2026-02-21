import express from "express";
import {
  getRestaurantController,
  getUserByIdController,
  getUserController,
  Login,
  restaurantLogin,
  SignUp,
} from "../controllers/authController.js";
import { userAuthMiddleware } from './../Middlewares/userAuthMiddleware.js';

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/login", Login);
router.post("/restaurant-login", restaurantLogin);
router.get("/get-user", userAuthMiddleware, getUserController);
router.get("/retrive-user/:id", userAuthMiddleware, getUserByIdController);

export default router;
