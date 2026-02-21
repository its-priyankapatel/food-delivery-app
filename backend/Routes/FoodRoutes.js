import express from "express";
import {
  AddfoodController,
  deleteFoodController,
  editFoodController,
  fetchCategoryController,
  fetchFoodController,
  getAllFoodController,
  getFoodByCategoryController,
} from "../controllers/foodController.js";
import upload from "../Middlewares/multer.js";
import { userAuthMiddleware } from "../Middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post(
  "/add-food",
  userAuthMiddleware,
  AddfoodController
);
router.get("/get-all-food", userAuthMiddleware, getAllFoodController);
router.get("/get-food/:id", userAuthMiddleware, fetchFoodController);
router.get("/get-categories", userAuthMiddleware, fetchCategoryController);
router.get(
  "/get-food-category/:categoryName",
  userAuthMiddleware,
  getFoodByCategoryController
);
router.patch(
  "/edit/:id",
  userAuthMiddleware,
  upload.single("image"),
  editFoodController
);

router.delete("/delete/:foodId", userAuthMiddleware, deleteFoodController);

export default router;
