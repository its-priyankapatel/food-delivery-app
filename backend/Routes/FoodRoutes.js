import express from "express";
import {
  AddfoodController,
  fetchCategoryController,
  fetchFoodController,
  getAllFoodController,
  getFoodByCategoryController,
} from "../controllers/foodController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/multer.js";

const router = express.Router();

router.post(
  "/add-food",
  authMiddleware,
  upload.single("image"),
  AddfoodController
);
router.get("/get-all-food", authMiddleware, getAllFoodController);
router.get("/get-food/:id", authMiddleware, fetchFoodController);
router.get("/get-categories", authMiddleware, fetchCategoryController);
router.get(
  "/get-food-category/:categoryName",
  authMiddleware,
  getFoodByCategoryController
);

export default router;
