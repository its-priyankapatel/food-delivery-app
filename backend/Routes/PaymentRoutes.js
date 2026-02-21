import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { paymentController } from "../controllers/paymentController.js";
import { userAuthMiddleware } from "../Middlewares/userAuthMiddleware.js";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post("/create-checkout-session", userAuthMiddleware, paymentController);
export default router;
