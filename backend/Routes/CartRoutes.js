import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  addToCartController,
  reduceCartController,
  RemoveCartItemController,
  RetrieveCartItemsController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart/:foodId", authMiddleware, addToCartController);
router.post("/reduce-cart/:foodId", authMiddleware, reduceCartController);
router.get("/retrieve/cart", authMiddleware, RetrieveCartItemsController);
router.delete("/remove-cart/:foodId", authMiddleware, RemoveCartItemController);

export default router;
