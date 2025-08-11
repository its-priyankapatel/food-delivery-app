import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { searchFoodController } from "../controllers/searchController.js";

const router = express.Router();

router.get("/food/search", authMiddleware, searchFoodController);

export default router;
