import express from "express";
import {
  addToCartController,
  reduceCartController,
  RemoveCartItemController,
  RetrieveCartItemsController,
} from "../controllers/cartController.js";
import { userAuthMiddleware } from "../Middlewares/userAuthMiddleware.js";

const router = express.Router();

router.post("/add-cart/:foodId", userAuthMiddleware, addToCartController);
router.post("/reduce-cart/:foodId", userAuthMiddleware, reduceCartController);
router.get("/retrieve/cart", userAuthMiddleware, RetrieveCartItemsController);
router.delete("/remove-cart/:foodId", userAuthMiddleware, RemoveCartItemController);

export default router;
