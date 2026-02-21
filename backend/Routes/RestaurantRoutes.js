import express from "express";
import {
  addRestaurantController,
  editRestaurantDetails,
  FetchAllRestaurantController,
  getRestaurantController,
  getRestaurantDetail,
  verifyRestaurant
} from "../controllers/restaurantController.js";

import { restaurantAuthMiddleware } from './../Middlewares/restaurantAuthMiddleware.js';

const router = express.Router();

router.post("/add-restaurant", addRestaurantController);
router.get("/get-all-restaurant", restaurantAuthMiddleware, FetchAllRestaurantController);
router.get("/get-restaurant", restaurantAuthMiddleware, getRestaurantController);
router.get("/retrive-restaurant", restaurantAuthMiddleware, getRestaurantDetail)
router.patch('/edit', restaurantAuthMiddleware, editRestaurantDetails);
router.get('/verify', restaurantAuthMiddleware, verifyRestaurant);

export default router;
