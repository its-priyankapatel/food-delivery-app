import express from "express";
import {
  addRestaurantController,
  editRestaurantDetails,
  FetchAllRestaurantController,
  getRestaurantController,
} from "../controllers/restaurantController.js";

import { authMiddleware } from "./../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-restaurant", addRestaurantController);
router.get("/get-all-restaurant", authMiddleware, FetchAllRestaurantController);
router.get("/get-restaurant/:id", authMiddleware, getRestaurantController);
router.patch('/edit', authMiddleware, editRestaurantDetails);

export default router;
