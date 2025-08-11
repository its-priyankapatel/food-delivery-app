import express from "express";
import {
  addRestaurantController,
  FetchAllRestaurantController,
  getRestaurantController,
} from "../controllers/restaurantController.js";

import { authMiddleware } from "./../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-restaurant", authMiddleware, addRestaurantController);
router.get("/get-all-restaurant", authMiddleware, FetchAllRestaurantController);
router.get("/get-restaurant/:id", authMiddleware, getRestaurantController);

export default router;
